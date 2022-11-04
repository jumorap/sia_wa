import React, { useState, useContext } from "react";
import AppBar from '@mui/material/AppBar';
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

import { UserContext } from "../../Routes";
import styles from "./styles";
import escudo from "../../Assets/Images/escudo.png";


const Header = () => {
    const [open, setOpen] = useState(false);
    const [isUser] = useContext(UserContext);

    const Menu = (props) => {
        if (isUser) {
            return <props.Icon
                className={"burgerMenu"}
                style={styles.burgerMenu}
                onClick={() => setOpen(!open)}/>
        }
        return null;
    }

    const LinkInHeader = (props) => {
        if (isUser || props.showAlways) {
            return <Link
                className={props.className}
                onClick={() => setOpen(false)}
                to={props.to}>
                {props.children}
            </Link>
        }
        return null;
    }

    return (
        <AppBar position="sticky" sx={styles.bar}>
            <center>
                <Box sx={!open ? styles.contentBar : styles.contentBarResponsive}>
                    {/* Burger menu */}
                    {!open ? <Menu Icon={GiHamburgerMenu} /> : <Menu Icon={AiOutlineClose} /> }

                    <LinkInHeader to={"/info_personal"}>PERSONAL</LinkInHeader>
                    <LinkInHeader to={"/horario"}>HORARIO</LinkInHeader>
                    <LinkInHeader to={"/info_academica"}>ACADÉMICO</LinkInHeader>
                    <LinkInHeader to={"/"} showAlways={true} className={"logoType"}><img src={escudo} alt="Logo" style={styles.logo} /></LinkInHeader>
                    <LinkInHeader to={"/inscripciones"}>INSCRIPCIONES</LinkInHeader>
                    <LinkInHeader to={"/buscador_cursos"}>CURSOS</LinkInHeader>
                    <LinkInHeader to={"/mis_calificaciones"}>NOTAS</LinkInHeader>
                </Box>
            </center>
        </AppBar>
    )
}

export default Header
