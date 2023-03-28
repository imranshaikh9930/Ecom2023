import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Routes from "./Routers/auth.js";
import productRoutes from "./Routers/Product.js"
import categoryRoutes from "./Routers/Category.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";
// const express = require("express");
dotenv.config()
const app = express();

// console.log();
mongoose.connect(process.env.Mongo_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MongoDB Connected…")
    })
    .catch(err => console.log(err))

app.get("/", (req, res) => {

    res.json({
        message: "Hello From Server"
    })
})
// Middleware

// app.use((req, res, next) => {

//     next();
// })
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"../client/build")))
app.use("/api", Routes);
app.use("/api",productRoutes);
app.use("/api",categoryRoutes)


app.use("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"))

})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`)
})