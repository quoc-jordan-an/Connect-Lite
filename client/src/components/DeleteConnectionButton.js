import { gql, useMutation } from "@apollo/client";

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

const DeleteConnectionButton = ({ skill_id, user_id }) => {
  const [deleteConnect, { data, loading, error }] = useMutation(
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
      refetchQueries: ["getAllSkills", "getAllUsers", "skillOfUser", "userOfSkills"]
    }
  );
  return (
    <>
      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        }}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteConnectionButton;
