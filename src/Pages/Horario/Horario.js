import React, {useEffect, useState} from "react";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import {getHistoriaAcademica, getCursosByCodigoAsignatura} from "../../Middleware";
import styles from "./styles";


function createData(hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo) {
    return { hora, lunes, martes, miercoles, jueves, viernes, sabado, domingo };
  }
  
  const rows = [
    // createData('6:00', 61, 62, 63, 64, 65, 66, 77),
    createData('7:00', 71, 72, 73, 74, 75, 76, 77),
    //createData('8:00', 81, 82, 83, 84, 85, 86, 87),
    createData('9:00', 91, 92, 93, 94, 95, 96, 97),
    //createData('10:00', 101, 102, 103, 104, 105, 106, 107),
    createData('11:00', 111, 112, 113, 114, 115, 116, 117),
    //createData('12:00', 121, 122, 123, 124, 125, 126, 127),
    createData('13:00', 131, 132, 133, 134, 135, 136, 137),
    createData('14:00', 141, 142, 143, 144, 145, 146, 147),
    //createData('15:00', 151, 152, 153, 154, 155, 156, 157),
    createData('16:00', 161, 162, 163, 164, 165, 166, 167),
    //createData('17:00', 171, 172, 173, 174, 175, 176, 177),
    createData('18:00', 181, 182, 183, 184, 185, 186, 187),
   // createData('19:00', 191, 192, 193, 194, 195, 196, 197),
    createData('20:00', 201, 202, 203, 204, 205, 206, 207),
    //createData('21:00', 211, 212, 213, 214, 215, 216, 217),
    createData('22:00', 221, 222, 223, 224, 225, 226, 227),
  ];


const horarioHandlerFetch = (Cursos,Asignaturas) => {

  // cursos array de objetos asignatura

    const vistaCursos = []

    let pos_col = "-"
    let pos_row = "-"

    let pos_id = 0

    let salon = "-"
    let profesor = "-"
    let tipo = "-"

    let id_curso = "-"
    let grupo = "-"

    let i = 0;
    Cursos.map((curso) => {

        id_curso = Asignaturas[i]._nombre
        i++

        grupo = curso.grupo
        
        curso.horarios.map((horario) => {
            
            pos_col = horario.dia
            pos_row = horario.hora_inicio

            salon = horario.salon
            profesor = horario.documento_profesor
            tipo = horario.tipo
            
            
            pos_id = (pos_row*10) + pos_col

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

let id_curso  = null
let grupo = null
let salon = null
let profesor = null
let tipo = null

let finded = false
    //dia col | hora inicio fila
    
    vistaCursos.map((vistaCurso) => {
         if ((vistaCurso.pos_id == row.lunes ||
             vistaCurso.pos_id == row.martes ||
             vistaCurso.pos_id == row.miercoles ||
             vistaCurso.pos_id == row.jueves ||
             vistaCurso.pos_id == row.viernes||
             vistaCurso.pos_id == row.sabado ||
             vistaCurso.pos_id == row.domingo) && vistaCurso.pos_col == dia) {
                finded = true
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


//fetch historia academica
const [data, setData] = useState(null)
useEffect(() => {

  if(!data){
  getHistoriaAcademica(sessionStorage.USER).then((response) => {
    
    setData(response.getHistory[0])
  })
}

}, [data])



//fetch cursos
const [cursos, setCursos] = useState([])
const [asignaturas, setAsignaturas] = useState([])
const [vistaCursos,setVistaCursos] = useState([])

useEffect(() => {
  
    if(data){
     
      data?._asignaturasInscritas.forEach(asignatura => {

      getCursosByCodigoAsignatura(asignatura._id_asignature).then((response) => {
      
      let cursosdeAsignatura_i = response.cursosByCodigoAsignatura
  
      cursosdeAsignatura_i.map(cursito => {
          //buscar id curso
          
          if(cursito.id_curso === asignatura._codigo){
              cursos.push(cursito)
              setCursos(cursos)
              asignaturas.push(asignatura)
              setAsignaturas(asignaturas)
          }
      });

      setVistaCursos(horarioHandlerFetch(cursos,asignaturas))
      console.log("vistacursos: ")
      console.log(vistaCursos)

      })
      }
    )}
  }, [cursos,data,asignaturas])

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