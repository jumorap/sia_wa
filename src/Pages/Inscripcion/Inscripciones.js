import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { FaBook, FaBookOpen } from "react-icons/fa";

import {
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosByMateria,
} from "../../Middleware";
import styles from "./styles";

/**
 * Generate a title card with an icon
 * @param IconTitle Icon to show in the title
 * @param title Title to show in the card
 * @returns {JSX.Element}
 */
const titleCard = (IconTitle, title) => {
  return (
    <Card sx={[styles.cards, { width: "100%" }]}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          <IconTitle style={{ fontSize: "20px", color: "var(--softGray)" }} />
          &nbsp; {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Generate a subtitle card
 * @param subtitle Subtitle to show in the card
 * @returns {JSX.Element}
 */
const subtitleCard = (subtitle) => {
  return (
    <Card sx={[styles.cards, { width: "100%" }]}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

/**
 * Generate a card with a title and a value to show in the page
 * @param title Type of information to show
 * @param data Data to show in the card
 * @returns {JSX.Element} Card with the title and data
 */
const cardGenerator = (title, data) => {
  return (
    <Card sx={[styles.cards, { width: "50%" }]}>
      <CardContent>
        <Typography variant="body1" sx={{ color: "var(--softGray)" }}>
          {title}
        </Typography>
        <Typography variant="body2">{!data ? "NO APLICA" : data}</Typography>
      </CardContent>
    </Card>
  );
};

const materiaCard = (materia) => {
  const cursos = getCursos(materia.codigo_asignatura);

  return (
    <Card
      key={materia.codigo_asignatura}
      sx={[styles.cards, { width: "100%" }]}
    >
      <CardContent>
        <Typography variant="body1">
          {materia.codigo_asignatura} - {materia.nombre_asignatura}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--softGray)" }}>
          {materia.creditos} créditos
        </Typography>
        <Cursos materia={materia} />
      </CardContent>
    </Card>
  );
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const horarioCard = (horario) => {
  return (
    <Card sx={[styles.cards, { width: "100%" }]}>
      <CardContent>
        <Typography variant="body1">Horario</Typography>
        <Typography variant="body2" sx={{ color: "var(--softGray)" }}>
          {horario.map((dia) => {
            return (
              <>
                <div>
                  {dias[dia.dia - 1]}: {dia.hora_inicio}:00 - {dia.hora_fin}
                  :00
                </div>
                <div>Salón: {dia.salon}</div>
              </>
            );
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};

const cursoCard = (curso) => {
  return (
    <Card key={curso.id_curso} sx={[styles.cards, { width: "100%" }]}>
      <CardContent>
        <Typography variant="body3">
          Grupo: {curso.grupo}
          <br />
          cupos disponibles: {curso.cupos_disponibles}/{curso.cupos_totales}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--softGray)" }}>
          {horarioCard(curso.horarios)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const getMaterias = async (setMaterias, setMateriasLibreEleccion) => {
  const materias = await getMateriasByPrograma("5");
  const materiasLibreEleccion = await getMateriasLibreEleccion();
  setMaterias(materias);
  setMateriasLibreEleccion(materiasLibreEleccion);
};

const getCursos = async (codigo_asignatura) => {
  const cursos = await getCursosByMateria(codigo_asignatura);
  console.log(cursos);
  return cursos;
};

const Cursos = (materia) => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    getCursos(materia.codigo_asignatura).then((cursos) => setCursos(cursos));
  }, [materia.codigo_asignatura]);

  return (
    <div>
      {cursos.map((curso) => {
        return cursoCard(curso);
      })}
    </div>
  );
};

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiasLibreEleccion, setMateriasLibreEleccion] = useState([]);

  useEffect(() => {
    getMaterias(setMaterias, setMateriasLibreEleccion);
  }, []);

  return (
    <div>
      {titleCard(FaBookOpen, "Materias Disponibles")}
      {subtitleCard("Materias obligatorias")}
      {materias.map((materia) => materiaCard(materia))}
      {subtitleCard("Materias de libre elección")}
      {materiasLibreEleccion.map((materia) => materiaCard(materia))}
    </div>
  );
};

/**
 * Page to show the personal information of the user
 * @returns {JSX.Element}
 */
const Inscripciones = () => {
  return (
    <>
      <div style={styles.container}>{titleCard(FaBook, "Inscripciones")}</div>
      <div style={styles.container}>
        <div style={styles.cardsContainer}>
          <Materias />
        </div>
      </div>
    </>
  );
};

export default Inscripciones;
