import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import InfoPersonal from "./Pages/InfoPersonal";
import {BuscadorCursos} from "./Pages"


function App() {
    return (
        <>
            <Router>
                <Route path="/info_personal" component={InfoPersonal}/>
                <Route path="/buscador_cursos" component={BuscadorCursos}/>
            </Router>
        </>
    );
}

export default App;
