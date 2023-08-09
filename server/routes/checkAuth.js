import express from 'express';
import cors from 'cors';
import auth from '../middleware/auth.js';

const router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/',auth ,async (req, res) => {
    res.send("The admin has been logged in");
  });
  
  export default router;