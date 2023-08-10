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
import recepies from './routes/recepies.js'
/* import socketIO from 'socket.io'; */


const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {

  socket.on("recepies", (data) => {
      console.log("The client says: " + data);
      io.emit("Answer", `The ${data} will be prepared`);
  });

});

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
app.use(signUp);
app.use(login);
app.use(forgotPassword);
app.use(token);
app.use(checkAuth);
app.use(recepies);





/*PORT*/
const PORT = 8000;
server.listen(PORT, (error) => {

    if (error) {
        console.log(error);
        return;
        
    }
    console.log("Server is running on port", PORT);
});