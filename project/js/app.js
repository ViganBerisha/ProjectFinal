import React from "react";
import ReactDOM from "react-dom";
import MovieManager from "./MovieManager";
import AddMovie from "./AddMovie"
import Navbar from "./Navbar";


import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

const App = () => {


    return (
        
        <>

        <Navbar />
        <div className="container">
        <Routes>
            <Route path="/" element={<MovieManager />} />
            <Route path="/add-movie" element={<AddMovie />} />
       


        </Routes>
        </div>

        </>
    )
}

ReactDOM.render( 
<HashRouter>
    <App />
</HashRouter> , 
document.getElementById("app"));
