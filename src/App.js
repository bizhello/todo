import React from "react";
import AppRouter from "./components/AppRouter";

import NavBar from './components/UI/NavBar/NavBar'

function App() {
    return (
        <div className="app">
            <NavBar />
            <AppRouter />
        </div>
    );
}

export default App;
