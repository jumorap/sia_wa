const dns = ""

const apiUrl = {
  Session: {
    get: `${dns}/session`,
  },
  InfoPersonal: {
    get: `${dns}/info_personal`,
  },
  InfoAcademica: {
    get: `${dns}/fetch_info_academica`,
  },
  Calificaciones: {
    get: `${dns}/fetch_calificaciones`,
  },
  BuscadorCursos: {
    get: `${dns}/fetch_buscador_cursos`,
  },
  Inscripciones: {
    get: `${dns}/fetch_inscripciones`,
  },
  ComponenteExterno: {
    get: `${dns}/ext_component`,
  },
};

export default apiUrl;
