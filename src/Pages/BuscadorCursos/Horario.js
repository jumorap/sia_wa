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

export default function Horario({ horario, key  }) {

  if (!horario) {
    return null;
  }


  const nombre_profesor = horario.profesor?.nombre_completo;

  return (
    <div key = {key}>
      <Box>
        {mapNumberToDay(horario.dia)} {horario.hora_inicio} - {horario.hora_fin}
      </Box>
      {
        nombre_profesor ? (
          <Box>
            Profesor: {nombre_profesor}
          </Box>
        ) : null
      }
      <Divider light />
    </div>
  );
}
