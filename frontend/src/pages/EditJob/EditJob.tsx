import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Job } from '../../modals/job';
import { jobInitialState } from '../../redux/initialState/jobInitialState';
import { GET_JOB, UPDATE_JOB } from '../../api/job.api';
import LoadingScreen from '../../components/common/Loading/LoadingScreen';
import Header from '../../components/common/Header/Header';
import {
    Container,
    TextField,
    Typography,
    Stack,
    Paper,
    MenuItem,
} from '@mui/material';
import CustomButton from '../../components/common/Button/CustomButton';
import { experienceLevels } from '../../constants/constant';

const EditJob: React.FC = () => {

    const navigate = useNavigate();
    const { jobId } = useParams<{ jobId: string }>();
    const [job, setJob] = useState<Job>(jobInitialState);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_JOB, {
        variables: { id: jobId ?? '' },
        skip: !jobId,
    });

    const [updateJob, { data: updateData, loading: updating, error: updateError }] = useMutation(UPDATE_JOB);

    useEffect(() => {
        if (jobData?.getJobById) {
            setJob(jobData.getJobById);
        }
        if (jobError) {
            console.error('GraphQL Error:', jobError);
        }
    }, [jobData, jobError]);

    useEffect(() => {
        if (jobError) setErrorMessage(jobError.message);
        else if (updateError) setErrorMessage(updateError.message);
    }, [jobError, updateError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateJob({
                variables: {
                    id: jobId,
                    input: {
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        experienceLevel: job.experienceLevel,
                        salaryRange: job.salaryRange,
                        industry: job.industry,
                        requiredSkills: job.requiredSkills,
                        details: job.details,
                    },
                },
            });
            navigate(`/view-job/${jobId}`);
        } catch (err) {
            console.error('Error updating job:', err);
        }
    };

    return (
        <>
            {(jobLoading || updating || errorMessage) && (
                <LoadingScreen
                    loading={jobLoading || updating}
                    error={jobError?.message || updateError?.message}
                    onErrorConfirm={() => {
                        setErrorMessage("");
                    }}
                />
            )}

            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
                    <Typography variant="h4" mb={3} fontWeight="bold">
                        Edit Job
                    </Typography>

                    <Stack spacing={3}>
                        <TextField
                            label="Job Title"
                            name="title"
                            value={job.title}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Company"
                            name="company"
                            value={job.company}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Location"
                            name="location"
                            value={job.location}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            select
                            label="Experience Level"
                            name="experienceLevel"
                            value={job.experienceLevel}
                            onChange={handleChange}
                            fullWidth
                        >
                            {experienceLevels.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Salary Range"
                            name="salaryRange"
                            value={job.salaryRange || ''}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Industry"
                            name="industry"
                            value={job.industry || ''}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Required Skills as a string */}
                        <TextField
                            label="Required Skills"
                            name="requiredSkills"
                            value={job.requiredSkills}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Job Details"
                            name="details"
                            value={job.details || ''}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4} // Adjust rows for text area height
                            sx={{ mt: 2 }} // Optional: adds margin-top for spacing
                        />

                        <CustomButton
                            onClick={handleSave}
                            disabled={updating}
                            sx={{ alignSelf: "flex-end", mt: 2 }}
                        >
                            {updating ? "Saving..." : "Save Changes"}
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
        </>
    );
};

export default EditJob;
