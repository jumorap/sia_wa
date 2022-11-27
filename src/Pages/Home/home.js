import React from "react";
import { Typography, Box } from '@mui/material';

import hello from "../../Assets/Images/hello.png";
import styles from "./styles";


/**
 * Page to show the personal information of the user
 * @returns {JSX.Element}
 */
const Home = () => {
    return (
        <>
            {/* Welcome message */}
            <Box sx={styles.welcome}>
                <Typography variant="h4">
                    Portal de Servicios Académicos (SIA)
                </Typography>
            </Box>
            {/* Image */}
            <center>
            <Box sx={styles.boxImage}>
                <img src={hello} alt="hello" style={styles.imgHello} />
            </Box>
            </center>
        </>
    )
}

export default Home;
