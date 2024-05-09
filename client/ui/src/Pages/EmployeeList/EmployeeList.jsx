import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../baseURL";
import { setEmployeeData } from '../../State/TextSlice';
import { Delete, EditOutlined } from "@mui/icons-material";
import { toast } from 'react-toastify';


const EmployeeList = () => {
    const [data, setdata] = useState([]);
    const [search, setsearch] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getEmployee = async () => {
        try {
            const result = await axios.get(`${BASE_URL}/api/employees`);
            setdata(result.data.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const {data}=await axios.delete(`${BASE_URL}/api/delete/${id}`);
            toast(data.message)
            getEmployee(); 
        } catch (error) {
            toast(error)
        }
    };

    const handleSearch = (event) => {
        const { value } = event.target;
        setsearch(value);
    };

    const filterEmployee = async  () => {
        
        try{
           const {data}=await axios.get(`${BASE_URL}/api/search?query=${search}`);
           console.log(data)
            setdata(data);
        }
        catch(error){
            toast(error)
        }
    };

    const employeeData = (employee) => {
        dispatch(setEmployeeData(employee));
        navigate("/saveemployee");
    };

    useEffect(() => {
        filterEmployee();
    }, [search]);

    useEffect(() => {
        getEmployee(); 
    }, []);

    return (
        <div>
            <h1>EmployeeList</h1>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginLeft: "50%",
                    width: "50%",
                    gap: "10px",
                    marginTop: "10px",
                    boxSizing: "border-box",
                    padding: "1rem",
                }}
            >
                <TextField
                    value={search}
                    id="outlined-basic"
                    label="Search Keyword"
                    variant="outlined"
                    onChange={handleSearch}
                />
                <Button
                    sx={{ backgroundColor: "blue", color: "white" }}
                    onClick={() => navigate("/saveemployee")}
                >
                    Add Employee
                </Button>
                <Typography>Total Employee {data.length}</Typography>
            </Box>

            <Table sx={{ minWidth: "650", border: "1px solid black" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>ContactNo</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length ? (
                        data.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>
                                    <img
                                        style={{
                                            height: 50,
                                            width: 50,
                                            maxHeight: { xs: 233, md: 167 },
                                            maxWidth: { xs: 350, md: 250 },
                                        }}
                                        alt="Employee"
                                        src={employee.image}
                                    />
                                </TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.mobileno}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                                <TableCell>{employee.gender}</TableCell>
                                <TableCell>{employee.course}</TableCell>
                                <TableCell>
                                    <EditOutlined onClick={() => employeeData(employee)}>Edit</EditOutlined>
                                    <Delete onClick={() => deleteEmployee(employee._id)} sx={{ color: "red" }}>Delete</Delete>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8}>No Data Found</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeList;
