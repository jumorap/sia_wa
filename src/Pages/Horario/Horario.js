import React, {useState, useEffect, useRef} from "react";
import { Card, CardContent, List, ListItem, Box, TableContainer, Table , TableBody , TableHead , TableRow, TableCell, Typography, TextField, Button, Paper, Container, Divider } from '@mui/material';
import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';



import styles from "./styles";



import { getHistoriaAcademica } from "../../Middleware";

// simple request to API
// if (!data) getUser().then((response) => setData(response.user))

const globalPrograma = "Ingeniería de Sistemas y Computación"
const globalFacultad = "Ingeniería"


function createData(hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo) {
    return { hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo };
  }
  
  const rows = [
    // createData('6:00', 61, 62, 63, 64, 65, 66, 77),
    createData('7:00', 71, 72, 73, 74, 75, 76, 77),
    // createData('8:00', 81, 82, 83, 84, 85, 86, 87),
    createData('9:00', 91, 92, 93, 94, 95, 96, 97),
    // createData('10:00', 101, 102, 103, 104, 105, 106, 107),
    createData('11:00', 111, 112, 113, 114, 115, 116, 117),
    // createData('12:00', 121, 122, 123, 124, 125, 126, 127),
    // createData('13:00', 131, 132, 133, 134, 135, 136, 137),
    createData('14:00', 141, 142, 143, 144, 145, 146, 147),
    // createData('15:00', 151, 152, 153, 154, 155, 156, 157),
    createData('16:00', 161, 162, 163, 164, 165, 166, 167),
    // createData('17:00', 171, 172, 173, 174, 175, 176, 177),
    createData('18:00', 181, 182, 183, 184, 185, 186, 187),
    // createData('19:00', 191, 192, 193, 194, 195, 196, 197),
    createData('20:00', 201, 202, 203, 204, 205, 206, 207),
    // createData('21:00', 211, 212, 213, 214, 215, 216, 217),
    createData('22:00', 221, 222, 223, 224, 225, 226, 227),
  ];

 
const getData = () => {

    const Horario1 = [
      {
        dia: "2",
        hora_inicio: "7",
        hora_fin: "11",
        salon: "401-201",
        documento_profesor: "Astaiza Gerardo",
        tipo: "Magistral",
      },
      {
        dia: "4",
        hora_inicio: "7",
        hora_fin: "11",
        salon: "401-201",
        documento_profesor: "Astaiza Gerardo",
        tipo: "Magistral",
      },
    ]

    const Horario2 = [
        {
          dia: "1",
          hora_inicio: "9",
          hora_fin: "13",
          salon: "453-303",
          documento_profesor: "Jorge Triviño",
          tipo: "Practica",
        },
        {
          dia: "3",
          hora_inicio: "9",
          hora_fin: "13",
          salon: "453-303",
          documento_profesor: "Jorge Triviño",
          tipo: "Practica",
        },
      ]

      const Horario3 = [
        {
          dia: "3",
          hora_inicio: "14",
          hora_fin: "16",
          salon: "453-303",
          documento_profesor: "Daenerys Targarien",
          tipo: "Practica",
        },
        {
          dia: "5",
          hora_inicio: "14",
          hora_fin: "16",
          salon: "453-303",
          documento_profesor: "Daenerys Targarien",
          tipo: "Practica",
        },
      ]
    
      const Cursos = [
        { //arquisoft
        id_curso: "Arquitecura de software",
        codigo_asignatura: 123,
        grupo: 2,
        horarios: [Horario1],
        cupos_disponibles: 0,
        cupos_totales: 30,
      },
      { //calculo diferencial
        id_curso: "Calculo Diferencial",
        codigo_asignatura: 456,
        grupo: 3,
        horarios: [Horario2],
        cupos_disponibles: 0,
        cupos_totales: 25,
      },
    //   { //arquitics
    //     id_curso: "Computación visual",
    //     codigo_asignatura: 545,
    //     grupo: 1,
    //     horarios: [Horario3],
    //     cupos_disponibles: 0,
    //     cupos_totales: 25,
    //   },
    ]
    
      return Cursos;
    };


const horarioHandler = (Cursos) => {

    const vistaCursos = []

    var pos_col = "-"
    var pos_row = "-"

    var pos_id = 0

    var salon = "-"
    var profesor = "-"
    var tipo = "-"

    var id_curso = "-"
    var grupo = "-"


    Cursos.map((curso) => {

        id_curso = curso.id_curso
        grupo = curso.grupo
        
        curso.horarios[0].map((horario) => {
            
            pos_col = horario.dia
            pos_row = horario.hora_inicio

            salon = horario.salon
            profesor = horario.documento_profesor
            tipo = horario.tipo
            
            pos_id = pos_row + pos_col

            vistaCursos.push({
                pos_id,
                pos_col,
                pos_row,
                salon,
                profesor,
                tipo,   
                id_curso,
                grupo, 
            })
        })
        
        
    })

    return vistaCursos
}


  
const createCard = (vistaCursos, row, dia) => {

var id_curso  = null
var grupo = null
var salon = null
var profesor = null
var tipo = null

var finded = false
    
    
    vistaCursos.map((vistaCurso) => {
         if ((vistaCurso.pos_id == row.lunes ||
             vistaCurso.pos_id == row.martes ||
             vistaCurso.pos_id == row.miercoles ||
             vistaCurso.pos_id == row.jueves ||
             vistaCurso.pos_id == row.viernes||
             vistaCurso.pos_id == row.sabado ||
             vistaCurso.pos_id == row.domingo) && vistaCurso.pos_col == dia) {
                finded = true
                console.log(vistaCurso.pos_id)


                id_curso = vistaCurso.id_curso
                grupo = vistaCurso.grupo
                salon = vistaCurso.salon
                profesor = vistaCurso.profesor
                tipo = vistaCurso.tipo
                
                
             }
     })

     return (
        <Container sx={[styles.container]}>
            <Typography fontWeight="bold" variant="body2" >{finded && id_curso}</Typography>
            <Typography variant="body2" >{finded && "Grupo: "+ grupo}</Typography>
            <Typography variant="body2" >{finded && "Salon: "+ salon}</Typography>
            <Typography variant="body2" >{finded && "Profesor: " + profesor}</Typography>
            <Typography variant="body2" >{finded && "Clase " + tipo}</Typography>
        </Container>
     )
}

const Horario = () => {

    const vistaCursos = horarioHandler(getData())
    console.log(vistaCursos)

      return (
      <>
    <TableContainer component={Paper}>
      <Table sx={{ }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Hora</TableCell>
            <TableCell align="center">Lunes</TableCell>
            <TableCell align="center">Martes</TableCell>
            <TableCell align="center">Miercoles</TableCell>
            <TableCell align="center">Jueves</TableCell>
            <TableCell align="center">Viernes</TableCell>
            <TableCell align="center">Sabado</TableCell>
            <TableCell align="center">Domingo</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.hora}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.hora}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "1")}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "2")}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "3")}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "4")}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "5")}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "6")}</TableCell>
              <TableCell sx={[styles.dia]} >{createCard(vistaCursos, row, "7")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </>
      )
  }
  
  export default Horario