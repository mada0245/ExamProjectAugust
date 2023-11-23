import io from "socket.io-client";
import toastr from "toastr";

const socket = io("localhost:8000");

socket.on("Answer", (data) => {
      
    toastr.success("The server says: " + data,"✅Success✅");

});

export default socket;