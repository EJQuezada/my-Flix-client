import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies";
import userReducer from "./reducers/user";

export const store = configureStore({
    reducer: { movies: moviesReducer, user: userReducer }
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;