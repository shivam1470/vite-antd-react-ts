import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "../controller/file";
import catagoryReducer from "../controller/catagory";

// This is the root reducer of the application
//  which combines all the reducers of the
//  application and creates a store
export const store = configureStore({
  reducer: {
    files: fileReducer,
    catagory: catagoryReducer,
  },
});

// This is the type of the root reducer
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
