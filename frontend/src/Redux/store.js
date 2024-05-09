import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/user";
import { employeeAPI } from "./api/employee";
import { userReducer } from "./Reducer/userReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      userAPI.middleware,
      employeeAPI.middleware
    );
  },
});
