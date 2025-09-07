import express from "express"
import cors from "cors"
import userRouter from "./routers/user.route.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.send("Hello World!!")
})

app.use("/users",userRouter)

export{app}