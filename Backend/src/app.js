import express from "express"
import cors from "cors"
import userRouter from "./routers/user.route.js";
import cookieParser from "cookie-parser"
import captainRouter from "./routers/captain.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // ya "*" try kar ke dekh
  credentials: true
}));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("Hello World!!")
})

app.use("/users",userRouter)
app.use("/captains",captainRouter)


export{app}