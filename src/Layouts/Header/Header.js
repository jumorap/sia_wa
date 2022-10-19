import React from "react";
import AppBar from '@mui/material/AppBar';

import styles from "./styles";
import escudo from "../../Assets/Images/escudo.png";


const Header = () => {
    return (
        <AppBar position="sticky" sx={styles.bar}>
            <center>
                TEST
                <img src={escudo} alt="Logo" style={styles.logo} />
                TEST
            </center>
        </AppBar>
    )
}

export default Header
