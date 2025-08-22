import { app } from "./app.js"
import dotenv from "dotenv"
import * as http from "http"

dotenv.config({
    path: "./.env"
})

const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on Port : ${process.env.PORT}`);

})