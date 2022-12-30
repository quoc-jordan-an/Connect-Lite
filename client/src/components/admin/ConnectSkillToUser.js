import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      has_skills {
        skill_name
      }
    }
  }
`;

const CONNECT_S_TO_U = gql`
  mutation connectSTU($where: SKILLWhere, $connect: SKILLConnectInput) {
    updateSkills(where: $where, connect: $connect) {
      info {
        bookmark
      }
    }
  }
`;

const ConnectSkillToUser = ({ skill_id }) => {
  // console.log(skill_id);
  let [isOpen, setIsOpen] = useState(false);
  const { loading, error, data } = useQuery(GET_USERS);
  const [user_id, setUserID] = useState("");
  const [rating, setRating] = useState(1);

  // useEffect(() => {
  //   console.log(rating);
  //   console.log(user_id);
  // }, [rating, user_id]);

  const [connect, { data_c, loading_c, error_c }] = useMutation(
    CONNECT_S_TO_U,
    {
      variables: {
        where: {
          id: null,
        },
        connect: {
          users: [
            {
              edge: {
                rating: null,
              },
              where: {
                node: {
                  id: null,
                },
              },
            },
          ],
        },
      },
      refetchQueries: ["getAllSkills", "getAllUsers", "userOfSkill"],
    }
  );

  if (loading || loading_c)
    return (
      <button
        disabled={true}
        onClick={openModal}
        className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-green-600 font-extrabold"
      >
        +
      </button>
    );
  if (error || error_c) return <p>Error in ConnectSkillToUser</p>;

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
        className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-green-600 font-extrabold"
      >
        +
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
                      ADD AN USER
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        User:
                      </label>
                      {data ? (
                        <select
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          disabled={!data.users.length}
                          id="user"
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
                      ) : (
                        <></>
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
                                id: skill_id,
                              },
                              connect: {
                                users: [
                                  {
                                    edge: {
                                      rating: rating,
                                    },
                                    where: {
                                      node: {
                                        id: user_id,
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          });
                          closeModal();
                        }}
                      >
                        Add User
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

export default ConnectSkillToUser;
