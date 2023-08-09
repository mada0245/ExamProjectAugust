import jwt from 'jsonwebtoken';
import config from 'config';

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied');

    //if the header exists we verify if it is correct here
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        console.log(decoded);
        if (decoded == "ADMIN"){
            next();
        }else{
            res.status(400).send('Your are not authorised');
        }
        
    }
    catch(exeption) {
        res.status(400).send('Your are not authorised');
    }
}

export default auth;