require("dotenv").config();
const mongoose = require('mongoose');
const express = require("express");
const userRoutes = require("./routes/userRouter")

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3002;
const mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url)
  .then(() => console.log('connect the server with the backendDB'))
  .catch(() => console.log("somthing went wrong in Database"));

app.use("/users", userRoutes)

app.listen(port , () =>{
    console.log(`app is listening on ${port}`)
})

