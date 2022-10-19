import React from "react";
import Paper from "@mui/material/Paper";

import styles from "./styles";
import Header from "../../Layouts/Header";
import Footer from "../../Layouts/Footer";


const General = () => {
    return (
        <>
            <Paper sx={styles.paperContainer} />
            <Header />
            <Footer />
        </>
    )
}

export default General
