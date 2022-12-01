import { Box, Button, IconButton, Typography } from "@mui/material";
import { minWidth } from "@mui/system";
import React, { useState, useEffect } from "react";
import Asignatura from "./Asignatura";
import AutocompleteInput from "./Autocomplete";
import SelectInput from "./SelectInput";
import useStackChips from "./StackChips";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getCursos, getCurso, getSede, getFacultades } from "../../Middleware";
import SearchBarCourses from "./SearchBarCourses";
import BuscadorAvanzado from "./BuscadorAvanzado";
import { Loading } from "../../Components";

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
  const initalValueSede = {
    nombre_sede: "",
    id_sede: "",
  };

  //state for the Sedes of the search bar
  const [sedes, setSedes] = useState([]);

  //state for the facultades of the search bar
  const [facultades, setFacultades] = useState([]);

  //state to get the course selected by the user in the search bar
  const [selectedCourse, setSelectedCourse] = useState({});

  //loading state when a course is selected
  const [loadingSelectedCourse, setLoadingSelectedCourse] = useState(false);

  //data for the selected asignatura in the search bar
  const [selectedCourseData, setSelectedCourseData] = useState(null);

  //state for the list of curses to show
  const [cursosList, setCursosList] = useState([]);

  const [selectedSede, setSelectedSede] = useState(initalValueSede);

  const recentlyAdded = useStackChips(getOptionLabelCourse, (e) => {
    setSelectedCourse(e);
  });

  const [openAdvancedOptions, setOpenAdvancedOptions] = useState(false);



  useEffect(() => {
    //get the initial SEDES to show in the search bar
    async function getSearchSedes() {
      getSede().then((response) => setSedes(response.sedes))
      .catch((error) => console.log(error));
    }
    //get the initial FACULTADES to show in the search bar
    async function getSearchFacultades() {
      getFacultades().then((response) => console.log(response))
      .catch((error) => console.log(error));
    }

    //getSearchFacultades();
    getSearchSedes();
  }, []);

  //when an user select a course featch its data.
  useEffect(() => {
    async function getDatosSelectedCurso() {
      setLoadingSelectedCourse(true);
      const {data, error} = await getCurso(selectedCourse.codigo_asignatura)
      if (error || !data) {
        console.log(error);
        return;
      }
      setLoadingSelectedCourse(false);
      console.log("here is the asignatura", data.asignatura);
      setCursosList([data?.asignatura])
    }
    getDatosSelectedCurso();
  }, [selectedCourse]);

  return (
    <Box
      sx={{
        m: 1,
        backgroundColor: "white",
        minHeight: "60vh",
        p: 1,
      }}
      display={"flex"}
      flexDirection={"column"}
      gap={1}
    >
      <SearchBarCourses
        onChange={(newValue) => {
          recentlyAdded.add(newValue);
          setSelectedCourse(newValue);
        }}
      />

      {openAdvancedOptions && (
        <>
          <Typography variant="subtitle1" sx={{ fontSize: "0.8rem", color: "gray" }} textAlign = "center">
            Buscador avanzado
          </Typography>
          <BuscadorAvanzado setCursos = {setCursosList} />
        </>
      )}

      <IconButton
        sx={{ width: 7, height: 2 }}
        onClick={() => {
          setOpenAdvancedOptions((prev) => !prev);
        }}
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>
      {recentlyAdded.component}
      <Asignatura asignatura={selectedCourseData} />
      {
        loadingSelectedCourse? <></> : cursosList.map((curso) => (
          <Asignatura asignatura={curso} />
        ))
      }

    </Box>
  );
}
