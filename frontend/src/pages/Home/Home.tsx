import React, { useState } from 'react'
import Header from '../../components/common/Header/Header'
import Parallax from '../../components/parallex/Parallax'
import Mansonry from '../../components/Masonry/Mansonry'
import { useQuery } from '@apollo/client'
import { GET_JOBS } from '../../api/job.api'
import LoadingScreen from '../../components/common/Loading/LoadingScreen'
import {
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Button,
  Stack,
  Paper,
  Typography
} from '@mui/material'
import Search from '../../components/Search/Search'
import CustomButton from '../../components/common/Button/CustomButton'
import { Job } from "../../modals/job";
import { filterInitialState, FilterState } from '../../redux/initialState/filterInitialState'


const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>(filterInitialState);

  const { data, loading: searchLoading, error, refetch } = useQuery<{ getJobs: Job[] }>(GET_JOBS, {
    variables: { filter: filterInitialState },
    fetchPolicy: "no-cache"
  });

  if (searchLoading) return <LoadingScreen loading={searchLoading} error={error?.message} />;

  if (error) {
    console.error("GraphQL Error:", error);
  }

  const handleSearch = (e?: React.MouseEvent) => {
    if (e) e.preventDefault(); 
    refetch({
      filter: {
        ...filters,
        title: searchTerm || filters.title, 
      },
    });
  };

  console.log("DATA: ", data);

  const handleFilterChange = (field: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.preventDefault(); 
    setFilters(filterInitialState);
    refetch({
      filter: filterInitialState
    });

  };


  return (
    <section>
      <Header />
      <div
        style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '16px',
        }}
      >
        <Search />
      </div>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Filter Jobs
        </Typography>
        <Grid container spacing={2}>
          <Grid>
            <TextField
              fullWidth
              label="Title"
              value={filters.title}
              onChange={(e) => handleFilterChange("title", e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Company"
              value={filters.company}
              onChange={(e) => handleFilterChange("company", e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Location"
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
            />
          </Grid>
          <Grid>
            <FormControl fullWidth>
              <InputLabel>Experience</InputLabel>
              <Select
                value={filters.experienceLevel}
                onChange={(e) => handleFilterChange("experienceLevel", e.target.value as Job["experienceLevel"])}
              >
                <MenuItem value="Entry-Level">Entry-Level</MenuItem>
                <MenuItem value="Mid-Level">Mid-Level</MenuItem>
                <MenuItem value="Senior-Level">Senior-Level</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Industry"
              value={filters.industry}
              onChange={(e) => handleFilterChange("industry", e.target.value)}
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Required Skills"
              value={filters.requiredSkills}
              onChange={(e) => handleFilterChange("requiredSkills", e.target.value)}
            />
          </Grid>
          <Grid >
            <Typography gutterBottom>Salary Range (Per Month)</Typography>
            <Slider
              value={filters.salaryRange || [0, 7000]}
              onChange={(_, newValue) =>
                handleFilterChange("salaryRange", newValue as [number, number])
              }
              valueLabelDisplay="auto"
              min={0}
              max={50_000}
              step={1000}
            />
          </Grid>
          <Grid>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="company">Company</MenuItem>
                <MenuItem value="salary">Salary</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl fullWidth>
              <InputLabel>Order</InputLabel>
              <Select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange("sortOrder", e.target.value as "asc" | "desc")}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <CustomButton onClick={(e) => handleReset(e)}>Reset</CustomButton>
              <CustomButton onClick={(e) => handleSearch(e)}>
                Apply Filters
              </CustomButton>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Create Job Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
        <CustomButton to="/create-job">Create Job</CustomButton>
      </Box>

      {/* Jobs Masonry Grid */}
      <Mansonry jobs={data?.getJobs || []} />

      <Parallax />
    </section>
  )
}

export default Home
