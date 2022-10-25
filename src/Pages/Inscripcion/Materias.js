import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Backdrop,
  Button,
  DialogContentText,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  Modal,
} from "@mui/material";

import { FaBookOpen } from "react-icons/fa";

import {
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosByAsignaturas,
} from "../../Middleware";
import styles from "./styles";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { titleCard, subtitleCard } from "./Inscripciones";
import { Box } from "@mui/system";

let cursosGlobal = [];

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiasLibreEleccion, setMateriasLibreEleccion] = useState([]);
  let [cursos, setCursos] = useState(null);
  const [open, setOpen] = useState(false);

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const getMateriasYCursos = async () => {
      let materias = await getMateriasByPrograma(["5"]);
      materias = materias?.asignaturasInscribibles;
      console.log("Materias Effect", materias);
      const cursos = await getCursosByAsignaturas(materias);
      console.log("Cursos Effect", cursos);
      return { materias, cursos };
    };
    getMateriasYCursos().then((data) => {
      setMaterias(data.materias);
      setCursos(data.cursos);
    });
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let creditosAInscribir = calcularCreditos(
    materias
      ? materias?.filter((materia) => {
          return materiasAInscribir.includes(materia.codigo_asignatura);
        })
      : []
  );
  console.log("creditos", creditosAInscribir);

  console.log("Cursos hook", cursos);
  console.log("Materias hook", materias);

  /*
  Tarjeta que muestra toda la materia con sus cursos
  */
  const materiaCard = (materia) => {
    const isInscrita = materiasAInscribir.includes(materia.codigo_asignatura);
    return (
      <Grid key={materia.codigo_asignatura} item md={12}>
        <Accordion
          key={materia.codigo_asignatura}
          sx={[styles.cards, { width: "100%" }]}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={!isInscrita ? { color: "gray" } : { color: "white" }}
              />
            }
            aria-controls="panel1bh-content"
            sx={isInscrita ? styles.materiaInscrita : {}}
          >
            <Typography
              variant="body1"
              sx={{ width: "80%", fontWeight: "bold" }}
            >
              {materia.codigo_asignatura} - {materia.nombre_asignatura}
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "10%", "font-style": "italic" }}
            >
              {isInscrita ? "Añadida" : ""}
            </Typography>
            <Typography
              variant="body1"
              sx={
                isInscrita
                  ? styles.creditosInscritos
                  : styles.creditosDisponibles
              }
            >
              {materia.creditos} créditos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Grid container>
                {cursos?.map((curso) => {
                  console.log("curso desde card", curso);
                  console.log("materia desde card", materia.codigo_asignatura);
                  if (curso.codigo_asignatura === materia.codigo_asignatura) {
                    return cursoCard(curso, setCursos);
                  }
                  return null;
                })}
              </Grid>
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  };

  return (
    <Grid item xs={12} sx={{ padding: "20px" }}>
      <Card sx={[styles.cards, { width: "100%" }]}>
        <CardContent>
          <div>
            <div>{titleCard(FaBookOpen, "Materias Disponibles")}</div>
            <Button onClick={forceUpdate}>Refrescar</Button>
            <br />
            <div sx={{ textAlign: "right" }}>
              <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                Créditos totales seleccionados: {creditosAInscribir}
              </Typography>
            </div>
          </div>
          <br />

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
        <Button
          variant="contained"
          sx={styles.buttonInscribir}
          onClick={handleOpen}
          disabled={creditosAInscribir === 0}
        >
          Inscribir {creditosAInscribir} créditos
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={styles.modal}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ color: "black" }}
              >
                Inscripción de materias
              </Typography>
              <Divider />
              <Typography
                id="transition-modal-description"
                sx={{ color: "black", mt: 2 }}
              >
                ¿Está seguro que desea inscribir las materias seleccionadas?
              </Typography>
              <div sx={{ position: "absolute", left: "50%", top: "50%" }}>
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={{ backgroundColor: "var(--blueSeoul)", mt: 2, mr: 1 }}
                >
                  aceptar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                  sx={{
                    backgroundColor: "#76232F",
                    mt: 2,
                    mr: 1,
                  }}
                >
                  cancelar
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </Card>
    </Grid>
  );
};

//----------------------------Funciones para setear estados iniciales----------------------------//

/**
 * Funciones para obtener las materias y cursos y guardarlos en el estado
 */
const getMaterias = async (setMaterias, setMateriasLibreEleccion) => {
  const materias = await getMateriasByPrograma("5");
  const materiasLibreEleccion = await getMateriasLibreEleccion();
  setMaterias(materias);
  setMateriasLibreEleccion(materiasLibreEleccion);
};

// const getCursos = async (materias) => {
//   console.log("Materias", materias);
//   const cursos2 = [
//     {
//       id_curso: "1",
//       codigo_asignatura: 1,
//       grupo: 1,
//       horarios: [
//         {
//           dia: 1,
//           hora_inicio: 8,
//           hora_fin: 10,
//           salon: "Salón 401-204 - Facultad de Ingeniería",
//           documento_profesor: "123456789",
//           tipo: "Clase teórica",
//         },
//         {
//           dia: 3,
//           hora_inicio: 8,
//           hora_fin: 10,
//           salon: "Salón 401-204 - Facultad de Ingeniería",
//           documento_profesor: "123456789",
//           tipo: "Clase teórica",
//         },
//       ],
//       cupos_disponibles: 10,
//       cupos_totales: 20,
//     },

