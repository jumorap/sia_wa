import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Backdrop,
  Button,
  Divider,
  Fade,
  Grid,
  Modal,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import { FaBookOpen } from "react-icons/fa";

import {
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosByAsignaturas,
  inscribirCurso,
  getCursosInscritos,
  getMateriasExternas,
} from "../../Middleware";
import styles from "./styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { TitleCard, SubtitleCard } from "./components";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

let user = sessionStorage.getItem("USER");
console.log("user desde materias ", user);
const cursosYaInscritos = [];
const materiasYaInscritas = [];
export const Materias = () => {
  const [materias, setMaterias] = useState(null);
  const [materiasExternas, setMateriasExternas] = useState();
  const [cursos, setCursos] = useState(null);
  const [open, setOpen] = useState(false);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    console.log("materias");
    if (!materias)
      getMateriasByPrograma(["5"]).then((data) => {
        setMaterias(data?.asignaturasInscribibles);
        const newCursos = [];
        data?.asignaturasInscribibles.forEach((materia) => {
          materia.cursos?.forEach((curso) => {
            newCursos.push(curso);
          });
        });
        setCursos(newCursos);
        console.log("materias final", data?.asignaturasInscribibles);
      });
  });

  useEffect(() => {
    console.log("materias externas");
    if (!materiasExternas)
      getMateriasExternas().then((data) => {
        setMateriasExternas(data?.listExtAsignatures);
        console.log("materias externas final", data?.listExtAsignatures);
      });
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("Materias: ", materias);
  console.log("Cursos: ", cursos);

  getCursosYMateriasInscritas(user).then((data) => {
    data.forEach((c) => {
      const { id_curso, codigo_asignatura } = c;

      if (!cursosYaInscritos.includes(id_curso)) {
        cursosYaInscritos.push(id_curso);
        materiasYaInscritas.push(codigo_asignatura);
      }
      console.log("Cursos ya inscritos: ", cursosYaInscritos);
      console.log("Materias ya inscritas: ", materiasYaInscritas);
    });
  });

  let creditosAInscribir = calcularCreditos(
    materias
      ? materias?.filter((materia) => {
          return materiasAInscribir.includes(materia.codigo_asignatura);
        })
      : []
  );

  const mapMaterias = (m) => {
    return m ? m.map((materia) => <MateriaCard mat={materia} />) : null;
  };

  const mapCursos = (c, m) => {
    return c
      ? c.map((curso) => {
          if (curso.codigo_asignatura === m.codigo_asignatura)
            return cursoCard(curso, setCursos);
          return null;
        })
      : null;
  };

  const materiaExternaCard = (materia) => {
    return (
      <Grid key={materia?.code_Subject} item md={3} sx={{ padding: "7px" }}>
        <Card sx={[styles.cards, styles.groupsContainer, { width: "100%" }]}>
          <CardContent>
            <div>
              <Typography variant="body3" fontWeight={"bold"}>
                {materia?.Code_Subject} - {materia?.Name_Subject}
              </Typography>
            </div>
            <div sx={styles.groupsCard}>
              <Typography variant="body3">
                Creditos: {materia?.Credits}
                <br />
                {materia?.Typology}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  /*
  Tarjeta que muestra toda la materia con sus cursos
  */
  const MateriaCard = (props) => {
    const isAñadida = materiasAInscribir.includes(props.mat.codigo_asignatura);
    const isYaInscrita = materiasYaInscritas.includes(
      props.mat.codigo_asignatura
    );
    return (
      <Grid key={props.mat.codigo_asignatura} item md={12}>
        <Accordion
          key={props.mat.codigo_asignatura}
          sx={[styles.cards, { width: "100%" }]}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon
                sx={
                  !isAñadida || isYaInscrita
                    ? { color: "gray" }
                    : { color: "white" }
                }
              />
            }
            aria-controls="panel1bh-content"
            sx={isAñadida || isYaInscrita ? styles.materiaInscrita : {}}
          >
            <Typography
              variant="body1"
              sx={{ width: "80%", fontWeight: "bold" }}
            >
              {props.mat.codigo_asignatura} - {props.mat.nombre_asignatura}
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: "10%", "font-style": "italic" }}
            >
              {isAñadida || isYaInscrita ? "Añadida" : ""}
            </Typography>
            <Typography
              variant="body1"
              sx={
                isAñadida || isYaInscrita
                  ? styles.creditosInscritos
                  : styles.creditosDisponibles
              }
            >
              {props.mat.creditos} créditos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {labelMateriaInscrita(isYaInscrita)}
            <div>
              <Grid container>{mapCursos(cursos, props.mat)}</Grid>
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
            <div>{TitleCard(FaBookOpen, "Materias Disponibles")}</div>

            <div sx={{ textAlign: "right" }}>
              <p />
              <Typography variant="body3" sx={{ fontWeight: "bold" }}>
                Créditos seleccionados: {creditosAInscribir}
              </Typography>
            </div>
          </div>
          <br />

          <div>
            <Accordion sx={styles.acordionPerMateria}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
              >
                <SubtitleCard subtitle={"Materias obligatorias"} />
              </AccordionSummary>
              <AccordionDetails>{mapMaterias(materias)}</AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion sx={styles.acordionPerMateria}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
              >
                <SubtitleCard subtitle={"Materias de oferta externa"} />
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {materiasExternas?.map((materia) => {
                    return materiaExternaCard(materia);
                  })}
                </Grid>
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
                <Link to={"/info_academica"}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleClose();
                      colaDeCursos.forEach((curso) => {
                        user = sessionStorage.getItem("USER");
                        inscribirCurso(curso, user);
                        removeCursoDeCola(curso, setCursos);
                      });
                    }}
                    sx={{ backgroundColor: "var(--blueSeoul)", mt: 2, mr: 1 }}
                  >
                    aceptar
                  </Button>
                </Link>
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

const getCursosYMateriasInscritas = async (documento_estudiante) => {
  const response = await getCursosInscritos(documento_estudiante);
  console.log("Cursos ya inscritos: ", response);
  return response.horarioByDocumentoEstudiante;
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
      <Card sx={[styles.cards, styles.groupsContainer, { width: "100%" }]}>
        <CardContent>
          <Typography variant="body3">
            Grupo: {curso.grupo}
            <br />
            Cupos disponibles: {curso.cupos_disponibles}/{curso.cupos_totales}
          </Typography>
          <div>{horarioCard(curso.horarios)}</div>
        </CardContent>

        <Button
          disabled={
            curso.cupos_disponibles === 0 ||
            curso.cupos_disponibles === null ||
            curso.cupos_disponibles === undefined ||
            materiasYaInscritas.includes(curso.codigo_asignatura) ||
            (!curso.inscrito &&
              materiasAInscribir.includes(curso.codigo_asignatura))
          }
          variant="contained"
          color={curso.inscrito ? "error" : "primary"}
          sx={[
            styles.buttonActionAdd,
            curso.inscrito ? styles.buttonEliminar : styles.buttonInscribir,
          ]}
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
      </Card>
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
    <Card sx={[styles.cards, styles.groupsCard, { width: "100%" }]}>
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

const labelMateriaInscrita = (isInscrita) => {
  return (
    <div>
      <Typography>
        {isInscrita
          ? "La materia ya se encuentra inscrita, por lo cual no puede modificar su selección."
          : "Seleccione el grupo al que desea inscribirse."}
      </Typography>
      <br />
    </div>
  );
};
