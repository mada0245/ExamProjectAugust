import { connect, close } from '../database/connection.js';
import nodemailer from 'nodemailer';
import express from 'express';

const router = express.Router();

  router.use(express.json());


  router.post('/forgotPassword', async (req, res) => {

    if (!req.body.email || Object.keys(req.body).length > 1) {
      res.status(400).send('Invalid input');


    } else {
      try {
        const database = await connect();
        const collection = database.collection('users');

        const existingUserByEmail = await collection.findOne({ email: req.body.email });
        if (existingUserByEmail) {
        
          const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.NODEMAILER_USERNAME,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });
          const message = {
            from: process.env.NODEMAILER_USERNAME,
            to: req.body.email,
            subject: 'Password recovery',
            text: 'This could be a link to where you could recover your password. But this functionality is not yet available'
          };
          transporter.sendMail(message, (error, info) => {
            if (error) {
              console.error('Error:', error);
              res.status(500).send('Failed to send email');


            } else {
              res.send(`An email has been sent to ${req.body.email}`);
            }
          });


        } else {
          res.status(400).send('The email does not exist.');
        }

      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');


      } finally {
        await close();
      }
    }
  });

export default router;