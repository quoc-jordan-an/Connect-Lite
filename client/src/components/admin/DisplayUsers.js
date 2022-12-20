import { gql, useQuery, useMutation } from "@apollo/client";
import ConnectUserToSkills from "./ConnectUserToSkill";
import EditUserConnection from "./EditUserConnection";
import { GET_USERS } from "../../query/GET_USERS";
import axios from "axios";
import EditUser from "./EditUser";
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

const key = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVYeFplbXpfRVVWSWRzTmpxeXlwTiJ9.eyJpc3MiOiJodHRwczovL2Rldi1yZGJneW51OGM2dGJqbXhsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJiT1dyY1JMaGhtZzRrSVlCRXh0M0hpQWxlSlFsZUJpVEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtcmRiZ3ludThjNnRiam14bC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MTQ4NTg2NSwiZXhwIjoxNjcxNTcyMjY1LCJhenAiOiJiT1dyY1JMaGhtZzRrSVlCRXh0M0hpQWxlSlFsZUJpVCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.mjQmlOprHVpEfvsyXzKanHeQp0ZpY9YZhgc8rvSQTyonuHIwfLu5v5rLX-llkDgrqM5yr_EOU6KyoAypD1FSfH2MWP6iEg7bqf85vdhUPYLUnlVxEWoVxXH6T3Z706eBz43JIssQdiwOwLiy0mwaPBzcHirC29Dms2I-5CkVCBCRDsJKaIQcN8QHh6d9B4DoNqHWrivHfQlSFTY3Lp31wvCc7wro5tSkjuyeOZ6bgOG6bGfAbYKxRLQZys6sO6Pl1qi-IQwI9hIZKsinl75GPERbb27jOHjHIxhXVQPW3cmL1OXCacTHZ9Ny-y5n47fPmuEn0fSbnXjvxBZgFRLlvw`;

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
            <EditUser user_id={users.id} user_name={users.name}/>
            <EditUserConnection user_id={users.id} user_name={users.name} />
            <ConnectUserToSkills user_id={users.id} />
            <button
              type="button"
              onClick={() => {
                deleteUser({
                  variables: {
                    where: {
                      id_IN: users.id,
                    },
                  },
                });
                try {
                  var options = {
                    method: "DELETE",
                    url: `https://dev-rdbgynu8c6tbjmxl.us.auth0.com/api/v2/users/${users.id}`,
                    // params: { q: 'email:"jan@jahnelgroup.com"', search_engine: "v3" },

                    headers: {
                      Authorization: `Bearer ${key}`
                    },
                  };

                  axios
                    .request(options)
                    .then(function (response) {
                      console.log(response.data);
                    })
                    .catch(function (error) {
                      console.error(error);
                    });
                } catch (e) {
                  console.log(e.message);
                }
              }}
              className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-red-600 font-extrabold"
            >
              {" "}
              -{" "}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayUsers;
