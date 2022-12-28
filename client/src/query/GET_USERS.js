import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      has_skills {
        skill_name
      }
    }
  }
`;
