import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import useArray from '../../Components/Utils/useArray';

export default function useStackChips(getOptionLabel) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };


  const elementList = useArray(2)

  const Body = (
    <Stack direction="row" spacing={1}>
      {
        elementList.array.map((e,i) => (
          <Chip
            label={getOptionLabel(e)}
            variant="outlined"
            onClick={handleClick}
            onDelete={()=>elementList.pop(i)}
            key = {i}
          />
        ))
      }
    </Stack>
  );

  return {component: Body, add: elementList.push, reset: elementList.reset}
}
