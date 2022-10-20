import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutocompleteInput({value, onChange, options, getOptionLabel, label, style}) {
  return (
    <Autocomplete
      freeSolo
      value={value}
      onChange={onChange}
      id="free-solo-2-demo"
      disableClearable
      options={options}
      getOptionLabel={getOptionLabel}
      sx = {style}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
