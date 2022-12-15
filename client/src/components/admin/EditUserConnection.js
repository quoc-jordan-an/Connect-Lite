import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {SKILL_OF_USER} from  "../../query/SKILL_OF_USER"

// const SKILL_OF_USER = gql`
//   query skillOfUser($where: USERWhere) {
//     users(where: $where) {
//       has_skills {
//         id
//         skill_name
//       }
//     }
//   }
// `;

const CONNECT_U_TO_S = gql`
  mutation connectUTS($where: USERWhere, $connect: USERConnectInput) {
    updateUsers(where: $where, connect: $connect) {
      info {
        bookmark
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

const EditUserConnection = ({ user_id, user_name }) => {
  let [isOpen, setIsOpen] = useState(false);
  const { loading, error, data } = useQuery(SKILL_OF_USER, {
    variables: {
      where: {
        id: user_id,
      },
    },
  });
  const [skill_id, setSkillID] = useState("");
  const [rating, setRating] = useState(1);

  // useEffect(() => {
  //   console.log(rating);
  //   console.log(user_id);
  //   console.log(skill_id);
  // }, [rating, user_id, skill_id]);

  const [connect, { data_c, loading_c, error_c }] = useMutation(
    CONNECT_U_TO_S,
    {
      variables: {
        where: {
          id: null,
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
      refetchQueries: ["getAllSkills", "getAllUsers", "skillOfUser"],
    }
  );

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
      refetchQueries: ["getAllSkills", "getAllUsers", "skillOfUser"],
    }
  );

  if (loading || loading_c || loading_d)
    return (
      <button
        disabled={true}
        onClick={openModal}
        className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-yellow-400 font-extrabold"
      >
        ..
      </button>
    );
  if (error || error_c || error_d) return <p>Error in ConnectSkillToUser</p>;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-yellow-400 font-extrabold"
      >
        ..
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form className="bg-white rounded p-4 py-5">
                    <div className="mb-8 font-sans font-bold text-xl text-center text-blue-600 underline">
                      Edit A Connection
                    </div>
                    <div className="flex flex-row space-x-2 text-gray-700">
                      <p className="font-bold pr-2">User:</p>
                      {user_name}
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Skills:
                      </label>
                      {data.users[0] ? (
                        <select
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled={!data.users[0].has_skills.length}
                          id="skill"
                          onChange={(e) => {
                            setSkillID(e.target.value);
                          }}
                          onBlur={(e) => {
                            setSkillID(e.target.value);
                          }}
                        >
                          {data.users[0].has_skills.map((skill, i) => (
                            <option key={i} value={skill.id}>
                              {skill.skill_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <option />
                      )}
                    </div>
                    <div className="mb-6 ">
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
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
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
                          closeModal();
                        }}
                      >
                        Update Connection
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                                id: skill_id,
                              },
                            },
                          });
                          closeModal();
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          closeModal();
                        }}
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditUserConnection;
