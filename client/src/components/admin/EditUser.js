import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import axios from "axios";

const key = process.env.REACT_APP_MNGMT_ACCESS_TOKEN;

const CHANGE_NAME = gql`
  mutation changeName($where: USERWhere, $update: USERUpdateInput) {
    updateUsers(where: $where, update: $update) {
      info {
        bookmark
      }
    }
  }
`;

const EditUser = ({ user_id, user_name }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [admin, setAdmin] = useState(null);
  let [name, setName] = useState(user_name);
  const [change_name, { data_c, loading_c, error_c }] = useMutation(
    CHANGE_NAME,
    {
      variables: {
        where: {
          id: user_id,
        },
        update: {
          name: user_name,
        },
      },
      refetchQueries: ["getAllUsers"],
    }
  );

  const SET_NAME = (n) => {
    const domain = "dev-rdbgynu8c6tbjmxl.us.auth0.com";

    try {
      var options = {
        method: "PATCH",
        url: `https://dev-rdbgynu8c6tbjmxl.us.auth0.com/api/v2/users/${user_id}`,

        headers: {
          Authorization: `Bearer ${key}`,
          "content-type": "application/json",
        },
        data: { name: n },
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
  };

  const SET_ADMIN = (a) => {
    const domain = "dev-rdbgynu8c6tbjmxl.us.auth0.com";

    try {
      var options = {
        method: "PATCH",
        url: `https://dev-rdbgynu8c6tbjmxl.us.auth0.com/api/v2/users/${user_id}`,

        headers: {
          Authorization: `Bearer ${key}`,
          "content-type": "application/json",
        },
        data: { app_metadata: { admin: a } },
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
  };
  //   useEffect(() => {
  //     console.log(admin);
  //     if (admin){
  //         console.log("here");
  //     }
  //   }, [admin])

  // useEffect(() => {
  //   console.log(rating);
  //   console.log(user_id);
  //   console.log(skill_id);
  // }, [rating, user_id, skill_id]);

  if (loading_c)
    return (
      <button
        disabled={true}
        onClick={openModal}
        className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-purple-400 font-extrabold"
      >
        ..
      </button>
    );
  if (error_c) return <p>Error in EditUser</p>;

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
        className="border border-gray-500 rounded w-5 h-5 text-center font-mono text-sm text-white bg-purple-400 font-extrabold"
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
                      Edit User
                    </div>
                    <div className="flex flex-col text-gray-700">
                      <p className="font-bold pr-2">User's name:</p>
                      <div className="relative mt-1 rounded-md shadow-sm mb-6">
                        <input
                          id="user"
                          value={name}
                          placeholder={user_name}
                          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="mb-4">
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
                    </div> */}
                    <div>
                      <p className="font-bold pr-2">Role:</p>
                      <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => {
                          setAdmin(e.target.value);
                        }}
                      >
                        <option value={null} />
                        <option key="admin" value={true}>
                          Admin
                        </option>
                        <option key="false" value={false}>
                          User
                        </option>
                      </select>
                    </div>

                    <div className="pt-5 flex items-center justify-between">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={() => {
                          if (admin) {
                            SET_ADMIN(admin);
                            // console.log("set admin!");
                          }
                          if (user_name != name) {
                            SET_NAME(name);
                            change_name({
                              variables: {
                                where: {
                                  id: user_id,
                                },
                                update: {
                                  name: name,
                                },
                              },
                            });
                            // console.log("set name!");
                            // console.log(name);
                            // console.log(user_name);
                          }
                          closeModal();
                        }}
                      >
                        Update User
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

export default EditUser;
