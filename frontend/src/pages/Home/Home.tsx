import React from 'react'
import Header from '../../components/common/Header/Header'
import Parallax from '../../components/parallex/Parallax'
import Mansonry from '../../components/Masonry/Mansonry'
import { useQuery } from '@apollo/client'
import { GET_JOBS } from '../../api/job.api'
import LoadingScreen from '../../components/common/Loading/LoadingScreen'
import { Box } from '@mui/material'
import Search from '../../components/Search/Search'
import CustomButton from '../../components/common/Button/CustomButton'


// Home Page
const Home: React.FC = () => {

  const { data, loading, error } = useQuery(GET_JOBS);

  if (loading) return <LoadingScreen loading={true} error={error?.message} />;

  if (error) {
    console.error("GraphQL Error:", error);
  }

  console.log(data)

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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 2,
        }}
      >
        <CustomButton to="/create-job">
          Create Job
        </CustomButton>

      </Box>

      <Mansonry jobs={data.getJobs} />
      <Parallax />
    </section>

  )
}

export default Home
