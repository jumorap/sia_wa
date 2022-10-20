import React from "react";
import Paper from "@mui/material/Paper";

import { Header } from "../../Layouts";
import styles from "./styles";


const General = () => {
    return (
        <>
            <Paper sx={styles.paperContainer} />
            <Header />
        </>
    )
}

export default General
