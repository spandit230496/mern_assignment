const express = require("express");
const db = require("./Utils/dbutils.js");
const app = express();
const multer = require("multer");
const dotenv=require('dotenv').config()
const cors= require("cors")

const UserRoutes = require("./Routes/UserRoutes.js");
const EmployeeRoutes = require("./Routes/EmployeeRoutes.js");

const upload = multer({ dest: 'uploads' }); 

db;
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use("/user", UserRoutes);
app.use("/api", EmployeeRoutes);

app.listen(process.env.PORT||5000, () => console.log("server is running on "+process.env.PORT));
