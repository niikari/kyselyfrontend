import React from "react";
import { Link } from "react-router-dom";

export default function ErrorNotFound() {

    return (
        <>
        <p>Kyselyä ei löytynyt...</p>
        <Link to="/">Palaa takaisin etusivulle</Link>
        </>
    )
}