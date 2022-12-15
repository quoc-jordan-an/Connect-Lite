import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import AddSkillU from "./user/AddSkillU";
import DisplaySkillsU from "./user/DisplaySkillsU";

// const GET_USERS = gql`
//   query getAllUsers {
//     users {
//       id
//       name
//       has_skills {
//         skill_name
//       }
//     }
//   }
// `;

const User = ({user_id}) => {
//   const [user_id, setUserID] = useState("");
//   const { loading, error, data } = useQuery(GET_USERS, {onCompleted: () => { setUserID(data.users[0].id)}});
  

//   if (loading) {
    
//     return<></>    
//   } 
  
// //   return <></>;
//   if (error) return <p>Error in User.js</p>;

  //   console.log(data.users);

  return (
    <>
      {/* <div>
        Choose User:
        <select
          id="user"
          // disabled={!data.users.length}
          onChange={(e) => {
            setUserID(e.target.value);
          }}
          onBlur={(e) => {
            setUserID(e.target.value);
          }}
        >
          {data.users.map((users, i) => (
            <option key={i} value={users.id}>
              {users.name}
            </option>
          ))}
        </select>
      </div> */}
      <div className="flex flex-row w-full justify-center content-center border p-4 space-x-3 items-left">
        <AddSkillU user_id={user_id} />
        <DisplaySkillsU user_id={user_id} />
      </div>
    </>
  );
};

export default User;
