import Navbar from "./Navbar";
import React, { StrictMode } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, createContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import Home from "./Home";
import About from "./About";
import Admin from "./Admin";
import User from "./User";
import Protected from "./Protected";

export const AdminContext = createContext();

// const CREATE_USER = gql`
//   mutation createUsers($where: USERWhere, $update: USERUpdateInput) {
//     updateUsers(where: $where, update: $update) {
//       info {
//         bookmark
//       }
//     }
//   }
// `;

const MERGE_USER = gql`
  mutation mergeUsers($mergeUserId: ID!, $name: String!) {
    mergeUser(id: $mergeUserId, name: $name) {
      id
    }
  }
`;

const App = () => {
  const [admin, setAdmin] = useState(false);
  const [appMetadata, setAppMetadata] = useState(null);
  const [user_id, setUserID] = useState("");
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [mergeUser, { data, loading, error }] = useMutation(MERGE_USER, {
    variables: {
      name: null,
      mergeUserId: null,
    },
    refetchQueries: [],
  });

  useEffect(() => {
    const getAppMetadata = async () => {
      const domain = "dev-rdbgynu8c6tbjmxl.us.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { app_metadata } = await metadataResponse.json();

        setAppMetadata(app_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAppMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  useEffect(() => {
    if (appMetadata && appMetadata.admin) {

      setAdmin(true);
    }

    if (user) {
    //   console.log(user.sub);

    //   console.log(user.name);
      mergeUser({
        variables: {
          name: user.name,
          mergeUserId: user.sub,
        },
      });
      setUserID(user.sub);
    }
  }, [appMetadata]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <StrictMode>
      <AdminContext.Provider value={admin}>
        <BrowserRouter>
          <div>
            <Navbar />
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/user"
              element={
                <Protected authorize={isAuthenticated}>
                  <User user_id={user_id} />
                </Protected>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/admin"
              element={
                <Protected authorize={isAuthenticated && admin}>
                  <Admin />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </AdminContext.Provider>
    </StrictMode>
  );
};

export default App;
