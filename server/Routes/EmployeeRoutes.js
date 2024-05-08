const express = require('express');
const route = express.Router();
const {saveEmployee,getAllEmployee,getEmployee,deleteEmployee,editEmployee,searchEmployee} = require("../Controller/EmployeeController");
const multer = require('multer');
const upload=require('../MiddleWare/multer')


route.post('/save',upload.single("image"),saveEmployee)
route.get("/employees",getAllEmployee)
route.get("/employee/:id",getEmployee)
route.delete("/delete/:id",deleteEmployee)
route.put("/edit/:id",upload.single("image"),editEmployee)
route.get("/search",searchEmployee)



module.exports = route;
