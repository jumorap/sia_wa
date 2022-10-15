import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import InfoPersonal from "./Pages/InfoPersonal";


function App() {
    return (
        <>
            <Router>
                <Route path="/info_personal" component={InfoPersonal}/>
            </Router>
        </>
    );
}

export default App;
