import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import mainApi from "../../utils/MainApi.js";

const ProtectedRouteElement = ({ element: Component, ...props }) => {

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isUnset, setIsUnset] = useState(true)

  useEffect(() => {
    mainApi
        .getUserInfo()
        .then((userInfo) => {
          if (userInfo) {
            setIsAuthorized(true);
            setIsUnset(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsUnset(false);
        });
  }, [])

  return isAuthorized ? (
    <Component {...props} />
  ) : !isUnset && (
    <Navigate to="/" replace />
  );
};

export default ProtectedRouteElement;
