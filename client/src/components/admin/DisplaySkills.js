import { gql, useQuery, useMutation } from "@apollo/client";
import ConnectSkillToUser from "./ConnectSkillToUser";
import EditSkillConnection from "./EditSkillConnection";

const GET_SKILLS = gql`
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

const DELETE_ALL_SKILLS = gql`
  mutation deleteAllSkills {
    deleteSkills {
      bookmark
    }
  }
`;

const DELETE_SKILL = gql`
  mutation DeleteSkill($where: SKILLWhere) {
    deleteSkills(where: $where) {
      bookmark
    }
  }
`;

const DisplaySkills = () => {
  const { loading, error, data } = useQuery(GET_SKILLS);
  const [deleteAllSkills, { data_del, loading_del, error_del }] = useMutation(
    DELETE_ALL_SKILLS,
    { refetchQueries: ["getAllSkills", "getAllUsers", "skillOfUser", "userOfSkill"] }
  );
  const [deleteSkill, { data_del1, loading_del1, error_del1 }] = useMutation(
    DELETE_SKILL,
    { refetchQueries: ["getAllSkills", "getAllUsers", "skillOfUser", "userOfSkill"] }
  );

  if (loading || loading_del) return <p>Loading...</p>;
  if (error || error_del) return <p>Error in DisplaySkills</p>;

  // console.log(data);
  return (
    <div className=" flex flex-col w-3/5 bg-slate-50 font-sans box-border border-2 rounded-md border-gray-600 shadow-2xl text-left px-2 pt-3">
      <div className="border-dashed pb-3 border-b-2 border-black pl-4 flex flex-row w-full content-center justify-between ">
        <div className="text-left font-mono font-bold underline text-blue-700 text-2xl">
          ALL SKILLS
        </div>
        <button
          onClick={() => deleteAllSkills()}
          className="border border-black px-2 border-b-2 text-white font-medium bg-red-600 rounded-md"
        >
          Delete All
        </button>
      </div>

      {data.skills.map((skills, i) => (
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
            {skills.skill_name} | People with skill: {skills.users.length}
            {/* {skills.users.map( (users) => (users.name))} */}
          </div>
          <div className="flex flex-auto" />
          <div className="flex flex-row space-x-1 ">
            {/* <button className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-green-600 font-extrabold">
              +
            </button> */}
            <EditSkillConnection skill_id={skills.id} skill_name={skills.skill_name}/>
            <ConnectSkillToUser skill_id={skills.id} />
            <button
              type="button"
              onClick={() =>
                deleteSkill({
                  variables: {
                    where: {
                      id_IN: skills.id,
                    },
                  },
                })
              }
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

export default DisplaySkills;
