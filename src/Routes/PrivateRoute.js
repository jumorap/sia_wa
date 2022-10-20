import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

    // TODO: Place the logic to check if the user is logged in here
    let isUser = true

    return (
        <Route
            {...rest}
            render={routeProps =>
                isUser ? (
                    /*<RouteComponent {...routeProps} />*/
                    <RouteComponent />
                ) : (
                    <Redirect to={"/"} />
                )
            }
        />
    );
}

export default PrivateRoute