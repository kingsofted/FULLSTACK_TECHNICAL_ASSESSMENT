import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterInitialState } from "../initialState/filterInitialState";


const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setIndustry(state, action: PayloadAction<string>) {
      state.industry = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
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

export const { setQuery, setIndustry, setLocation, setSortBy, setSortOrder, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;