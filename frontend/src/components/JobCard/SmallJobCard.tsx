import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/DateFormatter';

interface JobCardProps {
  job: {
    id: number | string;
    title: string;
    company: string;
    location: string;
    salaryRange?: string | number;
    industry?: string;
    requiredSkills?: string;
    updatedAt?: string;
  };
}

const SmallJobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view-job/${job.id}`);
  };

  return (
    <Card
      key={job.id}
      onClick={handleClick}
      sx={{
        p: 1,
        mb: 2,
        borderRadius: 2,
        boxShadow: 2,
        transition: '0.3s',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 5,
          transform: 'scale(1.01)',
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {job.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {job.company} • {job.location}
        </Typography>

        <Typography variant="body2" color="primary" gutterBottom>
          ${job.salaryRange || 'Not specified'}
        </Typography>

        <Typography variant="body2" gutterBottom sx={{mt: 1}}>
          <strong>Industry:</strong> <br />
          {job.industry || 'Not specified'}
        </Typography>

        <Typography variant="body2" gutterBottom sx={{mt: 2}}>
          <strong>Required Skills:</strong> <br />
          {job.requiredSkills || 'General'}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          <strong>Last Updated:</strong>{' '}<br />
          {job.updatedAt
            ? formatDate(job.updatedAt)
            : 'Undefined'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SmallJobCard;
