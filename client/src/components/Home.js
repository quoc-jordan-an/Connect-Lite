import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext} from "react";
import { AdminContext } from "./App";
import Confirmation from "./admin/Confirmation";



const Home = () => {
  const admin = useContext(AdminContext);
  const [confirm, setConfirm] = useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0();

  let conf;
  // function conf () {
  //   if (confirm){
  //     setConfirm(false)
  //     return <Confirmation open1 = {true}/>
  //   }
  //   return <></>
  // }

  if (confirm){
    conf = <Confirmation open1 = {true}/>
    setConfirm(false)
    
  }
  else{conf = <></>}

  // useEffect(()=>{
  //   setConfirm(false)
  // }, [confirm])

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-col justify-around place-content-center">
      <div className="pt-64" />
      <div className=" flex flex-row justify-center">
        <div>
          {/* <button onClick={() => setConfirm(!confirm)}>CLICK ME</button>
          {confirm ?  } */}
        </div>
        <div className="backdrop-blur-sm p-6 border-4 border-gray-800">
          <div className="text-center text-7xl font-mono font-bold text-blue-800 underline pb-5">
            Welcome to Connect Lite!
          </div>

          {isAuthenticated ? (
            <>
              <div className="text-center text-xl">Hello, {user.name}!</div>

              {admin ? (
                <div className="text-center text-lg text-red-500 font-bold">
                  You are an admin! Click on the Skills tab to see what you can
                  do!
                </div>
              ) : (
                <div className="text-center text-lg text-red-500 font-bold">
                  Click on the Skills tab to see/add skills!
                </div>
              )}
              {/* <h3>App Metadata</h3>
              {appMetadata ? (
                <pre>{JSON.stringify(appMetadata, null, 2)}</pre>
              ) : (
                "No app metadata defined"
              )} */}
            </>
          ) : (
            <>
              <div className="justify-center text-center py-2 text-red-500 font-bold">
                Please log in to see your skills!
              </div>
              <div className="text-center">
                <LoginButton />
              </div>
            </>
          )}
        </div>
        <div className="" />
      </div>
    </div>
  );
};

export default Home;
