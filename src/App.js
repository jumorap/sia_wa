import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import InfoPersonal from "./Pages/InfoPersonal";
import Login from "./Pages/Session";


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/info_personal" component={InfoPersonal} />
                <Route path="/*" component={() => { return <h1>404 NOT FOUND</h1> }}></Route>
            </Switch>
        </Router>
    );
}

export default App;
