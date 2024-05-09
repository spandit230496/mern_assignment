import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
    name: "query",
    initialState: {
        value: "", // Initial state for query value
        employeeData: null, // Initial state for employee data
    },
    reducers: {
        setQuery: (state, action) => {
            state.value = action.payload; // Update query value
        },
        setEmployeeData: (state, action) => {
            state.employeeData = { ...action.payload, isEdit: true }; // Update employee data with isEdit flag
        },
    },
});

export const { setQuery, setEmployeeData } = querySlice.actions;

export default querySlice.reducer;
