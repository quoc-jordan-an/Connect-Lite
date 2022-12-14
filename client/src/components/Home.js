import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="flex flex-col justify-around place-content-center">
      <div className="pt-64" />
      <div className=" flex flex-row justify-center">
        <div />
        <div className="backdrop-blur-sm p-6 border-4 border-gray-800">
          <div className="text-center text-7xl font-mono font-bold text-blue-800 underline pb-5">
            Welcome to Connect Lite!
          </div>

          {isAuthenticated ? (
            <>
              <div className="text-center text-xl">Hello, {user.name}!</div>
              <div className="text-center text-lg text-red-500 font-bold">Click on the User tab to see/add skills!</div>
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
