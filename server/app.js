//callling required dependencies
import express from 'express';

const app = express();
import config from 'config';
import helmet from 'helmet';
import http from 'http';

import token from './routes/token.js';
import signUp from './routes/signUp.js';
import login from './routes/login.js';
import forgotPassword from './routes/forgotPassword.js';
import checkAuth from './routes/checkAuth.js'
/* import socketIO from 'socket.io'; */


const server = http.createServer(app);
/* const io = socketIO(server);

io.on('connection', (socket) => {
  //when a client is conected we present this message
    console.log('A client connected');
  
    // reciving a message from the client
    socket.on('chat message', (message) => {
      console.log('Received message:', message);
    });
  
    //when a client is diconected we present this message
    socket.on('disconnect', () => {
      console.log('A clinet disconnected');
    });
}); */

//here we verify if all necessery environment variables are sett up
//if not we end the program 
if(!config.get('jwtPrivateKey')){
    console.log('mada0245_jwtPrivateKey is not defined.');
    process.exit(1);
}

if(!process.env.NODEMAILER_USERNAME){
    console.log('NODEMAILER_USERNAME is not defined.');
    process.exit(1);
}

if(!process.env.NODEMAILER_PASSWORD){
    console.log('NODEMAILER_PASSWORD is not defined.');
    process.exit(1);
}

if(!process.env.MADA0245_ADMIN_PASS){
  console.log('MADA0245_ADMIN_PASS is not defined.');
  process.exit(1);
}

if(!process.env.MADA0245_MADA_PASS){
  console.log('MADA0245_MADA_PASS is not defined.');
  process.exit(1);
}

/*if(!process.env.USER_TYPE_ADMIN_PASS){
  console.log('USER_TYPE_ADMIN_PASS is not defined.');
  process.exit(1);
}

if(!process.env.USER_TYPE_MADA_PASS){
  console.log('USER_TYPE_MADA_PASS is not defined.');
  process.exit(1);
}*/

//here we call the routers
app.use(helmet());
app.use('/api/signup', signUp);
app.use('/api/login', login);
app.use('/api/forgotPassword', forgotPassword);
app.use('/api/token', token);
app.use('/api/checkAuth', checkAuth);





/*PORT*/
const PORT = 8000;
server.listen(PORT, (error) => {

    if (error) {
        console.log(error);
        return;
        
    }
    console.log("Server is running on port", PORT);
});