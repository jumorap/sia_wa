import { Paper, Typography } from "@mui/material";
import React from "react";

export default function Asignatura({ asignatura }) {

  if (!asignatura) {
    return null;
  }

  return (
    <Paper elevation={2} sx = {{p:1}}>
      <Typography variant="h2" sx = {{fontSize: "1.2rem"}}>
        {asignatura.nombre_asignatura}
      </Typography>
      <Typography variant="h2" sx = {{fontSize: "1rem"}}>
        Codigo asignatura:{asignatura.codigo_asignatura}
      </Typography>
      <Typography variant="h2" sx = {{fontSize: "1rem"}}>
        Creditos: {asignatura.creditos}
      </Typography>
      <Typography variant="h2" sx = {{fontSize: "1rem"}}>
        {asignatura.descripcion}
      </Typography>
      {/* <Typography variant="h2" sx = {{fontSize: "1rem"}}>
        {asignatura.tipo.nombre_tipologia}
      </Typography> */}
    </Paper>
  );
}
