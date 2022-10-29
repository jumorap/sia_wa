import React from "react";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";

import { FaBook } from "react-icons/fa";

import { Materias } from "./Materias";
import styles from "./styles";
import { TitleCard } from "./components";
import MateriasNew from "./MateriasNew";




const Inscripciones = () => {
  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <div style={styles.container}>{TitleCard(FaBook, "Inscripciones")}</div>
      </Grid>
      <Grid item xs={12}>
        <div style={styles.container}>
          <div style={styles.cardsContainer}>
            <Materias /> 
            <MateriasNew/>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Inscripciones;
