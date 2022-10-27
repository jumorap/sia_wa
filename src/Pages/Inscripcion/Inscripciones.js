import React from "react";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";

import { FaBook } from "react-icons/fa";

import { Materias } from "./Materias";
import styles from "./styles";


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
 * @returns {JSX.Element}
 * @param props
 */
export const SubtitleCard = (props) => {
  return (
    <Typography variant="h6" sx={{ fontWeight: "bold", padding: "5px" }}>
      {props.subtitle}
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
