//calling the requierd dependencies
import config from 'config';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import cors from 'cors';
import { connect, close } from '../database/connection.js';

const router = express.Router();
router.use(express.json());
router.use(cors());

//this is the router
router.post('/', async (req, res) => {
  //verifying clinet request
    if (!req.body.name || !req.body.password || Object.keys(req.body).length > 2) {
      res.status(400).send('Invalid input');
    } else {
      try {
        //connecting to the user collection inside the database
        const database = await connect();
        const collection = database.collection('users');

        //here we try to find the admin user
        const adminExists = await collection.findOne({ name: "admin" });
        const madaExists = await collection.findOne({ name: "mada" });

        //if we dont find the admin user we create it
        if (!adminExists) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(process.env.MADA0245_ADMIN_PASS, salt);
      

          const theAdmin = {
            name: "admin",
            email: "admin@example.com",
            type: "ADMIN",
            password: hashedPassword
          };
          await collection.insertOne(theAdmin);
        }

        if (!madaExists) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(process.env.MADA0245_MADA_PASS, salt);
          

          const theMada = {
            name: "mada",
            email: "mada0245@stud.kea.dk",
            type: "MADA",
            password: hashedPassword
          };
          await collection.insertOne(theMada);
        }
  
        //now the admin must exist even if this is a new database
        const user = await collection.findOne({ name: req.body.name });

        if (!user) {
          return res.status(400).send('Wrong credentials');
        }
  
        //if the user exist we verify here the password 
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
  
        if (!isPasswordValid) {
            return res.status(400).send('Wrong credentials');
        }

        //here we create the jason web token with the server password which is mapped in default.json and stored in a environment variable
        const token = jwt.sign(user.type, config.get('jwtPrivateKey'));
        
        //if no errors this is the final response
        res.send(token);

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