import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InfoPersonal from "./Pages/InfoPersonal";
import Login from "./Pages/Session";
import CalificacionesEst from './Pages/Calificaciones/Estudiante';
import CalificacionesDoc from './Pages/Calificaciones/Docente';

import Inscripciones from "./Pages/Inscripcion";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/info_personal" component={InfoPersonal} />
                <Route path="/mis_calificaciones" component={CalificacionesEst}/>
                <Route path="/ingreso_calificaciones" component={CalificacionesDoc}/>
                <Route path="/*" component={() => { return <h1>404 NOT FOUND</h1> }}></Route>
            </Switch>
        </Router>
    );
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/info_personal" component={InfoPersonal} />
        <Route exact path="/inscripciones" component={Inscripciones} />
        <Route
          path="/*"
          component={() => {
            return <h1>404 NOT FOUND</h1>;
          }}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
