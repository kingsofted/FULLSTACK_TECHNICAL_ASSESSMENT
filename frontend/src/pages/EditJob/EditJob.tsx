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
    Snackbar,
    Alert,
} from '@mui/material';
import CustomButton from '../../components/common/Button/CustomButton';
import { experienceLevels, MESSAGE } from '../../constants/constant';
import { SnackbarSeverity, useSnackbar } from '../../utils/Snackbar';

const EditJob: React.FC = () => {

    const navigate = useNavigate();
    const { jobId } = useParams<{ jobId: string }>();
    const [job, setJob] = useState<Job>(jobInitialState);
    const { snackbarOpen, snackbarMessage, snackbarSeverity, showSnackbar, handleClose } = useSnackbar();

    const { data: jobData, loading: jobLoading, error: jobError } = useQuery(GET_JOB, {
        variables: { id: jobId ?? '' },
        skip: !jobId,
    });

    const [updateJob, { data: updateData, loading: updating, error: updateError }] = useMutation(UPDATE_JOB);

    useEffect(() => {
        setJob(jobData?.getJobById);
    }, [jobData])


    if (jobError) {
        showSnackbar(jobError.message, SnackbarSeverity.ERROR);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJob((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await updateJob({
                variables: {
                    id: jobId,
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
            });
            showSnackbar(
                MESSAGE.ADDED_SUCCESSFULLY,
                SnackbarSeverity.SUCCESS,
            );

            // If we got here, mutation succeeded → navigate
            navigate(`/view-job/${jobId}`);
        } catch (err: any) {
            showSnackbar(err.message, SnackbarSeverity.ERROR);
        }
    };

    return (
        <>
            <Header />
            {(jobLoading || updating) && (
                <LoadingScreen
                    loading={jobLoading || updating}
                    error={jobError?.message || updateError?.message}
                />
            )}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

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
