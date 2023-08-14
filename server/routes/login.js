import config from 'config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { connect, close } from '../database/connection.js';
import express from 'express';

const router = express.Router();
  router.use(express.json());


  router.post('/api/login', async (req, res) => {

      if (!req.body.name || !req.body.password || Object.keys(req.body).length > 2) {
        res.status(400).send('Invalid input');


      } else {
        try {
          
          const database = await connect();
          const collection = database.collection('users');

          const adminExists = await collection.findOne({ name: "admin" });
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

          const madaExists = await collection.findOne({ name: "mada" });
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
    

          const user = await collection.findOne({ name: req.body.name });
          if (!user) {
            return res.status(400).send('Wrong credentials');
          }
    

          const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
          if (!isPasswordValid) {
              return res.status(400).send('Wrong credentials');
          }

          const token = jwt.sign(user.type, config.get('jwtPrivateKey'));
          res.send(token);


        } catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
       

        } finally {
          await close();
        }
      }
    });

export default router;