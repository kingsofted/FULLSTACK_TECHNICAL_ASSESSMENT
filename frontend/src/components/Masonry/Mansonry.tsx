import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import { Job } from '../../modals/job';
import SmallJobCard from '../JobCard/SmallJobCard';

interface MansonryProps {
  jobs: (Job & { favoriteId?: string })[];
  onRemoveFavorite?: (favoriteId: string) => void;
}

const Mansonry: React.FC<MansonryProps> = ({ jobs, onRemoveFavorite }) => {
  return (
    <Box sx={{ width: '100%', minHeight: 400, p: 2 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {jobs.map((job) => (
          <SmallJobCard
            key={job.id}
            job={job}
            onRemoveFavorite={onRemoveFavorite}
          />
        ))}
      </Masonry>
    </Box>
  );
};

export default Mansonry;
