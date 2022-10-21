import React from "react";
import { Route, Redirect } from "react-router-dom";
import styles from "./styles";
import Box from "@mui/material/Box";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    // TODO: Place the logic to check if the user is logged in here
    let isUser = true

    return (
        <Route
            {...rest}
            render={routeProps =>
                isUser ? (
                    /*<RouteComponent {...routeProps} />*/
                    <Box sx={styles.generalContainer}>
                        <RouteComponent />
                    </Box>
                ) : (
                    <Redirect to={"/"} />
                )
            }
        />
    )
}

export default PrivateRoute
