import { Box, Button, IconButton } from "@mui/material";
import { minWidth } from "@mui/system";
import React, { useState, useEffect } from "react";
import Asignatura from "./Asignatura";
import AutocompleteInput from "./Autocomplete";
import SelectInput from "./SelectInput";
import useStackChips from "./StackChips";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getCursos, getCurso, getSede, getFacultades } from "../../Middleware";
import SearchBarCourses from "./SearchBarCourses";

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

  //data for the selected asignatura in the search bar
  const [selectedCourseData, setSelectedCourseData] = useState(null);

  const [selectedSede, setSelectedSede] = useState(initalValueSede);

  const recentlyAdded = useStackChips(getOptionLabelCourse, (e)=>{setSelectedCourse(e)});

  const [openAdvancedOptions, setOpenAdvancedOptions] = useState(false);

  useEffect(() => {
    //get the initial SEDES to show in the search bar
    async function getSearchSedes() {
      getSede().then((response) => setSedes(response.sedes));
    }
    //get the initial FACULTADES to show in the search bar
    async function getSearchFacultades() {
      getFacultades().then((response) => console.log(response));
    }

    //getSearchFacultades();
    getSearchSedes();
  }, []);

  //when an user select a course featch its data.
  useEffect(() => {
    async function getDatosSelectedCurso() {
      getCurso(selectedCourse.codigo_asignatura).then((response) => {
        console.log(response);
        setSelectedCourseData(response.asignatura);
      });
    }
    getDatosSelectedCurso();
  }, [selectedCourse]);

  return (
    <Box
      sx={{
        m: 1,
        backgroundColor: "white",
        width: "100%",
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
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={1}
        >
          <SelectInput
            getOptionLabel={getOptionLabelSede}
            getOptionValue={getOptionValueSede}
            label={"Sedes"}
            values={sedes}
            value={selectedSede}
            handleChange={(e) => {
              console.log(e.target.value);
              setSelectedSede(e.target.value);
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
            options={facultades}
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
            options={[]}
            getOptionLabel={getOptionLabelCourse}
            label={"Programa"}
          />
        </Box>
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
    </Box>
  );
}
