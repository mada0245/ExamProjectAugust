//calling the requierd dependencies
import express from 'express';

import cors from 'cors';
import { connect, close } from '../database/connectionToken.js';

const router = express.Router();
router.use(express.json());
router.use(cors());

//this are the routers

//this router will save the jasonWebToken provided by the client, in the database
router.post('/add', async (req, res) => {
  //verifying clinet request
  if (!req.body.token || Object.keys(req.body).length > 1) {
    res.status(400).send('Invalid input');
  } else {
    try {
      //connecting to the tokens collection inside the database
      const database = await connect();
      const collection = database.collection('tokens');

      const newToken = {
        token: req.body.token
      };
      //here we store the token
      await collection.insertOne(newToken);

      //final response if no errors
      res.send('You have a valid token');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      await close();
    }
  }
});


//this router deletes all tokens inside the tokens collection
router.delete('/delete', async (req, res) => {
  try {
    const database = await connect();
    const collection = database.collection('tokens');
    
    await collection.deleteMany({});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    await close();
  }
});


//this router gets the token from the database
router.get('/get', async (req, res) => {
  try {

    //connecting to the tokens collection inside the database
    const database = await connect();
    const collection = database.collection('tokens');
    
    //here we store the token inside this variable as an array(there is suppose to always just be 1 or 0 tokens in the database)
    const tokens = await collection.find().toArray();
    
    if (tokens.length === 0) {
      res.status(404).send('No tokens found');
    } else {
      //if there is a token here we send it back to the client, this is the final response if no errors
      res.send(tokens[0].token);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    await close();
  }
});

export default router;