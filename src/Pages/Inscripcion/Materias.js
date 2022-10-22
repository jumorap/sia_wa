import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, Divider, Grid } from "@mui/material";

import { FaBook, FaBookOpen } from "react-icons/fa";

import {
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosByPrograma,
} from "../../Middleware";
import styles from "./styles";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { titleCard, subtitleCard } from "./Inscripciones";

export const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiasLibreEleccion, setMateriasLibreEleccion] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      await getMaterias(setMaterias, setMateriasLibreEleccion);
    };
    fetchMaterias();
  }, []);

  //Tarjeta que muestra toda la materia con sus
  const materiaCard = (materia) => {
    return (
      <Grid item md={12}>
        <Accordion
          key={materia.codigo_asignatura}
          sx={[styles.cards, { width: "100%" }]}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
          >
            <Typography variant="body1" sx={{ width: "90%" }}>
              {materia.codigo_asignatura} - {materia.nombre_asignatura}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "var(--softGray)", float: "right" }}
            >
              {materia.creditos} créditos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Cursos materia={materia} />
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

  return (
    <Grid item xs={12} sx={{ padding: "20px" }}>
      <Card sx={[styles.cards, { width: "100%" }]}>
        <CardContent>
          <div>{titleCard(FaBookOpen, "Materias Disponibles")}</div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
              >
                {subtitleCard("Materias obligatorias")}
              </AccordionSummary>
              <AccordionDetails>
                {materias.map((materia) => materiaCard(materia))}
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
              >
                {subtitleCard("Materias de libre elección")}
              </AccordionSummary>
              <AccordionDetails>
                {materiasLibreEleccion.map((materia) => materiaCard(materia))}
              </AccordionDetails>
            </Accordion>
          </div>
        </CardContent>
        <Button variant="contained" sx={styles.buttonInscribir}>
          Inscribir seleccionadas
        </Button>
      </Card>
    </Grid>
  );
};

const getMaterias = async (setMaterias, setMateriasLibreEleccion) => {
  const materias = await getMateriasByPrograma("5");
  const materiasLibreEleccion = await getMateriasLibreEleccion();
  setMaterias(materias);
  setMateriasLibreEleccion(materiasLibreEleccion);
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const horarioCard = (horario) => {
  return (
    <Card sx={[styles.cards, { width: "100%" }]}>
      <CardContent>
        <Typography variant="body1">Horario</Typography>
        <div>
          {horario.map((dia) => {
            return (
              <>
                <div>{dia.tipo}</div>
                <div>
                  <Typography variant="body2" sx={{ color: "var(--softGray)" }}>
                    {dias[dia.dia - 1]}: {dia.hora_inicio}:00 - {dia.hora_fin}
                    :00, Lugar: {dia.salon}
                  </Typography>
                </div>
              </>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

let colaDeCursos = [];
let materiasAInscribir = [];

const addCursoACola = (curso) => {
  console.log(curso);
  //si el curso no está en la cola
  if (!colaDeCursos.includes(curso.id_curso)) {
    colaDeCursos.push(curso.id_curso);
  }
  //lo mismo con materias
  if (!materiasAInscribir.includes(curso.codigo_asignatura)) {
    materiasAInscribir.push(curso.codigo_asignatura);
  }
  console.log(colaDeCursos);
  console.log(materiasAInscribir);
};

const Curso = (curso) => {
  return (
    <Grid key={curso.id_curso} item md={3} xs={12} sx={{ padding: "7px" }}>
      <Card sx={[styles.cards, { width: "100%" }]}>
        <CardContent>
          <Typography variant="body3">
            Grupo: {curso.grupo}
            <br />
            Cupos disponibles: {curso.cupos_disponibles}/{curso.cupos_totales}
          </Typography>
          <div>{horarioCard(curso.horarios)}</div>
        </CardContent>
      </Card>
    </Grid>
  );
};

const getCursos = async (codigo_asignatura) => {
  const cursos = await getCursosByPrograma(codigo_asignatura);
  console.log(cursos);
  return cursos;
};

const Cursos = (materia) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const cursos = await getCursos(materia.codigo_asignatura);
      setCursos(cursos);
    };
    fetchCursos();
  }, [materia.codigo_asignatura]);

  return (
    <div>
      <Grid container>
        {cursos.map((curso) => {
          return Curso(curso);
        })}
      </Grid>
    </div>
  );
};
