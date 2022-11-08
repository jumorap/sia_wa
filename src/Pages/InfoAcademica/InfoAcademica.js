import React, {useState, useEffect, useRef} from "react";
import { Card, CardContent, List, ListItem, Box, Typography, TextField, Button, Paper, Container, Divider } from '@mui/material';
import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';

import styles from "./styles";

import { getHistoriaAcademica } from "../../Middleware";

// simple request to API


const globalPrograma = "Ingeniería de Sistemas y Computación"
const globalFacultad = "Ingeniería"

const getData = () => {

const calificaciones01 = [
  {
  _nombre: "Parcial 1",
  _nota: "2.5",
  _porcentaje: "100"
  }
]


const calificaciones02 = [
  {
  _nombre: "Parcial 1",
  _nota: "4.2",
  _porcentaje: "30"
  },
  {
    _nombre: "Parcial 2",
    _nota: "5.0",
    _porcentaje: "80"
    }
]

const asignaturas = [
  {
    _codigo: "01",
    _nombre: "Calculo Diferencial",
    _creditos: "4",
    _tipo: "Fundamentación Obligatoria",
    _periodo: "2022-2",
    _esConsolidada: "true",
    _calificaciones: calificaciones01,
    _definitiva: "4.5",
    _esAprobada: true
  },
  {
    _codigo: "02",
    _nombre: "Ingeniería Económica",
    _creditos: "3",
    _tipo: "Fundamentación Optativa",
    _periodo: "2022-1",
    _esConsolidada: "true",
    _calificaciones: calificaciones02,
    _definitiva: "4.8",
    _esAprobada: true
  },
  {
    _codigo: "03",
    _nombre: "Matematicas Discretas",
    _creditos: "3",
    _tipo: "Fundamentación Obligatoria",
    _periodo: "2021-2",
    _esConsolidada: "true",
    _calificaciones: calificaciones02,
    _definitiva: "2.7",
    _esAprobada: false
  }
]

  const historiaAcademica = {
    _documento_identidad: "4792004165",
    _id_historia: "01",
    _id_programa: "05",
    _porcentaje_avance: "75",
    _papa: "4.1",
    _pa: "4.5",
    _semestreActual: "2022-2",
    _pappi: "3.5",
    _asignaturas: asignaturas
  }

  return historiaAcademica;
};


const formatData = (data) => {
  return JSON.parse(data);
}



const cards = (asignatura) => {
  // let fgrades = formatData(grades);
  // let names = Object.keys(fgrades);

  return (
    
        <Card sx={[styles.card]}>
          <CardContent sx={[styles.CardContent]}>
            <Container sx={[styles.card_left]}>
                <Typography sx={{fontWeight: "bold"}}> {asignatura._nombre + "  (" + asignatura._codigo + ")  "}</Typography>
                <Typography >{"Creditos: " + asignatura._creditos}</Typography>
                <Typography >{"Tipo: " + asignatura._tipo}</Typography>
                <Typography >{"Periodo cursado: " + asignatura._periodo}</Typography>

            </Container>
            <Container sx={[styles.card_right]}>
                <Typography sx={{fontWeight: "bold"}}>{asignatura._definitiva}</Typography>
                <Typography >{asignatura._esAprobada ? "Aprobada" : "Reprobada"}</Typography>
              

            </Container>
          </CardContent>
        </Card>
    
  );
}


const InfoAcademica = () => {

  
const [data, setData] = useState(null)
useEffect(() => {
  // Make a single request to the API
  if (!data) getHistoriaAcademica().then((response) => setData(response))
}, [data])

  console.log(data)

  //console.log(data.history)

  let historiaAcademica = getData()

  if(data){
    historiaAcademica = data
  }

    return (
    <>
    <Typography sx={{fontWeight: "bold"}}>Historia Academica</Typography>

    <Paper elevation={2}>
      <Container sx={[styles.infoBasica]}>
          <Container sx={[styles.infoBasica_left]}>
              <Typography sx={{}}>{"Programa: " + globalPrograma}</Typography>
              <Typography sx={{}}>{"Facultad: " + globalFacultad}</Typography>
              
          </Container>

          <Paper elevation={1}>
          <Container sx={[styles.infoBasica_right]}>
              <Container sx={[styles.infoBasica_right_card]}>
                  <Typography sx={{fontWeight: "bold"}}>{historiaAcademica._pa}</Typography>
                  <Typography sx={{}}>{" PA "}</Typography>
              </Container>
            
            
              <Container sx={[styles.infoBasica_right_card]}>
                <Typography sx={{fontWeight: "bold"}}>{historiaAcademica._papa}</Typography>
                <Typography sx={{}}>{"PAPA"}</Typography>
              </Container>
              

              
              <Container sx={[styles.infoBasica_right_card]}>
                <Typography sx={{fontWeight: "bold"}}>{historiaAcademica._pappi}</Typography>
                <Typography sx={{}}>{"PAPPI"}</Typography>
              </Container>
          </Container>
          </Paper>
      </Container>
    </Paper>
      <Divider sx={{marginBottom: "40px"}}/>


      

      <Typography sx={{fontWeight: "bold", marginBottom: "20px"}}>Asignaturas</Typography>
    
    <List sx={[styles.list]}>
    {historiaAcademica._asignaturas.map((asignatura) => {
        return (
          <>
              <List component="div" justify="center" width="100%">
                <ListItem className="pl-2" sx={{overflow: 'auto', width: "800"}}>
                  {cards(asignatura)}
                </ListItem>
              </List>
            
          </>
        );
      })}
    </List>
    </>
    )
}

export default InfoAcademica



