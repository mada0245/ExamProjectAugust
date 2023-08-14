import auth from '../middleware/auth.js';
import { connect, close } from '../database/connectionRecepies.js';
import express from 'express';


const router = express.Router();
  router.use(express.json());


  router.post('/api/recepies/add', auth, async (req, res) => {

    if (!req.body.name || !req.body.ingredientes || !Array.isArray(req.body.ingredientes) || !req.body.description ||Object.keys(req.body).length > 3) {
      res.status(400).send('Invalid input');

    } else {
      try {
      
        const database = await connect();
        const collection = database.collection('recepies');

        const existingRecepieName = await collection.findOne({ name: req.body.name });
        if (existingRecepieName) {
          return res.status(400).send('Recepie with the same name already exists');
        }

        const newRecepie = {
          name: req.body.name,
          ingredients: req.body.ingredientes,
          description: req.body.description
        };
        await collection.insertOne(newRecepie);
        res.send('A new recepie has been created');


      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');


      } finally {
        await close();
      }
    }
  });



  router.delete('/api/recepies/delete/:name', auth, async (req, res) => {
      
    try {
      const database = await connect();
      const collection = database.collection('recepies');

      const checkForRecepies = await collection.countDocuments();
      if (checkForRecepies === 0){
        res.status(404).send('There are no recepies to delete')
      }
      
      await collection.deleteOne({name: req.params.name});
      res.send('The recepie has been delete');


    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');


    } finally {
      await close();
    }
  });



  router.get('/api/recepies/get', async (req, res) => {
    
    try {
      const database = await connect();
      const collection = database.collection('recepies');
      
      
      const recepies = await collection.find().toArray();
      if (recepies.length === 0) {
        res.status(404).send('No recepies found');
      } else {
        
        res.send(recepies);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } finally {
      await close();
    }
  });

export default router;