import mongoose from "mongoose"
import { DB_Name } from "../constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("DataBase Successfully Connected !!")
        return connectionInstance;
        
    } catch (error) {
        console.log("Database Connection Failed....", error);
        throw error;
    }
}

export default connectDB
