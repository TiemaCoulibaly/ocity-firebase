import React, { memo, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.element,
};
export default memo(ProtectedRoute);
