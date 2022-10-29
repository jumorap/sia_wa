import React from "react";
import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import styles from "./styles";
import escudo from "../../Assets/Images/escudo.png";
import { display, flexbox } from "@mui/system";


const Header = () => {//Missing to hide elements when session is no active
    return (
        <>
            <AppBar position="sticky" sx={styles.bar}>
                <center>
                    <Box sx={styles.contentBar}>
                        <Link to={"/info_personal"}>INFORMACIÓN PERSONAL</Link>
                        <Link to={"/horario"}>MI HORARIO</Link>
                        <Link to={"/info_academica"}>INFORMACIÓN ACADÉMICA</Link>
                        <Link to={"/"} className={"logoType"}><img src={escudo} alt="Logo" style={styles.logo} /></Link>
                        <Link to={"/inscripciones"}>INSCRIPCIONES</Link>
                        <Link to={"/buscador_cursos"}>BUSCADOR DE CURSOS</Link>
                    </Box>
                </center>
            </AppBar>
        </>
    )
}

export default Header
