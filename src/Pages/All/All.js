import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { PrivateRoute, UserContext } from "../../Routes";
import { General } from "../../Components";
import { Footer } from "../../Layouts";
import { InfoPersonal, InfoAcademica, Home, Horario, Login, Inscripciones, CalificacionesEst, CalificacionesDoc, BuscadorCursos, Error404 } from "../../Pages";
import styles from "./styles"


const All = () => {

    return (
        <>
            <Router>
                <General />
                <Box sx={styles.boxContainer}>
                    <Switch>
                        {
                            useContext(UserContext)[0] ?
                                <PrivateRoute exact path="/" component={ Home } /> :
                                <Route exact path="/" component={ Login }/>
                        }

                        <PrivateRoute exact path="/info_personal" component={ InfoPersonal } />
                        <PrivateRoute exact path="/inscripciones" component={ Inscripciones } />
                        <PrivateRoute path="/mis_calificaciones" component={ CalificacionesEst }/>
                        <PrivateRoute path="/ingreso_calificaciones" component={ CalificacionesDoc }/>
                        <PrivateRoute path="/buscador_cursos" component={ BuscadorCursos }/>
                        <PrivateRoute path="/info_academica" component={ InfoAcademica} />
                        <PrivateRoute path="/horario" component={ Horario} />
                        <Route path="/*" component={ Error404 }></Route>
                    </Switch>
                </Box>
            </Router>

            <Footer />
        </>
    )
}

export default All;
