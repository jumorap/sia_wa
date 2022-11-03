import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

import styles from "./styles";
import escudo from "../../Assets/Images/escudo.png";

// TODO: Missing to hide elements when session is no active
const Header = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <AppBar position="sticky" sx={styles.bar}>
                <center>
                    <Box sx={!open ? styles.contentBar : styles.contentBarResponsive}>
                        {/* Burger menu */}
                        {!open ?
                            <GiHamburgerMenu
                                className={"burgerMenu"}
                                style={styles.burgerMenu}
                                onClick={() => setOpen(!open)}/>
                            :
                            <AiOutlineClose
                                className={"burgerMenu"}
                                style={styles.burgerMenu}
                                onClick={() => setOpen(!open)}/>
                        }
                        <Link onClick={() => setOpen(false)} to={"/info_personal"}>PERSONAL</Link>
                        <Link onClick={() => setOpen(false)} to={"/horario"}>HORARIO</Link>
                        <Link onClick={() => setOpen(false)} to={"/info_academica"}>ACADÉMICO</Link>
                        <Link onClick={() => setOpen(false)} to={"/"} className={"logoType"}><img src={escudo} alt="Logo" style={styles.logo} /></Link>
                        <Link onClick={() => setOpen(false)} to={"/inscripciones"}>INSCRIPCIONES</Link>
                        <Link onClick={() => setOpen(false)} to={"/buscador_cursos"}>CURSOS</Link>
                        <Link onClick={() => setOpen(false)} to={"/mis_calificaciones"}>NOTAS</Link>
                    </Box>
                </center>
            </AppBar>
        </>
    )
}

export default Header
