//calling the requierd dependencies
import auth from '../middleware/auth.js';

import cors from 'cors';
import bcrypt from 'bcrypt';
import express from 'express';
import { connect, close } from '../database/connection.js';

const router = express.Router();
router.use(express.json());
router.use(cors());

//this is the router, note that we have a middleware function here that will run before the router
//if the middleware function doesnt block the access we can progress
router.post('/', auth, async (req, res) => {
  //verifying clinet request
  if (!req.body.name || !req.body.email || !req.body.password || Object.keys(req.body).length > 3) {
    res.status(400).send('Invalid input');
  } else {
    try {
      //connecting to the user collection inside the database
      const database = await connect();
      const collection = database.collection('users');

      //herer we verify if the name and email provided by the client already exist in the database
      const existingUserByName = await collection.findOne({ name: req.body.name });
      const existingUserByEmail = await collection.findOne({ email: req.body.email });

      if (existingUserByName || existingUserByEmail) {
        return res.status(400).send('User with the same name or email already exists');
      }

      //if the name and email are new we proceed
      //here we generarte a salt and hash the passwod provided by the clinet
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      };

      //here we store the new user in the database
      await collection.insertOne(newUser);

      //this is the final response if no errors
      res.send('User has been signed up');

      //here we handdle server errors
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