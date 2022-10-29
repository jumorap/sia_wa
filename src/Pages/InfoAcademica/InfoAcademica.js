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
  nombre: "Parcial 1",
  nota: "2.5",
  porcentaje: "100"
  }
]


const calificaciones02 = [
  {
  nombre: "Parcial 1",
  nota: "4.2",
  porcentaje: "30"
  },
  {
    nombre: "Parcial 2",
    nota: "5.0",
    porcentaje: "80"
    }
]

const asignaturas = [
  {
    codigo: "01",
    nombre: "Calculo Diferencial",
    creditos: "4",
    tipo: "Fundamentación Obligatoria",
    periodo: "2022-2",
    esConsolidada: "true",
    calificaciones: calificaciones01,
    definitiva: "4.5",
    esAprobada: true
  },
  {
    codigo: "02",
    nombre: "Ingeniería Económica",
    creditos: "3",
    tipo: "Fundamentación Optativa",
    periodo: "2022-1",
    esConsolidada: "true",
    calificaciones: calificaciones02,
    definitiva: "4.8",
    esAprobada: true
  },
  {
    codigo: "03",
    nombre: "Matematicas Discretas",
    creditos: "3",
    tipo: "Fundamentación Obligatoria",
    periodo: "2021-2",
    esConsolidada: "true",
    calificaciones: calificaciones02,
    definitiva: "2.7",
    esAprobada: false
  }
]

  const historiaAcademica = {
    documento_identidad: "4792004165",
    id_historia: "01",
    id_programa: "05",
    porcentaje_avance: "75",
    papa: "4.1",
    pa: "4.5",
    semestreActual: "2022-2",
    pappi: "3.5",
    asignaturas: asignaturas
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
                <Typography sx={{fontWeight: "bold"}}> {asignatura.nombre + "  (" + asignatura.codigo + ")  "}</Typography>
                <Typography >{"Creditos: " + asignatura.creditos}</Typography>
                <Typography >{"Tipo: " + asignatura.tipo}</Typography>
                <Typography >{"Periodo cursado: " + asignatura.periodo}</Typography>

            </Container>
            <Container sx={[styles.card_right]}>
                <Typography sx={{fontWeight: "bold"}}>{asignatura.definitiva}</Typography>
                <Typography >{asignatura.esAprobada ? "Aprobada" : "Reprobada"}</Typography>
              

            </Container>
          </CardContent>
        </Card>
    
  );
}


const InfoAcademica = () => {

  
const [data, setData] = useState(null)
useEffect(() => {
  // Make a single request to the API
  if (!data) getHistoriaAcademica().then((response) => setData(response.user))
}, [data])

  console.log(data)

  let historiaAcademica = getData()

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
                  <Typography sx={{fontWeight: "bold"}}>{historiaAcademica.pa}</Typography>
                  <Typography sx={{}}>{" PA "}</Typography>
              </Container>
            
            
              <Container sx={[styles.infoBasica_right_card]}>
                <Typography sx={{fontWeight: "bold"}}>{historiaAcademica.papa}</Typography>
                <Typography sx={{}}>{"PAPA"}</Typography>
              </Container>
              

              
              <Container sx={[styles.infoBasica_right_card]}>
                <Typography sx={{fontWeight: "bold"}}>{historiaAcademica.pappi}</Typography>
                <Typography sx={{}}>{"PAPPI"}</Typography>
              </Container>
          </Container>
          </Paper>
      </Container>
    </Paper>
      <Divider sx={{marginBottom: "40px"}}/>


      

      <Typography sx={{fontWeight: "bold", marginBottom: "20px"}}>Asignaturas</Typography>
    
    <List sx={[styles.list]}>
    {historiaAcademica.asignaturas.map((asignatura) => {
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



