import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()
//NodeJS 4.1 or later
mongoose.connect(process.env.CONNECTION_BANCO_4).catch((error) => console.log(error));

//NodeJS 2.2.12
//mongoose.connect(process.env.CONNECTION_BANCO_2).catch((error) => console.log(error));

let db = mongoose.connection;

export default db;