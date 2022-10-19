import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./Routes";
import InfoPersonal from "./Pages/InfoPersonal";
import Login from "./Pages/Session";
import CalificacionesEst from './Pages/Calificaciones/Estudiante';
import CalificacionesDoc from './Pages/Calificaciones/Docente';
import Inscripciones from "./Pages/Inscripcion";
import General from "./Pages/General";


function App() {
    return (
        <>
            <General />
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
        </>
    );
}

export default App;
