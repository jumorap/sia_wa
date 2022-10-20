import React from "react";
import Paper from "@mui/material/Paper";

import styles from "./styles";
import Header from "../../Layouts/Header";


const General = () => {
    return (
        <>
            <Paper sx={styles.paperContainer} />
            <Header />
        </>
    )
}

export default General
