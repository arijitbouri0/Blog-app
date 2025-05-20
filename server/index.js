import { configDotenv } from "dotenv";
configDotenv()

import express from "express";
import { connectDB } from "./config/db.js";
import userRouters from "./router/user.router.js"
import blogRouters from "./router/blogs.router.js"
import { corsOptions } from "./constants/config.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors'

const app=express();

app.use(express.json());

app.use(
  cors(corsOptions)
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const url=process.env.MONGODB_URI
connectDB(url)

app.get("/",(req,res)=>{
    return res.send("hello from arijit")
})

app.use("/api/user",userRouters)
app.use("/api/blogs",blogRouters)

app.use(errorMiddleware)

const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log("Server Runing",port)
})