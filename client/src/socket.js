import io from "socket.io-client";

// localhostだと動かない
let socket = io ("http://127.0.0.1:8080");

export default socket;