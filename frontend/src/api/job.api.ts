import { gql } from "@apollo/client";


export const GET_JOBS = gql`
  query GetJobs($filter: JobFilterInput!) {
    getJobs(filter: $filter) {
      id
      title
      company
      location
      experienceLevel
      salaryRange
      industry
      requiredSkills
      details
      isFavorite
      favoriteId
      createdAt
      updatedAt
    }
  }
`;


export const GET_JOB = gql`
  query GetJob($id: ID!) {
    getJobById(id: $id) {
      id
      title
      company
      location
      experienceLevel
      salaryRange
      industry
      requiredSkills
      details
      isFavorite
      favoriteId
      createdAt
      updatedAt
    }
  }
`;

export const GET_SIMILAR_JOBS = gql`
  query GetSimilarJobs($jobId: ID!) {
    getSimilarJobs(jobId: $jobId) {
      id
      title
      company
      location
      experienceLevel
      salaryRange
      industry
      requiredSkills
      createdAt
      updatedAt
    }
  }
`;


// Only id, title and company will be returned
export const CREATE_JOB = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      id
      title
      company
    }
  }
`;

export const DELETE_JOB = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;


export const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $input: UpdateJobInput!) {
    updateJob(id: $id, input: $input) {
      id
      title
      company
      location
      experienceLevel
      salaryRange
      industry
      details
      requiredSkills
    }
  }
`;

export const SEARCH_JOBS = gql`
  query SearchJobs($query: String!) {
    searchJobs(query: $query) {
      id
      title
      company
      location
      experienceLevel
      salaryRange
      industry
      requiredSkills
    }
  }
`;
