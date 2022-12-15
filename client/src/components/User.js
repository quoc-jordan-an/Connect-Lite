import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import AddSkillU from "./user/AddSkillU";
import DisplaySkillsU from "./user/DisplaySkillsU";


const User = ({user_id}) => {

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
