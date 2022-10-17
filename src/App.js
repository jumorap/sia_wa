import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import InfoPersonal from "./Pages/InfoPersonal";
import Login from "./Pages/Session";


function App() {
    return (
        <>
            <Router>
                <Route path="/auth" component={Login}/>
                <Route path="/info_personal" component={InfoPersonal}/>
            </Router>
        </>
    );
}

export default App;
