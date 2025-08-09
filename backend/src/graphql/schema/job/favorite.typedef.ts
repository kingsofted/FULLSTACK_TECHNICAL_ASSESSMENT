import { gql } from "graphql-tag";

const favoriteTypeDefs = gql`
  type Favorite {
    id: ID!
    job: Job!
  }

  input AddFavoriteInput {
    jobId: ID!
  }

  input RemoveFavoriteInput {
    favoriteId: ID!
  }

  type Query {
    favorites: [Favorite!]!
  }

  type Mutation {
    addFavorite(input: AddFavoriteInput!): Favorite!
    removeFavorite(input: RemoveFavoriteInput!): Boolean!
  }
`;

export default favoriteTypeDefs;
