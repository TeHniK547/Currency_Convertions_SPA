import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
// import { authReducer } from "./slices/auth";
// import { postReducer } from "./slices/posts";

// const reducer = {
//     auth: authReducer,
//     posts: postReducer
// }

export const store = configureStore({
    reducer: { user: userReducer, }
})