import { gql } from "@apollo/client";

export const USER_OF_SKILL = gql`
  query userOfSkill($where: SKILLWhere) {
    skills(where: $where) {
      users {
        id
        name
      }
    }
  }
`;
