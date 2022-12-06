import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import Horario from './Horario'

export default function Curso({curso}) {

  if (!curso) {
    return null;
  }

  const horarios = curso.horarios;

  return (
    <Paper
        sx = {{
            p: 1,
            m: 1,
        }}
        elevetion = {2}
    >
      <Typography variant="h2" sx = {{fontSize: "1rem", fontWeight: "600"}}>
        Grupo {curso.grupo}
      </Typography>
      {
        horarios?.map((horario, idx ) => (
            <Horario horario = {horario} key = {idx}/>
        ))
      }

    </Paper>
  )
}

