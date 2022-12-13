import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUsers($input: [USERCreateInput!]!) {
    createUsers(input: $input) {
      users {
        name
      }
    }
  }
`;

const AddUser = () => {
  const [user, setUser] = useState("");
  const [addUser, { data, loading, error }] = useMutation(ADD_USER, {
    variables: {
      input: [
        {
          name: "Default Name",
        },
      ],
    },
    refetchQueries: ["getAllUsers"],
  });

//   if (loading) return "Adding...";
  if (error) return `Add error! ${error.message}`;

  return (
    <div className="p-11 py-3 flex flex-col w-3/9 h-60 backdrop-blur box-border border-y-8 border-x-2 border-gray-600 rounded-t-lg shadow-2xl">
      <div className="mb-8 font-sans font-bold text-xl text-center text-blue-600 underline">
        ADD AN USER
      </div>

      <div>
          <label
            htmlFor="user"
            className="mb-2 block font-sans font-semibold text-gray-700"
          >
            User's Name: <br></br>
          </label>
          <div className="relative mt-1 rounded-md shadow-sm mb-6">
            <input
              id="user"
              value={user}
              placeholder="Name"
              className="shadow appearance-none border block py-1 w-full rounded-md border-gray-400 pl-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              disabled={loading}
              onClick={() => {
                addUser({
                    variables: {
                      input: [
                        {
                          name: user,
                        },
                      ],
                    },
                  });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full mb-3"
            >
              Add
            </button>
          </div>
      </div>
    </div>
  );
};

export default AddUser;
