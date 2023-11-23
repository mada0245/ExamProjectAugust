import auth from '../middleware/auth.js';
import express from 'express';


const router = express.Router();

router.use(express.json());


router.get('/checkAuth',auth ,async (req, res) => {
    res.send("The admin has been logged in");
});

export default router;