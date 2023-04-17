import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;