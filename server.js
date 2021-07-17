const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopologyL:true,
    useFindandModify: false
});

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("Mongodb Connection success!");
})


const listRouter = require("./routes/todoList.js");

app.use("/todos",listRouter);//table name is created at this point


app.listen(PORT, () => {
  console.log(`Server Is Up and Running on Port: ${PORT}`);
});