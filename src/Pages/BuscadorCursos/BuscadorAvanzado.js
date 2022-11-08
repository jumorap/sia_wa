import { Search, SendAndArchiveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFacultades, getSede } from "../../Middleware";
import { getCursosCompletos, getProgramas } from "../../Middleware/BuscadorCursos/get-api";
import AutocompleteInput from "./Autocomplete";
import Buscador from "./Buscador";

const styles = {
  container: {
    display: "flex",
  },
  search: {
    flex: 1,
  },
};

const initalValueCourse = {
  nombre_sede: "",
  codigo_sede: "",
};

const initalValueFacultad = {
  nombre_facultad: "",
  codigo_facultad: "",
};

const initalValuePrograma = {
  nombre_programa : "",
  id_programa: "",
};




export default function BuscadorAvanzado({setCursos}) {
  const [values, setValues] = useState({
    sede: {
      disabled: false,
      options: [],
    },
    facultad: {
      disabled: false,
      options: [],
    },
    programa: {
      disabled: false,
      options: [],
    },
  });



  function onChangeSede(newValue) {
    console.log(newValue);
  }

  async function onSearch(){
    //get all the cursos
    const cursos = await getCursosCompletos();
    setCursos(cursos);
  }

  return (
    <Box sx={styles.container}>
      <Buscador
        styles={styles.search}
        disabled={values.sede.disabled}
        getOptions={getSede}
        label="Sede"
        getOptionLabel={(o) => o.nombre_sede}
        onChange={onChangeSede}
        initalValue={initalValueCourse}
      />
      <Buscador
        styles={styles.search}
        disabled={values.facultad.disabled}
        getOptions={getFacultades}
        label="Facultades"
        getOptionLabel={(o) => o.nombre_facultad}
        onChange={(newValue) => console.log(newValue)}
        initalValue={initalValueFacultad}
      />
      <Buscador
        styles={styles.search}
        disabled={values.programa.disabled}
        getOptions={getProgramas}
        label="Programas"
        getOptionLabel={(o) => o.nombre_programa}
        onChange={(newValue) => console.log(newValue)}
        initalValue={initalValuePrograma}
      />
      <IconButton aria-label="delete" onClick={onSearch}>
        <Search />
      </IconButton>
    </Box>
  );
}
