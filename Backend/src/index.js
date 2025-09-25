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
        if (process.env.NODE_ENV !== "production") {
            const PORT = process.env.PORT || 5000;

            server.listen(PORT, () => console.log("Server is running on PORT :" + PORT))
        }
    })
    .catch((error) => {
        console.log("❌ MongoDB Connection Failed, server not started...", error);
    });
