import { configureStore } from "@reduxjs/toolkit";
import querySlice from './TextSlice';

export const store = configureStore({
    reducer: {
        query: querySlice,
    },
});

export default store;
