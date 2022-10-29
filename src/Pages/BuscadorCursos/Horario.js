import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

//function to map number to day of the week
const mapNumberToDay = (number) => {
  const days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  return days[number];
};

export default function Horario({ horario }) {
  return (
    <div>
      <Box>
        {mapNumberToDay(horario.dia)} {horario.hora_inicio} - {horario.hora_fin}
      </Box>
      <Box>
        Docente: {horario.profesor.nombre_completo}
      </Box>
      <Divider light />
    </div>
  );
}
