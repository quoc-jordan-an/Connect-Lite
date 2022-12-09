import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_SKILL = gql`
  mutation AddSkills($input: [SKILLCreateInput!]!) {
    createSkills(input: $input) {
      skills {
        skill_name
      }
    }
  }
`;

const AddSkill = () => {
  const [skill, setSkill] = useState("");
  const [addSkill, { data, loading, error }] = useMutation(ADD_SKILL, {
    variables: 
        {
            "input": [
              {
                "skill_name": "Default Skill"
              }
            ]
        }
    , refetchQueries: [
        'getAllSkills'
    ]
  });

//   if (loading) return "Adding...";
  if (error) return `Add error! ${error.message}`;

  return (
    <div className="p-11 py-3 flex flex-col w-3/9 h-60 backdrop-blur box-border border-y-8 border-x-2 border-gray-600 rounded-t-lg shadow-2xl">
      <div className="mb-8 font-sans font-bold text-xl text-center text-blue-600 underline">
        ADD A SKILL
      </div>

      <div>
          <label
            htmlFor="skill"
            className="mb-2 block font-sans font-semibold text-gray-700"
          >
            Skill Name: <br></br>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm mb-6">
            <input
              id="skill"
              value={skill}
              placeholder="Skill"
              className="shadow appearance-none border block py-1 w-full rounded-md border-gray-400 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mb-3"
                onClick={ () =>{
                    addSkill({ variables:{
                        "input": [
                          {
                            "skill_name": skill
                          }
                        ]
                      } });
                  }}
            >
              Add
            </button>
          </div>
      </div>
    </div>
  );
};

export default AddSkill;
