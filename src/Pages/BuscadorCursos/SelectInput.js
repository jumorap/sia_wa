import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

export default function SelectInput({label, values, handleChange, getOptionValue, getOptionLabel, minWidth = 120}) {
  return (
    <FormControl sx = {{minWidth:minWidth  }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label={label}
          onChange={handleChange}
        >
            {
                values.map((elem, index)=>(
                    <MenuItem value={getOptionValue(elem)} key={index}>{getOptionLabel(elem)}</MenuItem>
                ))
            }
        </Select>
      </FormControl>
  )
}
