import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
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

const CONNECT_U_TO_S = gql`
  mutation connectUTS($where: USERWhere, $connect: USERConnectInput) {
    updateUsers(where: $where, connect: $connect) {
      info {
        bookmark
      }
    }
  }
`;

const AddSkillU = ({ user_id }) => {
  const [skill_id, setSkillID] = useState("");
  const [rating, setRating] = useState(1);
  const { loading, error, data } = useQuery(GET_SKILLS);
  const [connect, { data_c, loading_c, error_c }] = useMutation(
    CONNECT_U_TO_S,
    {
      variables: {
        where: {
          id: user_id,
        },
        connect: {
          has_skills: [
            {
              where: {
                node: {
                  id: null,
                },
              },
              edge: {
                rating: 1,
              },
            },
          ],
        },
      },
      refetchQueries: ["skillRatingOfUser"],
    }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error in AddSkillU</p>;

  return (
    <>
      <div className="p-11 py-3 flex flex-col h-80 w-1/4 backdrop-blur box-border border-y-8 border-x-2 border-gray-600 rounded-t-lg shadow-2xl">
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
          {/* <div className="relative mt-1 rounded-md shadow-sm mb-6">
            <input
              id="skill"
            //   value={skill}
              placeholder="Skill"
              className="shadow appearance-none border block py-1 w-full rounded-md border-gray-400 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            //   onChange={(e) => setSkill(e.target.value)}
            />
          </div> */}
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            disabled={!data.skills.length}
            id="skill"
            onChange={(e) => {
              setSkillID(e.target.value);
            }}
            onBlur={(e) => {
              setSkillID(e.target.value);
            }}
          >
            {data.skills.map((skill, i) => (
              <option key={i} value={skill.id}>
                {skill.skill_name}
              </option>
            ))}
          </select>
          <div className="mt-4 mb-6 ">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rating:
            </label>
            <div className="flex flex-row justify-around">
              <div>
                <input
                  type="radio"
                  id="ratingChoice1"
                  name="rating"
                  checked={rating == 1}
                  value="1"
                  onChange={(e) => {
                    setRating(1);
                  }}
                />
                <label className="pl-1" htmlFor="ratingChoice1">
                  1
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="ratingChoice2"
                  name="rating"
                  checked={rating == 2}
                  onChange={(e) => {
                    setRating(2);
                  }}
                  value="2"
                />
                <label className="pl-1" htmlFor="ratingChoice2">
                  2
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="ratingChoice3"
                  name="rating"
                  checked={rating == 3}
                  onChange={(e) => {
                    setRating(3);
                  }}
                  value="3"
                />
                <label className="pl-1" htmlFor="ratingChoice3">
                  3
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="ratingChoice4"
                  name="rating"
                  checked={rating == 4}
                  onChange={(e) => {
                    setRating(4);
                  }}
                  value="4"
                />
                <label className="pl-1" htmlFor="ratingChoice4">
                  4
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="ratingChoice5"
                  name="rating"
                  checked={rating == 5}
                  onChange={(e) => {
                    setRating(5);
                  }}
                  value="5"
                />
                <label className="pl-1" htmlFor="ratingChoice5">
                  5
                </label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="button"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mb-3"
              onClick={() => {
                connect({
                  variables: {
                    where: {
                      id: user_id,
                    },
                    connect: {
                      has_skills: [
                        {
                          where: {
                            node: {
                              id: skill_id,
                            },
                          },
                          edge: {
                            rating: rating,
                          },
                        },
                      ],
                    },
                  },
                });
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkillU;
