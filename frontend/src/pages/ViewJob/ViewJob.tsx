import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Job } from '../../modals/job';
import { jobInitialState } from '../../redux/initialState/jobInitialState';
import { GET_JOB, DELETE_JOB, GET_JOBS, GET_SIMILAR_JOBS } from '../../api/job.api';
import LoadingScreen from '../../components/common/Loading/LoadingScreen';
import Header from '../../components/common/Header/Header';
import { Box, Container, Typography, Stack, Paper, Divider } from '@mui/material';
import CustomButton from '../../components/common/Button/CustomButton';
import SmallJobCard from '../../components/JobCard/SmallJobCard';



interface GetSimilarJobsResponse {
  getSimilarJobs: Job[];
}


const ViewJob: React.FC = () => {
  window.scrollTo(0, 0); 
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job>(jobInitialState);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_JOB, {
    variables: { id: jobId ?? '' },
    skip: !jobId,
  });

  const { data: similarJob, loading: similarJobLoading, error: similarJobError } = useQuery<GetSimilarJobsResponse>(GET_SIMILAR_JOBS, {
    variables: { jobId: Number(jobId) },
    skip: !jobId,
    fetchPolicy: "no-cache",
  });

  console.log("Similar Jobs Data:", similarJob);

  const [deleteJob, { loading: deleting }] = useMutation(DELETE_JOB);

  useEffect(() => {
    if (jobData?.getJobById) {
      setJob(jobData.getJobById);
    }
    if (jobError) {
      console.error('GraphQL Error:', jobError);
      setErrorMessage(jobError.message);
    }
  }, [jobData, jobError]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete || !jobId) return;

    try {
      await deleteJob(
        {
          variables: { id: jobId },
          refetchQueries: [{ query: GET_JOBS }]
        },
      );
      navigate('/');
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };


  return (
    <>
      {(jobLoading || deleting || errorMessage) && (
        <LoadingScreen
          loading={jobLoading || deleting}
          error={errorMessage}
          onErrorConfirm={() => setErrorMessage("")}
        />
      )}

      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <Typography variant="h4" mb={3} fontWeight="bold">
            Job Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Title</Typography>
              <Typography variant="body1">{job.title}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Company</Typography>
              <Typography variant="body1">{job.company}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Location</Typography>
              <Typography variant="body1">{job.location}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Experience Level</Typography>
              <Typography variant="body1">{job.experienceLevel}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Salary Range</Typography>
              <Typography variant="body1">
                {job.salaryRange ? `$${job.salaryRange}` : 'Not specified'}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Industry</Typography>
              <Typography variant="body1">{job.industry || 'Not specified'}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Required Skills</Typography>
              <Typography variant="body1">{job.requiredSkills || 'Not specified'}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Job Details</Typography>
              <Typography variant="body1">{job.details || 'No additional details provided'}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Last Updated</Typography>
              <Typography variant="body1">
                {job.updatedAt ? new Date(Number(job.updatedAt)).toLocaleString() : 'Unknown'}
              </Typography>
            </Box>
          </Stack>

          {/* Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
            <CustomButton
              to={`/edit-job/${job.id}`}
              sx={{ alignSelf: "flex-end", mt: 2 }}
            >
              Edit
            </CustomButton>
            <CustomButton
              onClick={handleDelete}
              sx={{
                alignSelf: "flex-end", mt: 2, background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)', '&:hover': {
                  background: 'linear-gradient(45deg, #b71c1c 30%, #e53935 90%)',
                },
              }}
            >
              Delete
            </CustomButton>

            <CustomButton to="/" sx={{
              alignSelf: "flex-end", mt: 2, '&:hover': {
                background: 'linear-gradient(45deg, #616161 30%, #757575 90%)',
              }, background: 'linear-gradient(45deg, #757575 30%, #9e9e9e 90%)',
            }}>
              Back
            </CustomButton>

          </Stack>
        </Paper>
      </Container>

        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
          <Container>
            {(similarJobLoading || similarJobError) && (
              <LoadingScreen
                loading={similarJobLoading}
                error={similarJobError?.message}
                onErrorConfirm={() => setErrorMessage("")}
              />
            )}

            <Typography variant="h5" mb={3} fontWeight="bold">
              Similar Jobs
            </Typography>

            <Box sx={{ p: 2 }}>
              {similarJob?.getSimilarJobs?.length ? (
                similarJob.getSimilarJobs.map((job) => (
                  <SmallJobCard key={job.id} job={job} />
                ))
              ) : (
                <Typography color="text.secondary">No similar jobs found</Typography>
              )}
            </Box>
          </Container>
        </Box>



    </>
  );
};

export default ViewJob;
