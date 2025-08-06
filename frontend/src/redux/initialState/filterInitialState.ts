interface FilterState {
  query: string;
  industry: string;
  location: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export const filterInitialState: FilterState = {
  query: "",
  industry: "",
  location: "",
  sortBy: "",
  sortOrder: "asc",
};
