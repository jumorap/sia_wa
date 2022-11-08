import React, { useEffect, useState } from "react";
import { getCursos, getSede } from "../../Middleware";
import AutocompleteInput from "./Autocomplete";


/**
 *
 * @param {function}  setCourse function to handle when the user select an option of the search bar
 * @returns
 */
export default function Buscador({
  onChange,
  styles,
  disabled,
  getOptions,
  label,
  getOptionLabel,
  initalValue
}) {
  //state to get the course selected by the user in the search bar
  const [selectedCourse, setSelectedCourse] = useState(initalValue);

  //state for the curses of the search bar
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    //get the inital courses to show in the search bar
    async function getSearchCursos() {
      getOptions().then((response) => {
        console.log("label", response);
        setCourses(response);
      });
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
      styles={styles}
      options={courses}
      getOptionLabel={getOptionLabel}
      label={label}
      disabled={disabled}
      s
    />
  );
}
