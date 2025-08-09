import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites {
      id
      job {
        id
        title
        company
        location
        experienceLevel
        salaryRange
        industry
        requiredSkills
        details
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($input: AddFavoriteInput!) {
    addFavorite(input: $input) {
      id
      job {
        id
        title
        company
      }
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($input: RemoveFavoriteInput!) {
    removeFavorite(input: $input)
  }
`;

