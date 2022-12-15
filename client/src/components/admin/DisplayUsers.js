import { gql, useQuery, useMutation } from "@apollo/client";
import ConnectUserToSkills from "./ConnectUserToSkill";
import EditUserConnection from "./EditUserConnection";
import { GET_USERS } from "../../query/GET_USERS";
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

// const DELETE_ALL_USERS = gql`
//   mutation deleteAllUsers {
//     deleteUsers {
//       bookmark
//     }
//   }
// `;

const DELETE_USER = gql`
  mutation DeleteUser($where: USERWhere) {
    deleteUsers(where: $where) {
      bookmark
    }
  }
`;

const DisplayUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  //   const [deleteAllUsers, { data_del, loading_del, error_del }] = useMutation(
  //     DELETE_ALL_USERS,
  //     { refetchQueries: ["getAllUsers", "getAllSkills", "skillOfUser", "userOfSkill"] }
  //   );
  const [deleteUser, { data_del1, loading_del1, error_del1 }] = useMutation(
    DELETE_USER,
    {
      refetchQueries: [
        "getAllUsers",
        "getAllSkills",
        "skillOfUser",
        "userOfSkill",
      ],
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error in DisplaySkills</p>;

  //   console.log(data);
  return (
    <div className=" flex flex-col w-3/5 bg-slate-50 font-sans box-border border-2 rounded-md border-gray-600 shadow-2xl text-left px-2 pt-3">
      <div className="border-dashed pb-3 border-b-2 border-black pl-4 flex flex-row w-full content-center justify-between ">
        <div className="text-left font-mono font-bold underline text-blue-700 text-2xl">
          ALL USERS
        </div>
        {/* <button
          onClick={() => deleteAllUsers()}
          className="border border-black px-2 border-b-2 text-white font-medium bg-red-600 rounded-md"
        >
          Delete All
        </button> */}
      </div>

      {data.users.map((users, i) => (
        <div
          key={i}
          className="text-blue-900 px-2 border-b-2 font-serif items-center flex flex-row border-gray-500 py-3"
        >
          {/* className="text-blue-900 px-2 space-x-5 border-b-2 font-serif items-center flex flex-row border-gray-500 py-3" */}
          <img
            className="h-12 w-12 rounded-full float-left border border-black"
            src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
            alt=""
          />
          <div className="pl-5">
            {users.name} | Number of skills know: {users.has_skills.length}
            {/* {users.has_skills.map( (has_skills) => (has_skills.skill_name))} */}
          </div>
          <div className="flex flex-auto" />
          <div className="flex flex-row space-x-1 ">
            <EditUserConnection user_id={users.id} user_name={users.name} />
            <ConnectUserToSkills user_id={users.id} />
            {/* {users.id == "7af06fe1-f312-450a-9a37-026cbf386f15" ? (
              <div />
            ) : (
              <button
                type="button"
                onClick={() =>
                  deleteUser({
                    variables: {
                      where: {
                        id_IN: users.id,
                      },
                    },
                  })
                }
                className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-red-600 font-extrabold"
              >
                {" "}
                -{" "}
              </button>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayUsers;
