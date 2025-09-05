import mongoose from "mongoose"
import { DB_Name } from "../constant.js"

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("DataBase Successfully Connected !!")
    } catch (error) {
        console.log("Database Connection Failed....", error);
    }
}

export default connectDB
