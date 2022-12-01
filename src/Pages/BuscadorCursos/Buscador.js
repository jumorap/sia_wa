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
  //state to get the option selected by the user in the search bar
  const [selectedOption, setSelectedOption] = useState(initalValue);

  //state for the list of options at the search bar
  const [options, setOptions] = useState([]);

  //error course state
  const [error, setError] = useState(false);

  useEffect(() => {
    //get the inital courses to show in the search bar
    async function getOptionsLabels() {
      if (disabled) return; //if the search bar is disabled, don't do anything
      const {data, error} = await getOptions()
      if (error || !data) {
        setError(true);
        return;
      }
      setOptions(data);
    }
    getOptionsLabels();
  }, [disabled]);

  return (
    <AutocompleteInput
      value={selectedOption}
      onChange={(e, newValue) => {
        setSelectedOption(newValue);
        onChange(newValue);
      }}
      styles={styles}
      options={options}
      getOptionLabel={getOptionLabel}
      label={label}
      disabled={disabled}
    />
  );
}
