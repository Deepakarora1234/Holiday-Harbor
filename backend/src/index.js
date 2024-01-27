import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import { cookie } from 'express-validator';
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source = process.env.MONGODB_CONNECTION_STRING;
// console.log(source)

mongoose.connect("mongodb+srv://aroradeepak0817:X8IZo7d74QzYrhbk@mer-booking-app-db.kfqgdyn.mongodb.net/"); 
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin:process.env.FRONTEND-URL,
    credentials : true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
 

app.listen(7000, ()=>{
    console.log("server is running on localhost 7000")
});
