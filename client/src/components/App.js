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
import axios from "axios";
import process from "process";

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

const key = process.env.REACT_APP_MNGMT_ACCESS_TOKEN;

const App = () => {
  // console.log(key);
  // console.log(`Bearer ${key}`);
  // console.log(process.env.TEST);
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

  // const ManagementClient = require('auth0').ManagementClient;
  // const auth0 = new ManagementClient({
  //   domain: 'dev-rdbgynu8c6tbjmxl.us.auth0.com',
  //   clientId: 'DDUWBVkJrx56fMo3s1HWObF1Afppu3fG',
  //   clientSecret: '1yN0DLT-MiptMAvcEZUXEjTFKk8iv4fM0NtvXYgVXOGiyIm4BY_AgF2f9v5F5Kd-',
  //   scope: 'update:users'
  // });

  // const data2 = {
  //   "email": "<email>@gmail.com",
  //   "blocked": false,
  //   "email_verified": false,
  //   "connection": "Initial-Connection",
  //   "password": "secret",
  //   "verify_email": true,
  //   "username": "johndoe"
  // }

  // auth0.createUser(data2, function (err) {
  //   if (err) {
  //     // Handle error.
  //   console.log(err)
  //   }});

  const GET_USER_EXP = () => {
    const domain = "dev-rdbgynu8c6tbjmxl.us.auth0.com";
    // var request = require("request");

    // var options = {
    //   method: "POST",
    //   url: "https://dev-rdbgynu8c6tbjmxl.us.auth0.com/oauth/token",
    //   headers: { "content-type": "application/json" },
    //   body: '{"client_id":"bOWrcRLhhmg4kIYBExt3HiAleJQleBiT","client_secret":"C9uyIYhUc8iz58onqSuvLVUIHYKu0GoJSCZtpeF4XECuJD7kbI8TG6MbOL88-wJF","audience":"https://dev-rdbgynu8c6tbjmxl.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
    // };

    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);

    //   console.log(body);
    // });
    try {
      var axios = require("axios").default;

      var options = {
        method: "POST",
        url: "https://dev-rdbgynu8c6tbjmxl.us.auth0.com/api/v2/users/",
        // params: { q: 'email:"jan@jahnelgroup.com"', search_engine: "v3" },

        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${key}`,
          "content-type": "application/json",
          // "Origin" : 'https://localhost:8080',
          // "Access-Control-Request-Method": "POST",

          // 'Access-Control-Allow-Origin':true
          //`
        },
        data: {
          connection: "con_fbWzfOYL3LUXm2YG",
          email: "jane.doe@example.com",
          name: "test add user",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      // const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

      // const metadataResponse = await fetch(userDetailsByIdUrl, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      // const { app_metadata } = await metadataResponse.json();

      // setAppMetadata(app_metadata);
    } catch (e) {
      console.log(e.message);
    }
  };

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
        // console.log(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    getAppMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  useEffect(() => {
    if (appMetadata && appMetadata.admin == "true") {
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
          {/* <button
            className="border border-black p-2 bg-white"
            onClick={() => {
              // getQuote();
              GET_USER_EXP();

              console.log("deleted");
            }}
          >
            Test
          </button> */}
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
