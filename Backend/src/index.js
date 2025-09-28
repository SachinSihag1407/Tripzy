import { app } from "./app.js"
import dotenv from "dotenv"
import * as http from "http"
import connectDB from "./db/db.js";
import { initializeSocket } from "../socket.js";

dotenv.config({
    path: "./.env"
})

const server = http.createServer(app);

initializeSocket(server);

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`✅ Server is running on Port : ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.log("❌ MongoDB Connection Failed, server not started...", error);
    });
