import React from "react";
import AppBar from '@mui/material/AppBar';

import styles from "./styles";
import logoMinW from "../../Assets/Images/logoMinW.png";


const Header = () => {
    return (
        <AppBar position="sticky" sx={styles.bar}>
            <center>
                TEST
                <img src={logoMinW} alt="Logo" style={styles.logo} />
                TEST
            </center>
        </AppBar>
    )
}

export default Header
