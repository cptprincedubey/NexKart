require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const authRoutes = require('./src/routes/auth.routes');
const connectDB = require('./src/config/db/db');
const catchInstance = require('./src/services/cache.service');
connectDB();            

const app = express();

catchInstance.on("connect", () => {
  console.log("Redis connected successfully");
});

catchInstance.on("error", (error) => {
  console.log("Error connecting redis", error);
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

let port = process.env.PORT || 4500;

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);

});

