import React from "react";
import Box from "@mui/material/Box";
import { General } from "../../Components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../../Routes";
import { Footer } from "../../Layouts";
import { InfoPersonal, InfoAcademica, Login, Inscripciones, CalificacionesEst, CalificacionesDoc, BuscadorCursos, Error404 } from "../../Pages";
import styles from "./styles"


const All = () => {
    return (
        <>
            <Router>
                <General />
                <Box sx={styles.boxContainer}>
                    <Switch>
                        <Route exact path="/" component={ Login } />

                        <PrivateRoute exact path="/info_personal" component={ InfoPersonal } />
                        <PrivateRoute exact path="/inscripciones" component={ Inscripciones } />
                        <PrivateRoute path="/mis_calificaciones" component={ CalificacionesEst }/>
                        <PrivateRoute path="/ingreso_calificaciones" component={ CalificacionesDoc }/>
                        <PrivateRoute path="/buscador_cursos" component={ BuscadorCursos }/>
                        <PrivateRoute path="/info_academica" component={ InfoAcademica} />
                        <Route path="/*" component={ Error404 }></Route>
                    </Switch>
                </Box>
            </Router>

            <Footer />
        </>
    )
}

export default All;
