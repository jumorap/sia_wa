import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import useStackChips from "./StackChips";

function getOptionLabelCourse(option) { return option.nombre_asignatura }

export default function BuscadorCursos() {
  const initalValue = {
    nombre_asignatura: "",
    codigo_asignatura: "",
  };

  const [selectedCourse, setSelectedCourse] = useState(initalValue);

  const recentlyAdded = useStackChips(getOptionLabelCourse)

  return (
    <div>
      <Autocomplete
        freeSolo
        value={selectedCourse}
        onChange={(e, newValue) => {
          console.log(newValue)
          recentlyAdded.add(newValue)
          setSelectedCourse(newValue);
        }}
        id="free-solo-2-demo"
        disableClearable
        options={asignaturas}
        getOptionLabel = {getOptionLabelCourse}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscador de cursos"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      {selectedCourse.nombre_asignatura}
      {recentlyAdded.component}
      
    </div>
  );
}

const asignaturas = [
  {
    nombre_asignatura: "matematicas",
    codigo_asignatura: "101",
  },
  {
    nombre_asignatura: "matematicas II",
    codigo_asignatura: "102",
  },
  {
    nombre_asignatura: "Calculo",
    codigo_asignatura: "103",
  },
  {
    nombre_asignatura: "Calculo integral",
    codigo_asignatura: "104",
  },
];
