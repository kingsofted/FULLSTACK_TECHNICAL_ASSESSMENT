import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slices/jobSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    job: jobReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
