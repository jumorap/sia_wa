import apiUrl from "../api-url";
import queryAsset from "../queryAsset";
import queries from "./queries";

export const getCursosByMateria = async (codigo_asignatura) => {
  // return queryAsset(queries.curso, apiUrl.Inscripciones.get);

  return [
    {
      id_curso: "1",
      codigo_asignatura: 1,
      grupo: 1,
      horarios: [
        {
          dia: 1,
          hora_inicio: 8,
          hora_fin: 10,
          salon: "A-101",
          documento_profesor: "123456789",
          tipo: "Clase teórica",
        },
        {
          dia: 3,
          hora_inicio: 8,
          hora_fin: 10,
          salon: "A-101",
          documento_profesor: "123456789",
          tipo: "Clase teórica",
        },
      ],
      cupos_disponibles: 10,
      cupos_totales: 20,
    },

    {
      id_curso: "2",
      codigo_asignatura: 1,
      grupo: 2,
      horarios: [
        {
          dia: 3,
          hora_inicio: 15,
          hora_fin: 17,
          salon: "A-401",
          documento_profesor: "123456789",
          tipo: "Clase teórica",
        },
        {
          dia: 5,
          hora_inicio: 15,
          hora_fin: 17,
          salon: "A-401",
          documento_profesor: "123456789",
          tipo: "Laboratorio",
        },
      ],
      cupos_disponibles: 10,
      cupos_totales: 20,
    },
  ];
};

export const inscribirCurso = async () => {
  // return queryAsset(queries.inscribir, apiUrl.Inscripciones.get);
};

export const getCursoInscrito = async () => {
  // return queryAsset(queries.cursoInscrito, apiUrl.Inscripciones.get);

  return {
    id_curso: "1",
    codigo_asignatura: 1,
    grupo: 1,
    horarios: [
      {
        dia: 1,
        hora_inicio: 8,
        hora_fin: 10,
        salon: "A-101",
        documento_profesor: "123456789",
        tipo: "teorica",
      },
    ],
    cupos_disponibles: 10,
    cupos_totales: 20,
  };
};

export const getMateriasByPrograma = async (id_programa) => {
  // return queryAsset(queries.materia, apiUrl.Inscripciones.get);
  return [
    {
      codigo_asignatura: 1,
      nombre_asignatura: "Arquitectura de Computadores",
      creditos: 4,
    },
    {
      codigo_asignatura: 2,
      nombre_asignatura: "Arquitectura de Software",
      creditos: 4,
    },
    {
      codigo_asignatura: 3,
      nombre_asignatura:
        "Introducción a la Teoría de la Información y Sistemas de comunicación",
      creditos: 3,
    },
    {
      codigo_asignatura: 4,
      nombre_asignatura: "Programación Orientada a Objetos",
      creditos: 3,
    },
    {
      codigo_asignatura: 5,
      nombre_asignatura: "Ingeniería de Software",
      creditos: 3,
    },
  ];
};

export const getMateriasLibreEleccion = async () => {
  // return queryAsset(queries.materiaLibre, apiUrl.Inscripciones.get);
  return [
    {
      codigo_asignatura: 6,
      nombre_asignatura: "Tecnología Digital",
      creditos: 3,
    },
    {
      codigo_asignatura: 7,
      nombre_asignatura: "Cátedra de la Paz",
      creditos: 3,
    },
  ];
};
