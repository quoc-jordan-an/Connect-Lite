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

const key = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVYeFplbXpfRVVWSWRzTmpxeXlwTiJ9.eyJpc3MiOiJodHRwczovL2Rldi1yZGJneW51OGM2dGJqbXhsLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJiT1dyY1JMaGhtZzRrSVlCRXh0M0hpQWxlSlFsZUJpVEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtcmRiZ3ludThjNnRiam14bC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY3MTU1NTA3NiwiZXhwIjoxNjc0MTQ3MDc2LCJhenAiOiJiT1dyY1JMaGhtZzRrSVlCRXh0M0hpQWxlSlFsZUJpVCIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphY3Rpb25zX2xvZ19zZXNzaW9ucyBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.Zx4d03w--D7m62AyzPkUdrVE1LoP6u16jY_SO1Fpwjlx50IDJwBVj0vObSLmWlZ1to10WJxv3EkR43pQqqmWp4PA-u6F0ZLxlcUNR8IC3-JdQPmCv3FLGpewhrplUSNQoYQkO6Mk9YbLkfsle1nIZBS2BdtlcadAuFmjopknJ5Fn2YElyUYWNp2lUoezWX1ksN3oj_YgsDfVLRjkHcX7bNjazm0mi_Kt02rveLI2gtGWnyOiAhZ76R8aZKhhHZ2MpPiaSBsiwQ1ecQbOvEEjt_PcE35ognjH69tj0KU-s1zk2h2IgIxZe0nQEE7jNECHW7G4zIKNIghKh0yLNsCYmw`;

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
