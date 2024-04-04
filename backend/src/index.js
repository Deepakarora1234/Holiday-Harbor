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
import {v2 as cloudinary} from "cloudinary"
import myHotelRoutes from "./routes/my-hotels.js"
import hotelRoutes from "./routes/hotels.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source = process.env.MONGODB_CONNECTION_STRING;
// console.log(source)
// console.log(process.env.CLOUDINARY_CLOUD_NAME)

cloudinary.config({
    cloud_name:"dm3jnihfu",
    api_key:"782275286945426",
    api_secret:"WxdHbltJE_GdIRPo-Xfqx29YdUo",
})

await mongoose.connect("mongodb+srv://aroradeepak0817:X8IZo7d74QzYrhbk@mer-booking-app-db.kfqgdyn.mongodb.net/"); 
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors(
));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
app.use("/api/my-hotels",myHotelRoutes)
app.use("/api/hotels",hotelRoutes)
app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})
 

app.listen(7000, ()=>{
    console.log("server is running on localhost 7000")
});
