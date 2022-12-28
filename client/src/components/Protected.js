import { Navigate } from "react-router-dom";
const Protected = ({ authorize, children }) => {
  if (!authorize) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
