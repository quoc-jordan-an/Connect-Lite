import { gql } from "@apollo/client";

export const SKILL_OF_USER = gql`
  query skillOfUser($where: USERWhere) {
    users(where: $where) {
      has_skills {
        id
        skill_name
      }
    }
  }
`;
