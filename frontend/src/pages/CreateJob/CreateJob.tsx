import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Job } from '../../modals/job';
import { jobInitialState } from '../../redux/initialState/jobInitialState';
import { CREATE_JOB, GET_JOBS } from '../../api/job.api';
import LoadingScreen from '../../components/common/Loading/LoadingScreen';
import Header from '../../components/common/Header/Header';
import {
    Button,
    Container,
    TextField,
    Typography,
    Stack,
    Paper,
    MenuItem,
} from '@mui/material';
import { experienceLevels } from '../../constants/constant';

const CreateJob: React.FC = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState<Job>(jobInitialState);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [createJob, { data: createData, loading: creating, error: createError }] = useMutation(CREATE_JOB);

    useEffect(() => {
        if (createError) {
            setErrorMessage(createError.message);
        }
    }, [createError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await createJob({
                variables: {
                    input: {
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        experienceLevel: job.experienceLevel,
                        salaryRange: Number(job.salaryRange),
                        industry: job.industry,
                        requiredSkills: job.requiredSkills,
                        details: job.details,
                    },
                },
                refetchQueries: [{ query: GET_JOBS }]
            });

            if (data?.createJob?.id) {
                navigate(`/view-job/${data.createJob.id}`);
            } else {
                navigate(`/`);
            }
        } catch (err) {
            console.error('Error creating job:', err);
        }
    };

    return (
        <>
            {(creating || errorMessage) && (
                <LoadingScreen
                    loading={creating}
                    error={createError?.message}
                    onErrorConfirm={() => {
                        setErrorMessage("");
                    }}
                />
            )}

            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
                    <Typography variant="h4" mb={3} fontWeight="bold">
                        Create Job
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
                            rows={4}
                            sx={{ mt: 2 }}
                        />

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleCreate}
                            disabled={creating}
                            sx={{
                                alignSelf: 'flex-end',
                                mt: 2,
                                borderRadius: 50,
                                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.2,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                },
                            }}
                        >
                            {creating ? 'Creating...' : 'Confirm Creation'}
                        </Button>

                        <Button
                            component={Link}
                            to={`/`}
                            variant="contained"
                            sx={{
                                alignSelf: 'flex-end',
                                mt: 2,
                                borderRadius: 50,
                                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                px: 4,
                                py: 1.2,
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)',
                                },
                            }}
                        >
                            Back
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
};

export default CreateJob;
