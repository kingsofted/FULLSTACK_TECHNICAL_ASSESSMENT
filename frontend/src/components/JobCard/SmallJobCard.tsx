import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
    favoriteId?: string;
    isFavorite?: boolean; // Added
  };
  onRemoveFavorite?: (favoriteId: string) => void;
}

const SmallJobCard: React.FC<JobCardProps> = ({ job, onRemoveFavorite }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/view-job/${job.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFavorite && job.favoriteId) {
      onRemoveFavorite(job.favoriteId);
    }
  };

  return (
    <Card
      key={job.id}
      onClick={handleClick}
      sx={{
        position: 'relative', // needed for icon positioning
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
      {/* Favorite icon at top right */}
      {job.isFavorite && (
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <FavoriteIcon fontSize="small" color="error" />
        </Box>
      )}
      {!job.isFavorite && (
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <FavoriteBorderIcon fontSize="small" color="disabled" />
        </Box>
      )}

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

        <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
          <strong>Industry:</strong> <br />
          {job.industry || 'Not specified'}
        </Typography>

        <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
          <strong>Required Skills:</strong> <br />
          {job.requiredSkills || 'General'}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <strong>Last Updated:</strong> <br />
          {job.updatedAt ? formatDate(job.updatedAt) : 'Undefined'}
        </Typography>
      </CardContent>

      {onRemoveFavorite && job.favoriteId && (
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <IconButton color="error" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default SmallJobCard;
