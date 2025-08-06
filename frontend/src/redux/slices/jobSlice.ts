import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jobInitialState } from "../initialState/jobInitialState";
import { Job } from "../../modals/job";


const jobSlice = createSlice({
    name: "job",
    initialState: jobInitialState,
    reducers: {
      setJob(state, action: PayloadAction<Job>) {
        return action.payload;
      },
      updateJob(state, action: PayloadAction<Partial<Job>>) {
        return { ...state, ...action.payload };
      },
      resetJob() {
        return jobInitialState;
      },
    },
  });
  
  export const { setJob, updateJob, resetJob } = jobSlice.actions;
  export default jobSlice.reducer;