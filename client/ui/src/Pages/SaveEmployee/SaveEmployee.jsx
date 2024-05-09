import React, { useState, useEffect } from "react";
import BASE_URL from "../../baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {
    Typography,
    TextField,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Button,
} from "@mui/material";
import { AttachFile as AttachFileIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

const SaveEmployee = () => {
    const [file, setFile] = useState(null);
    const [response,setresponse]=useState("")
    
    const navigate = useNavigate();
    const employeeData = useSelector((state) => state.query.employeeData);
    const isEdit=employeeData?.isEdit||false
    console.log(isEdit)
    const [employeedata, setEmployeeData] = useState({
        "name": employeeData?.name,
        "email": employeeData?.email,
        "mobileno": employeeData?.mobileno,
        "gender": employeeData?.gender,
        "image": employeeData?.image,
        "course": employeeData?.course,
        "designation": employeeData?.designation,
    });

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setEmployeeData({ ...employeedata, image: selectedFile });
    };

    const handleChange = (event) => {
        if (event && event.target) {
            const { name, value } = event.target;
            setEmployeeData({ ...employeedata, [name]: value });
        }
    };

    const saveEmployee = async () => {
        try {
            const formData = new FormData();
            formData.append("name", employeedata.name);
            formData.append("email", employeedata.email);
            formData.append("mobileno", employeedata.mobileno);
            formData.append("gender", employeedata.gender);
            formData.append("designation", employeedata.designation);
            formData.append("course", employeedata.course);
            formData.append("image", file);

            const {data} = await axios.post(`${BASE_URL}/api/save`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast(data.message)
            setresponse(data.message)
            navigate('/protected/employeeList')
        } catch (error) {

            toast(error.response.data.message)        }
    };
      const editEmployee= async ()=>{
        const formData = new FormData();
            formData.append("name",employeedata?.name);
            formData.append("email", employeedata?.email);
            formData.append("mobileno",employeedata?.mobileno);
            formData.append("gender", employeedata?.gender);
            formData.append("designation",employeedata?.designation);
            formData.append("course",employeedata?.course);
            formData.append("image", file);
                
        
        const result = await axios.put(`${BASE_URL}/api/edit/${employeeData._id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast(result.data.message)
        setEmployeeData({
            "name": "",
            "email": "",
            "mobileno": "",
            "gender": "",
            "image": "",
            "course": "",
            "designation": "",
        })
        navigate('/protected/employeeList')
    }
 
            useEffect(() => {
        console.log(file);
    }, [file]);

    useEffect(() => {
        console.log(employeedata);
    }, [employeedata]);

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "50%",
                    margin: "auto",
                }}
            >
                <Typography variant="h4">{isEdit?"Edit Employee":"Save Employee"}</Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={employeedata.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    value={employeedata.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Mobile No"
                    name="mobileno"
                    value={employeedata.mobileno}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        label="Gender"
                        name="gender"
                        value={employeedata.gender}
                        onChange={handleChange}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="designation-label">Designation</InputLabel>
                    <Select
                        labelId="designation-label"
                        label="Designation"
                        name="designation"
                        value={employeedata.designation}
                        onChange={handleChange}
                    >
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="developer">Developer</MenuItem>
                        <MenuItem value="designer">Designer</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="course-label">Course</InputLabel>
                    <Select
                        labelId="course-label"
                        label="Course"
                        name="course"
                        value={employeedata.course}
                        onChange={handleChange}
                    >
                        <MenuItem value="engineering">Engineering</MenuItem>
                        <MenuItem value="management">Management</MenuItem>
                        <MenuItem value="design">Design</MenuItem>
                    </Select>
                </FormControl>
                <Input
                    type="file"
                    onChange={handleFileChange}
                    inputProps={{ accept: "image/*" }}
                    endAdornment={
                        <InputAdornment position="end">
                            <label htmlFor="file-input">
                                <IconButton component="span">
                                    <AttachFileIcon />
                                </IconButton>
                            </label>
                        </InputAdornment>
                    }
                />
                <Button
                    sx={{ backgroundColor: "blue", color: "white" }}
                    onClick={isEdit?editEmployee:saveEmployee}
                >
                    {isEdit?"Update Employee":"Save Employee"}
                </Button>
            </Box>
        </div>
    );
};

export default SaveEmployee;
