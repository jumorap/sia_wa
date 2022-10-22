import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Divider, Grid } from "@mui/material";

import { FaBook, FaBookOpen } from "react-icons/fa";

import {
  getMateriasByPrograma,
  getMateriasLibreEleccion,
} from "../../Middleware";
import styles from "./styles";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Materias } from "./Materias";
/**
 * Generate a title card with an icon
 * @param IconTitle Icon to show in the title
 * @param title Title to show in the card
 * @returns {JSX.Element}
 */
export const titleCard = (IconTitle, title) => {
  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "10px" }}>
        <IconTitle style={{ fontSize: "20px", color: "var(--softGray)" }} />
        &nbsp; {title}
      </Typography>
      <Divider />
    </div>
  );
};

/**
 * Generate a subtitle card
 * @param subtitle Subtitle to show in the card
 * @returns {JSX.Element}
 */
export const subtitleCard = (subtitle) => {
  return (
    <Typography variant="h6" sx={{ fontWeight: "bold", padding: "5px" }}>
      {subtitle}
    </Typography>
  );
};

const Inscripciones = () => {
  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <div style={styles.container}>{titleCard(FaBook, "Inscripciones")}</div>
      </Grid>
      <Grid item xs={12}>
        <div style={styles.container}>
          <div style={styles.cardsContainer}>
            <Materias />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Inscripciones;
