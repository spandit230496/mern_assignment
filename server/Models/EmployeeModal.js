const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    name: {
        required: true,
        type: "String",
    },
    email: {
        required: true,
        type: "String",
    },
    mobileno: {
        required: true,
        type: "String",
    },
    designation: {
        required: true,
        type: "String",
    },
    gender: {
        required: true,
        type: "String",
    },
    course: {
        required: true,
        type: "String",
    },
    image: {
        required: false,
        type: "String",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = { Employee };
