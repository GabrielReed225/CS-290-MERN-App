import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav className="navi">
            <Link to="/" className="home">Home </Link>
            <Link to="/create-exercise">Create An Exercise</Link>
        </nav>
    );
};

export default Navigation;