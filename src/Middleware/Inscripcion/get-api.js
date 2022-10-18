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
          tipo: "teorica",
        },
        {
          dia: 3,
          hora_inicio: 8,
          hora_fin: 10,
          salon: "A-101",
          documento_profesor: "123456789",
          tipo: "teorica",
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
      nombre_asignatura: "Materia 1",
      creditos: 4,
    },
    {
      codigo_asignatura: 2,
      nombre_asignatura: "Materia 2",
      creditos: 4,
    },
    {
      codigo_asignatura: 3,
      nombre_asignatura: "Materia 3",
      creditos: 3,
    },
    {
      codigo_asignatura: 4,
      nombre_asignatura: "Materia 4",
      creditos: 3,
    },
    {
      codigo_asignatura: 5,
      nombre_asignatura: "Materia 5",
      creditos: 3,
    },
  ];
};

export const getMateriasLibreEleccion = async () => {
  // return queryAsset(queries.materiaLibre, apiUrl.Inscripciones.get);
  return [
    {
      codigo_asignatura: 6,
      nombre_asignatura: "Materia 6",
      creditos: 3,
    },
    {
      codigo_asignatura: 7,
      nombre_asignatura: "Materia 7",
      creditos: 3,
    },
  ];
};
