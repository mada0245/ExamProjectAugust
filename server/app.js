import express from 'express';
  const app = express();


import helmet from 'helmet';
  app.use(helmet());


import cors from 'cors';
  app.use(cors());


import http from 'http';
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




import config from 'config';

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

import token from './routes/token.js';
  app.use(token);


import login from './routes/login.js';
  app.use(login);


import forgotPassword from './routes/forgotPassword.js';
  app.use(forgotPassword);


import checkAuth from './routes/checkAuth.js'
  app.use(checkAuth);


import recepies from './routes/recepies.js'
  app.use(recepies);


const PORT = 8000;
server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
        return;
    }
    
    console.log("Server is running on port", PORT);
});