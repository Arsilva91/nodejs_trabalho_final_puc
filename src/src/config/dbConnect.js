import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config()
//NodeJS 4.1 or later
// mongoose.connect(process.env.CONNECTION_BANCO_4);

//NodeJS 2.2.12
mongoose.connect(process.env.CONNECTION_BANCO_2);

let db = mongoose.connection;

export default db;