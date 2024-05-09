const { Employee } = require("../Models/EmployeeModal");
const cloudinary = require("../Utils/cloudinary");
const fs = require("fs");
const { mobileNoRegex, emailRegex } = require("../Utils/validation");

async function saveEmployee(req, res) {
    let imageUrl=""
    try {
          
          if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "uploads",
            });
            imageUrl = result.secure_url
    }
    

        const { name, email, mobileno, designation, gender, course } = req.body;
        if (emailRegex.test(email) && mobileNoRegex.test(mobileno)) {
            const existingEmployee = await Employee.findOne({ email });

            if (existingEmployee) {
                return res.status(400).send({
                    message: "Employee already exists in the database",
                });
            }

            const newEmployee = await Employee.create({
                name,
                email,
                mobileno,
                designation,
                gender,
                course,
            });
           if(imageUrl){
            newEmployee["image"]=imageUrl
           }
            await newEmployee.save();

            return res
                .status(200)
                .send({ message: "Employee saved successfully", newEmployee });
        } else if (!emailRegex.test(email)) {
            res.status(400).send({
                message: "email format is not valid",
                success: false,
            });
        } else   {
            res.status(400).send({
                message: "mobileno format is not valid",
                success: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Error uploading file to Cloudinary or saving employee",
        });
    }
}

async function getAllEmployee(req, res) {
    try {
        const allEmployee = await Employee.find({});
        return res.status(200).send({
            message: "Employee Fetched Successfully",
            success: true,
            data: allEmployee,
        });
    } catch (error) {
        res.send(500).json({
            message: "Some Error Occurred while fetching the employee",
            success: false,
        });
    }
}
async function getEmployee(req, res) {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ _id: id });
        return res.status(200).send({
            message: "Employee Fetched Successfully",
            success: true,
            data: employee,
        });
    } catch (error) {
        res.send(500).json({
            message: "Some Error Occurred while fetching the employee",
            success: false,
        });
    }
}
async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;

        const employee = await Employee.findOneAndDelete({ _id: id });
        return res.status(200).send({
            message: "Employee Deleted Successfully",
            success: true,
        });
    } catch (error) {
        res.send(500).json({
            message: "Some Error Occurred while fetching the employee",
            success: false,
        });
    }
}

async function editEmployee(req, res) {
    let imageUrl=""
    try {
          
          if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "uploads",
            });
             imageUrl = result.secure_url;
    }
        
        const { id } = req.params;
        const { name, email, mobileno, designation, gender, course } = req.body;
        
        const updateObject = {
            name,
            email,
            mobileno,
            designation,
            gender,
            course,
        };
        
        if (imageUrl) {
            updateObject.image = imageUrl;
        }
        
        const employee = await Employee.findByIdAndUpdate(
            { _id: id },
            updateObject,
            { new: true }
        );
        

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee data updated successfully",
            employee: employee,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating employee data",
        });
    }
}
async function searchEmployee(req, res) {
    try {
        const { query } = req.query;

        const searchQuery = {
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
                { mobileNo: { $regex: query, $options: "i" } },
                { designation: { $regex: query, $options: "i" } },
                { gender: { $regex: query, $options: "i" } },
                { course: { $regex: query, $options: "i" } },
            ],
        };

        const searchResults = await Employee.find(searchQuery);

        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    saveEmployee,
    getAllEmployee,
    getEmployee,
    deleteEmployee,
    editEmployee,
    searchEmployee,
};
