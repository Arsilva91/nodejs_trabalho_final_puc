import mongoose from "mongoose";

//NodeJS 4.1 or later
// mongoose.connect("mongodb+srv://puc:Abc123@finalnodepuc.llmn3.mongodb.net/?retryWrites=true&w=majority");

//NodeJS 2.2.12
mongoose.connect("mongodb://puc:Abc123@finalnodepuc-shard-00-00.llmn3.mongodb.net:27017,finalnodepuc-shard-00-01.llmn3.mongodb.net:27017,finalnodepuc-shard-00-02.llmn3.mongodb.net:27017/?ssl=true&replicaSet=atlas-pkk1gy-shard-0&authSource=admin&retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;