import LoginButton from "./LoginButton";

const Home = () => {
  return (
    <div className="flex flex-col justify-center place-content-center">
      <div className="justify-center text-center">Welcome to Connect Lite!</div>
      <div className="justify-center text-center">
        Please log in to see your skills!
      </div>
      <div className="text-center">
        <LoginButton />
      </div>
    </div>
  );
};

export default Home;
