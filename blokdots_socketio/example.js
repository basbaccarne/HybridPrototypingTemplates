import { Manager } from "socket.io-client";

const manager = new Manager("http://localhost:8777");
const socket = manager.socket("/blokdots");

let connected = false;
let interval = null;
let count = 0;

console.log("Waiting for connection …");

socket.on("connect", () => {
    connected = true;
    console.log(`Connected to blokdots with socket ${socket.id}`);

    interval = setInterval(() => {
        count++;
        console.log("Sending message 'count' with value", count);
        socket.volatile.emit("blokdots", {
            msg: "count",
            val: count,
        });
    }, 2000);
});

socket.on("blokdots", (data) => {
    console.log("Received blokdots:", data.msg, data.val);
});

socket.on("disconnect", () => {
    console.log(`Disconnected from blokdots`);
    if (interval) {
        clearInterval(interval);
    }
});