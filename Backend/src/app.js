import express from "express"
import cors from "cors"
import userRouter from "./routers/user.route.js";
import cookieParser from "cookie-parser"
import captainRouter from "./routers/captain.route.js";
import mapRouter from "./routers/maps.routes.js";
import rideRouter from "./routers/ride.route.js";


const app = express();

app.use(cors({
  origin: "*", // frontend ka origin
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
app.use('/maps',mapRouter)
app.use('/rides',rideRouter)


export{app}