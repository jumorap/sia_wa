import { Search } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { getFacultades, getSede } from "../../Middleware";
import { getAsignaturasByPrograma, getCursosCompletos, getPorgramasByFacultad } from "../../Middleware/BuscadorCursos/get-api";
import Buscador from "./Buscador";

const styles = {
  container: {
    display: "flex",
  },
  search: {
    flex: 1,
  },
};


const initalValues = {
  sede: {
    nombre_sede: "",
    codigo_sede: "",
  },
  facultad: {
    nombre_facultad: "",
    codigo_facultad: "",
  },
  programa: {
    nombre_programa : "",
    id_programa: "",
  },
}



export default function BuscadorAvanzado({setCursos}) {


  //state used for save the values of "buscador avanzado"
  const [selectedOptions, setSelectedOptions] = useState({
    sede : "",
    facultad : "",
    programa : "",
  });

  //disabled options
  const [disabledOptions, setDisabledOptions] = useState({
    sede : false,
    facultad : true,
    programa : true,
  });

  //state used to search the cursos
  const [search, setSearch] = useState(null);


  function onChangeSede(newValue) {
    setDisabledOptions(prev => ({...prev, facultad: false, programa: true}));
    setSelectedOptions(prev => ({...prev, sede: newValue.id_sede}));
  }

  function onChangeFacultad(newValue){
    setDisabledOptions(prev => ({...prev, programa: false}));
    setSelectedOptions(prev => ({...prev, facultad: newValue.id_facultad}));
  }

  async function onChangePrograma(newValue){
    //setSelectedOptions(prev => ({...prev, programa: newValue.id_programa}));
    setSearch(newValue.id_programa);

  }

  async function onSearch(){
    if (search === null) {
      return;
    }
    
    //get all the cursos
    const data = await getAsignaturasByPrograma(search)
    const cursos = data?.data;

    setCursos(cursos);
  }

  return (
    <Box sx={styles.container}>
      <Buscador
        styles={styles.search}
        disabled={disabledOptions.sede}
        getOptions={getSede}
        label="Sede"
        getOptionLabel={(o) => o.nombre_sede}
        onChange={onChangeSede}
        initalValue={initalValues.sede}
      />
      <Buscador
        styles={styles.search}
        disabled={disabledOptions.facultad}
        getOptions={getFacultades}
        label="Facultades"
        getOptionLabel={(o) => o.nombre_facultad}
        onChange={onChangeFacultad}
        initalValue={initalValues.facultad}
        selectedParentOption = {selectedOptions.sede}
      />
      <Buscador
        styles={styles.search}
        disabled={disabledOptions.programa}
        getOptions={()=> getPorgramasByFacultad(selectedOptions.facultad)}
        label="Programas"
        getOptionLabel={(o) => o.nombre_programa}
        onChange={onChangePrograma}
        initalValue={initalValues.programa}
        selectedParentOption = {selectedOptions.facultad}
      />
      <IconButton aria-label="delete" onClick={onSearch}>
        <Search />
      </IconButton>
    </Box>
  );
}
