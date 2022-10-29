import { getUser, updateUser } from "./InfoPersonal/get-api";
import { updateUserQuery } from "./InfoPersonal/queries";
import {
  inscribirCurso,
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosInscritos,
} from "./Inscripcion/get-api";
import { getCursos, getCurso, getSede, getFacultades } from './BuscadorCursos/get-api'
import { getHistoriaAcademica } from "./InfoAcademica/get-api";

export {
  getUser,
  updateUser,
  updateUserQuery,
  inscribirCurso,
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursos,
  getCurso,
  getSede,
  getFacultades,
  getCursosInscritos,
  getHistoriaAcademica,
  // gethorarioByDocumentoEstudiante
};
