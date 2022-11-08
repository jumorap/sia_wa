import './App.css';
import React from "react";
import All from './Pages/All'
import UserContextProvider from "./Routes/UserProvider";


function App() {
    return (
        <UserContextProvider>
            <All />
        </UserContextProvider>
    );
}

export default App;
