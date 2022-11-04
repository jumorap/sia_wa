import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { UserContext } from "./";
import { auth_refresh } from "../Middleware/Session/get-api";
import { Loading } from "../Components";
import styles from "./styles";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [isUser, setUser] = useContext(UserContext);


  useEffect(() => {
      auth_refresh({ auth_token: sessionStorage.getItem("TOKEN") }).then(
        (new_token) => {
          setLoading(false);
          if (new_token?.refreshToken?.auth_token) {
            sessionStorage.setItem("USER", new_token.refreshToken.nombre_usuario);
            sessionStorage.setItem("TOKEN", new_token.refreshToken.auth_token);
              setUser(true);
          }

        }
      );
  }, [setUser]);

  if (loading) return <Loading />; // <-- render loading UI

  return (
    <Route
      {...rest}
      render={() =>
        isUser ? (
          /*<RouteComponent {...routeProps} />*/
          <>
            <Link
                style={styles.linkCloseSession}
                onClick={() => {
                    sessionStorage.clear();
                    setUser(false);
                }}
                to={"/"}
            >
              <Button style={styles.closeSesion}>Cerrar sesión</Button>
            </Link>

            <Box sx={styles.generalContainer}>
              <RouteComponent />
            </Box>
          </>
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

export default PrivateRoute;
