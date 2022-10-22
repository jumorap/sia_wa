import React from "react";
import { Route, Redirect, Link } from "react-router-dom";
import styles from "./styles";
import { auth_refresh } from "../Middleware/Session/get-api";
import Box from "@mui/material/Box";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const [loading, setLoading] = React.useState(true); // set some state for loading
    const [isUser, setUser] = React.useState(false);

    React.useEffect(() => {
        auth_refresh({ auth_token: sessionStorage.getItem('TOKEN') })
            .then((new_token) => {
                console.log(new_token);
                if (new_token?.refreshToken?.auth_token) {
                    sessionStorage.setItem('USER', new_token.refreshToken.nombre_usuario);
                    sessionStorage.setItem('TOKEN', new_token.refreshToken.auth_token);
                    setUser(true);
                }
                setLoading(false);
            });
    }, [])

    if (loading) return <h1>Cargando ...</h1>; // <-- render loading UI 

    return (
        <Route
            {...rest}
            render={routeProps =>
                isUser ? (
                    /*<RouteComponent {...routeProps} />*/
                    <>
                        <Link style={styles.closeSesion} onClick={() => { sessionStorage.clear(); }} to={"/"}>Cerrar sesión</Link>
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
