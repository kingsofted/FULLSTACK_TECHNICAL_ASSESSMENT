import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PaidIcon from "@mui/icons-material/Paid";
import { Job } from "../../modals/job";
import { useNavigate } from "react-router-dom";

const JobCard: React.FC<{ job: Job }> = ({ job }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view-job/${job.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.3s",
        "&:hover": { boxShadow: 5, transform: "translateY(-4px)" },
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <BusinessIcon fontSize="small" color="primary" />
          <Typography variant="body2">{job.company}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2">{job.location}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <WorkIcon fontSize="small" color="secondary" />
          <Typography variant="body2">{job.experienceLevel}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PaidIcon fontSize="small" color="success" />
          <Typography variant="body2">${job.salaryRange}</Typography>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={1}>
          <Typography variant="body2">${job.requiredSkills}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
