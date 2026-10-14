import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, loggedIn }) {
  return loggedIn ? element : <Navigate to="/sign-in" replace />;
}
