import { Job } from '../../entities/Job';
import favoriteTypeDefs from './job/favorite.typedef';
import jobTypeDefs from './job/job.typedef';
import { gql } from "graphql-tag";

export const responseBaseTypeDefs = gql`
  scalar JSON

  interface ResponseBase {
    success: Boolean!
    message: String!
    errorCode: String
    errors: JSON
  }

  type CreateJobResponse implements ResponseBase {
    success: Boolean!
    message: String!
    errorCode: String
    errors: JSON
    data: Job
  }
`;



const typeDefs = [
  jobTypeDefs,
  favoriteTypeDefs,
  responseBaseTypeDefs
];

export default typeDefs;