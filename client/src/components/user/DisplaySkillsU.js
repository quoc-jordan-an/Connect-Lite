import EditSkillConnection from "../admin/EditSkillConnection";
import { gql, useQuery, useMutation } from "@apollo/client";
import EditConnection from "./EditConnection";

const SKILL_RATING_OF_USER = gql`
  query skillRatingOfUser($where: USERWhere) {
    users(where: $where) {
      has_skillsConnection {
        edges {
          node {
            id
            skill_name
          }
          rating
        }
      }
    }
  }
`;

const DELETE_CONNECTION = gql`
  mutation deleteConnection(
    $disconnect: SKILLDisconnectInput
    $where: SKILLWhere
  ) {
    updateSkills(disconnect: $disconnect, where: $where) {
      info {
        bookmark
      }
    }
  }
`;

const DisplaySkillsU = ({ user_id }) => {
  const { loading, error, data } = useQuery(SKILL_RATING_OF_USER, {
    variables: {
      where: {
        id: user_id,
      },
    },
  });

  const [deleteConnect, { data_d, loading_d, error_d }] = useMutation(
    DELETE_CONNECTION,
    {
      variables: {
        disconnect: {
          users: [
            {
              where: {
                node: {
                  id: null,
                },
              },
            },
          ],
        },
        where: {
          id: null,
        },
      },
      refetchQueries: ["skillRatingOfUser"],
    }
  );

  if (loading)
    return (
      <>
        <div className=" flex flex-col  w-3/5 bg-slate-50 font-sans box-border border-2 rounded-md border-gray-600 shadow-2xl text-left px-2 pt-3">
          <div className="border-dashed pb-3 border-b-2 border-black pl-4 flex flex-row w-full content-center justify-between ">
            <div className="text-left font-mono font-bold underline text-blue-700 text-2xl">
              MY SKILLS
            </div>
          </div>
          <div>Loading</div>
        </div>
      </>
    );
    if (user_id=="")
    return (
      <>
        <div className=" flex flex-col  w-3/5 bg-slate-50 font-sans box-border border-2 rounded-md border-gray-600 shadow-2xl text-left px-2 pt-3">
          <div className="border-dashed pb-3 border-b-2 border-black pl-4 flex flex-row w-full content-center justify-between ">
            <div className="text-left font-mono font-bold underline text-blue-700 text-2xl">
              MY SKILLS
            </div>
          </div>
          <div>Please choose user again</div>
        </div>
      </>
    );
  //   console.log(data);
  //   const data = {
  //     skills: [
  //       {
  //         skill_name: "Java",
  //         id: 1,
  //         users: [{ name: "Jordan" }],
  //       },
  //       { skill_name: "Python", users: [{ name: "Jordan" }], id: 2 },
  //       { skill_name: "Python", users: [{ name: "Jordan" }], id: 2 },
  //       { skill_name: "Python", users: [{ name: "Jordan" }], id: 2 },
  //     ],
  //   };
  return (
    <>
      <div className=" flex flex-col  w-3/5 bg-slate-50 font-sans box-border border-2 rounded-md border-gray-600 shadow-2xl text-left px-2 pt-3">
        <div className="border-dashed pb-3 border-b-2 border-black pl-4 flex flex-row w-full content-center justify-between ">
          <div className="text-left font-mono font-bold underline text-blue-700 text-2xl">
            MY SKILLS
          </div>
        </div>

        {data.users[0].has_skillsConnection.edges.map((skills, i) => (
          <div
            key={i}
            className="text-blue-900 px-2 border-b-2 font-serif items-center flex flex-row border-gray-500 py-3"
          >
            {/* className="text-blue-900 px-2 space-x-5 border-b-2 font-serif items-center flex flex-row border-gray-500 py-3" */}
            <img
              className="h-16 w-18 float-left border border-black"
              src="https://cdn-icons-png.flaticon.com/512/2362/2362366.png"
              alt=""
            />
            <div className="pl-5">
              {skills.node.skill_name} | Your rating: {skills.rating}
              {/* {skills.users.map( (users) => (users.name))} */}
            </div>
            <div className="flex flex-auto" />
            <div className="flex flex-row space-x-1 ">
              {/* <button className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-green-600 font-extrabold">
              +
            </button> */}
              {/* <EditSkillConnection skill_id={skills.id} skill_name={skills.skill_name}/> */}
              {/* <ConnectSkillToUser skill_id={skills.id} /> */}
              <EditConnection
                skill_id={skills.node.id}
                user_id={user_id}
                skill_name={skills.node.skill_name}
              />
              <button
                type="button"
                onClick={() => {
                  deleteConnect({
                    variables: {
                      disconnect: {
                        users: [
                          {
                            where: {
                              node: {
                                id: user_id,
                              },
                            },
                          },
                        ],
                      },
                      where: {
                        id: skills.node.id,
                      },
                    },
                  });
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
    </>
  );
};

export default DisplaySkillsU;
