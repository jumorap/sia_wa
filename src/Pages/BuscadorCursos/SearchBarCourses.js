import React, { useEffect, useState } from "react";
import { getCursos } from "../../Middleware";
import AutocompleteInput from "./Autocomplete";

const initalValueCourse = {
  nombre_asignatura: "",
  codigo_asignatura: "",
};

function getOptionLabelCourse(option) {
  return option.nombre_asignatura;
}

/**
 *
 * @param {function}  setCourse function to handle when the user select an option of the search bar
 * @returns
 */
export default function SearchBarCourses({ onChange }) {
  //state to get the course selected by the user in the search bar
  const [selectedCourse, setSelectedCourse] = useState(initalValueCourse);

  //state for the curses of the search bar
  const [courses, setCourses] = useState([]);

  //error course state
  const [errorCourse, setErrorCourse] = useState(false);

  useEffect(() => {
    //get the inital courses to show in the search bar
    async function getSearchCursos() {
      const {data, error} = await getCursos()
      if (error || !data) {
        setErrorCourse(true);
        return;
      }
      console.log(data)
      setCourses(data.asignaturas);
    }
    getSearchCursos();
  }, []);
  
  return (
    <AutocompleteInput
      value={selectedCourse}
      onChange={(e, newValue) => {
        setSelectedCourse(newValue);
        onChange(newValue);
      }}
      options={courses}
      getOptionLabel={getOptionLabelCourse}
      label={"Buscador de cursos"}
    />
  );
}
