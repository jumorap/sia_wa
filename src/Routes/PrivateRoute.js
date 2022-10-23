import React, { useState, useEffect} from "react";
import { Route, Redirect, Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { auth_refresh } from "../Middleware/Session/get-api";
import { Loading } from "../Components";
import styles from "./styles";
import {Button} from "@mui/material";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const [loading, setLoading] = useState(true); // set some state for loading
    const [isUser, setUser] = useState(false);

    useEffect(() => {
        auth_refresh({ auth_token: sessionStorage.getItem('TOKEN') })
            .then((new_token) => {
                if (new_token?.refreshToken?.auth_token) {
                    sessionStorage.setItem('USER', new_token.refreshToken.nombre_usuario);
                    sessionStorage.setItem('TOKEN', new_token.refreshToken.auth_token);
                    setUser(true);
                }
                setLoading(false);
            });
    }, [])

    if (loading) return <Loading/>; // <-- render loading UI

    return (
        <Route
            {...rest}
            render={routeProps =>
                isUser ? (
                    /*<RouteComponent {...routeProps} />*/
                    <>
                        <Link onClick={() => { sessionStorage.clear(); }} to={"/"}>
                            <Button style={styles.closeSesion}>
                                Cerrar sesión
                            </Button>
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
    )
}

export default PrivateRoute
