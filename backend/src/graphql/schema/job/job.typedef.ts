import { gql } from "graphql-tag";


const jobTypeDefs = gql`
type Job {
  id: ID!
  title: String!
  company: String!
  location: String!
  experienceLevel: String!
  salaryRange: Float
  industry: String
  requiredSkills: String
  details: String
  isFavorite: Boolean
  favoriteId: String
  createdAt: String! 
  updatedAt: String!
}

input JobFilterInput {
  query: String
  title: String
  company: String
  location: String
  experienceLevel: String
  salaryRange: [Float]
  industry: String
  requiredSkills: [String]
  sortBy: String
  sortOrder: String
}


input CreateJobInput {
  title: String!
  company: String!
  location: String!
  experienceLevel: String!
  salaryRange: Float
  industry: String
  requiredSkills: String
  details: String
}

input UpdateJobInput {
  title: String
  company: String
  location: String
  experienceLevel: String
  salaryRange: Float
  industry: String
  requiredSkills: String
  details: String
}

type Query {
  getJobs(filter: JobFilterInput!): [Job!]!
  getJobById(id: ID!): Job
  searchJobs(query: String!): [Job!]!
  getSimilarJobs(jobId: ID!): [Job!]!
}

type Mutation {
  createJob(input: CreateJobInput!): Job!
  deleteJob(id: ID!): Boolean!
  updateJob(id: ID!, input: UpdateJobInput!): Job!
}
`;

export default jobTypeDefs;