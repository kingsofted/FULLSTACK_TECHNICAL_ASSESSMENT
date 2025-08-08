import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterInitialState } from "../initialState/filterInitialState";
import { Job } from "../../modals/job";


const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setCompany(state, action: PayloadAction<string>) {
      state.company = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setExperienceLevel(state, action: PayloadAction<Job["experienceLevel"]>) {
      state.experienceLevel = action.payload;
    },
    setSalaryRange(state, action: PayloadAction<[number, number]>) {
      state.salaryRange = action.payload;
    },
    setIndustry(state, action: PayloadAction<string>) {
      state.industry = action.payload;
    },
    setRequiredSkills(state, action: PayloadAction<string>) {
      state.requiredSkills = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
    },
    resetFilters() {
      return filterInitialState;
    },
  },
});

export const {
  setTitle,
  setCompany,
  setLocation,
  setExperienceLevel,
  setSalaryRange,
  setIndustry,
  setRequiredSkills,
  setSortBy,
  setSortOrder,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;