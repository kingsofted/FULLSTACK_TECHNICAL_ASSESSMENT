import React, { useState, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_JOBS } from "../../api/job.api";
import JobCard from "../JobCard/JobCard";
import { TextField, CircularProgress, Box, Typography, debounce } from "@mui/material";
import { VALUE } from "../../constants/constant";
import CustomButton from "../common/Button/CustomButton";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [searchJobs, { data, loading }] = useLazyQuery(SEARCH_JOBS, {
    fetchPolicy: "no-cache",
  });

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        searchJobs({ variables: { query: searchTerm } });
      } else {
        searchJobs({ variables: { query: "" } });
      }
    }, VALUE.debounceDelay),
    [searchJobs]
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center" >
        Search Jobs
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
          }}
          fullWidth
          label="Search for jobs..."
          variant="outlined"
          value={query}
          onChange={handleChange}
        />

        <CustomButton
          onClick={async () => {
            await searchJobs({ variables: { query } });
          }}
          disabled={loading}
          sx={{
            minWidth: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
        </CustomButton>
      </Box>

      {loading && !data && (
        <Typography textAlign="center" color="text.secondary">
          Searching jobs...
        </Typography>
      )}

      {!loading && data?.searchJobs?.length === 0 && query.trim() !== "" && (
        <Typography textAlign="center" color="text.secondary">
          No jobs found.
        </Typography>
      )}


      {data?.searchJobs?.length > 0 && (
        <Box
          display="grid"
          gap={2}
          sx={{
            maxHeight: "600px",
            overflowY: "auto",
            gridTemplateRows: "auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            backgroundColor: "#fafafa",
            position: "relative",
            boxShadow: "inset 0 -10px 10px -10px rgba(0,0,0,0.2)",
          }}
        >
          {data.searchJobs.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </Box>
      )}



    </Box>
  );
};

export default Search;
