import { Box } from "@mui/material";
import { minWidth } from "@mui/system";
import React, { useState } from "react";
import Asignatura from "./Asignatura";
import AutocompleteInput from "./Autocomplete";
import SelectInput from "./SelectInput";
import useStackChips from "./StackChips";

function getOptionLabelCourse(option) {
  return option.nombre_asignatura;
}
function getOptionLabelSede(option) {
  return option.nombre_sede;
}
function getOptionValueSede(option) {
  return option.id_sede;
}

export default function BuscadorCursos() {
  const initalValueCourse = {
    nombre_asignatura: "",
    codigo_asignatura: "",
  };
  const initalValueSede = {
    nombre_sede: "",
    id_sede: "",
  };

  const [selectedCourse, setSelectedCourse] = useState(initalValueCourse);
  const [selectedSede, setSelectedSede] = useState(initalValueSede);

  const recentlyAdded = useStackChips(getOptionLabelCourse);

  return (
    <Box sx = {{m:1}} display = {"flex"} flexDirection = {"column"} gap = {1}>
      <AutocompleteInput
        value={selectedCourse}
        onChange={(e, newValue) => {
          recentlyAdded.add(newValue);
          setSelectedCourse(newValue);
        }}
        options={asignaturas}
        getOptionLabel={getOptionLabelCourse}
        label={"Buscador de cursos"}
      />
      <Box display={"flex"} justifyContent = {"flex-start"} alignItems = {"center"} gap = {1}>
        <SelectInput
          getOptionLabel={getOptionLabelSede}
          getOptionValue={getOptionValueSede}
          label={"Sedes"}
          values={sedes}
          handleChange={(e, newValue) => {
            setSelectedSede(newValue);
          }}
        />
        <SelectInput
          getOptionLabel={getOptionLabelSede}
          getOptionValue={getOptionValueSede}
          label={"Tipo de grado"}
          values={sedes}
          handleChange={(e, newValue) => {
            setSelectedSede(newValue);
          }}
          minWidth={240}
        />
        <AutocompleteInput
          value={selectedCourse}
          onChange={(e, newValue) => {
            recentlyAdded.add(newValue);
            setSelectedCourse(newValue);
          }}
          style={{ width: 300 }}
          options={asignaturas}
          getOptionLabel={getOptionLabelCourse}
          label={"Facultad"}
        />
        <AutocompleteInput
          value={selectedCourse}
          onChange={(e, newValue) => {
            recentlyAdded.add(newValue);
            setSelectedCourse(newValue);
          }}
          style={{ width: 300 }}
          options={asignaturas}
          getOptionLabel={getOptionLabelCourse}
          label={"Programa"}
        />
      </Box>
      {recentlyAdded.component}
      <Asignatura asignatura={Asignatura1}/>
    </Box>
  );
}

const Asignatura1 = {
  codigo_asignatura: "A001",
    nombre_asignatura: "Ingenieria de software",
    creditos: "3",
    descripcion: "lorem30",
    tipo : {
      id_tipologia: "001",
      nombre_tipologia: "Libre eleccion"
    }
}

const sedes = [
  {
    id_sede: "1",
    nombre_sede: "Bogota",
  },
  {
    id_sede: "2",
    nombre_sede: "Palmira",
  },
  {
    id_sede: "3",
    nombre_sede: "Medellin",
  },
];

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
