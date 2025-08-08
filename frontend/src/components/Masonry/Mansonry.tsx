import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Job } from '../../modals/job';
import CustomButton from '../common/Button/CustomButton';
import SmallJobCard from '../JobCard/SmallJobCard';



interface MansonryProps {
  jobs: Job[] | [];
}

const Mansonry: React.FC<MansonryProps> = ({ jobs }) => {

  return (
    <Box sx={{ width: '100%', minHeight: 400, p: 2 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
        {jobs.map((job) => (
          <SmallJobCard key={job.id} job={job} />
        ))}
      </Masonry>
    </Box>
  );
};

export default Mansonry;
