//calling the requierd dependencies
import express from 'express';

import cors from 'cors';
import { connect, close } from '../database/connection.js';
import nodemailer from 'nodemailer';

const router = express.Router();
router.use(express.json());
router.use(cors());

//router
router.post('/api/forgotPassword', async (req, res) => {
  //verifying clinet request
  if (!req.body.email || Object.keys(req.body).length > 1) {
    res.status(400).send('Invalid input');
  } else {
    try {
      //connecting to the user collection inside the database
      const database = await connect();
      const collection = database.collection('users');

      //verifying if the provided email already exists
      const existingUserByEmail = await collection.findOne({ email: req.body.email });

      //if the email is valid we will use nodemailer here
      if (existingUserByEmail) {
      
        //here we insert required information about the email that will send the message
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD
          }
        });

        //this is the message
        const message = {
          from: process.env.NODEMAILER_USERNAME,
          to: req.body.email,
          subject: 'Password recovery',
          text: 'This could be a link to where you could recover your password. But this functionality is not yet available'
        };

        //here we send the email and handle error if any
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.error('Error:', error);
            res.status(500).send('Failed to send email');
          } else {
            //this is the end response if no errors
            res.send(`An email has been sent to ${req.body.email}`);
          }
        });
      } else {
        res.status(400).send('The email does not exist.');
      }
      //here we handle server errors if any
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
      //here we close the connection with the database
    } finally {
      await close();
    }
  }
});

export default router;