//     {
//       id_curso: "2",
//       codigo_asignatura: 1,
//       grupo: 2,
//       horarios: [
//         {
//           dia: 3,
//           hora_inicio: 15,
//           hora_fin: 17,
//           salon: "Salón 404-404 - Facultad de Arquitectura",
//           documento_profesor: "123456789",
//           tipo: "Clase teórica",
//         },
//         {
//           dia: 5,
//           hora_inicio: 15,
//           hora_fin: 17,
//           salon: "Salón 404-404 - Facultad de Arquitectura",
//           documento_profesor: "123456789",
//           tipo: "Laboratorio",
//         },
//       ],
//       cupos_disponibles: 10,
//       cupos_totales: 20,
//     },
//   ];

//   let cursos = [];
//   const fillCursos = async () => {
//     materias.map(async (materia) => {
//       console.log("Materia", materia);
//       const tempcursos = await getCursosByAsignatura(materia.codigo_asignatura);
//       console.log("TempCursos", tempcursos);
//       tempcursos.cursosByCodigoAsignatura.forEach((curso) => {
//         cursos.push({ ...curso });
//       });
//     });
//   };
//   await fillCursos();
//   console.log("Cursos eeend", cursos);
//   return cursos;
// };

//------------------------------Elementos para mostrar cursos----------------------------------//
/**
 * Función que retorna la tarjeta con la información del curso
 * @param {*} curso curso a mostrar
 * @param {*} setCursos función para setear el estado de cursos
 * @returns {JSX} tarjeta con la información del curso
 */

const cursoCard = (curso, setCursos) => {
  console.log("Curso desde cursoCard", curso);
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
      <Button
        disabled={
          curso.cupos_disponibles === 0 ||
          curso.cupos_disponibles === null ||
          curso.cupos_disponibles === undefined ||
          (!curso.inscrito &&
            materiasAInscribir.includes(curso.codigo_asignatura))
        }
        variant="contained"
        color={curso.inscrito ? "error" : "primary"}
        sx={curso.inscrito ? styles.buttonEliminar : styles.buttonInscribir}
        onClick={() => {
          if (curso.inscrito) {
            removeCursoDeCola(curso, setCursos);
          } else {
            addCursoACola(curso, setCursos);
          }
        }}
      >
        {!curso.inscrito ? "Añadir" : "Eliminar"}
      </Button>
    </Grid>
  );
};
const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

/**
 * Función que retorna la tarjeta con la información de los horarios de los cursos
 * @param {*} horarios horarios a mostrar
 * @returns {JSX} tarjeta con la información del horario
 **/
const horarioCard = (horario) => {
  return (
    <Card sx={[styles.cards, { width: "100%" }]}>
      <CardContent>
        <Typography variant="body1">Horario</Typography>
        <div>
          {horario.map((dia) => {
            return (
              <div key={dia.dia + dia.salon}>
                <div>{dia.tipo}</div>
                <div>
                  <Typography variant="body2" sx={{ color: "var(--softGray)" }}>
                    {dias[dia.dia - 1]}: {dia.hora_inicio}:00 - {dia.hora_fin}
                    :00, Lugar: {dia.salon}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

let colaDeCursos = [];
let materiasAInscribir = [];

/**
 * Función que añade un curso y su materia a la cola de inscripción
 * @param {*} curso
 */
const addCursoACola = (curso, setCursos) => {
  //si el curso no está en la cola
  if (!colaDeCursos.includes(curso.id_curso)) {
    colaDeCursos.push(curso.id_curso);
  }
  //lo mismo con materias
  if (!materiasAInscribir.includes(curso.codigo_asignatura)) {
    materiasAInscribir.push(curso.codigo_asignatura);
  }

  setCursos((cursos) => {
    return cursos.map((curso) => {
      if (colaDeCursos.includes(curso.id_curso)) {
        return { ...curso, inscrito: true };
      }
      return curso;
    });
  });
};

/**
 * Función que elimina un curso y su materia de la cola de inscripción
 * @param {*} curso curso a eliminar
 * @param {*} setCursos función para setear el estado de cursos
 * @returns
 * */
const removeCursoDeCola = (curso, setCursos) => {
  let prevCurso = { ...curso };

  setCursos((cursos) => {
    return cursos.map((curso) => {
      if (
        colaDeCursos.includes(curso.id_curso) &&
        curso.id_curso === prevCurso.id_curso
      ) {
        prevCurso["inscrito"] = false;
        console.log("PreVcurso", prevCurso);
        return { ...prevCurso };
      }
      return curso;
    });
  });
  colaDeCursos = colaDeCursos.filter((id) => id !== curso.id_curso);
  console.log("Cola", colaDeCursos);
  materiasAInscribir = materiasAInscribir.filter(
    (id) => id !== curso.codigo_asignatura
  );
};

const calcularCreditos = (materias) => {
  let creditos = 0;
  materias.forEach((materia) => {
    creditos += materia.creditos;
  });
  return creditos;
};
