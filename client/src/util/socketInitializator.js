import io from "socket.io-client";

const socket = io("localhost:8000");

socket.on("Answer", (data) => {
      
    alert("The server says: " + data)

});

export default socket;