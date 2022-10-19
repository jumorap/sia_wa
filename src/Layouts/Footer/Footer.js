import React from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import styles from "./styles";
import logoMinW from "../../Assets/Images/logoMinW.png";


const Footer = () => {
    return (
        <Paper sx={styles.footerView}>
            <Box sx={styles.footer}>
                <BottomNavigation sx={styles.bottomNav}>
                    <img src={logoMinW} alt="Logo" style={styles.logo} />
                </BottomNavigation>
                <BottomNavigation sx={styles.bottomNav}>
                    <Typography variant="body2">
                        Contacto página web
                        Cra. 1 No. 18-10, Edificio 2, Piso 2, Oficina 201
                        Bogotá, Colombia
                        Teléfono: (57) 1 381 8000
                        Fax: (57) 1 381 8001
                        Correo electrónico:
                        iami@gmail.com
                    </Typography>
                </BottomNavigation>
            </Box>
        </Paper>
    )
}

export default Footer
