import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
query getAllSkills {
  skills {
    skill_name
    id
    users {
      name
    }
  }
}
`;