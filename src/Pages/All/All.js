import React from "react";
import General from "../General";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../../Routes";
import Login from "../Session";
import InfoPersonal from "../InfoPersonal";
import Inscripciones from "../Inscripcion";
import CalificacionesEst from "../Calificaciones/Estudiante";
import CalificacionesDoc from "../Calificaciones/Docente";
import Footer from "../../Layouts/Footer";
import styles from "./styles"


const All = () => {
    return (
        <>
            <General />
            <Box sx={styles.boxContainer}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={ Login } />

                        <PrivateRoute exact path="/info_personal" component={ InfoPersonal } />
                        <PrivateRoute exact path="/inscripciones" component={ Inscripciones } />
                        <PrivateRoute path="/mis_calificaciones" component={ CalificacionesEst }/>
                        <PrivateRoute path="/ingreso_calificaciones" component={ CalificacionesDoc }/>

                        <Route path="/*" component={() => { return <h1>404 NOT FOUND</h1> }}></Route>
                    </Switch>
                </Router>
            </Box>
            <Footer />
        </>
    )
}

export default All;
