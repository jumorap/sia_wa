import { getUser, updateUser } from "./InfoPersonal/get-api";
import { updateUserQuery } from "./InfoPersonal/queries";
import {
  getCursosByAsignaturas,
  inscribirCurso,
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosInscritos,
} from "./Inscripcion/get-api";
import { getHistoriaAcademica } from "./InfoAcademica/get-api";

export {
  getUser,
  updateUser,
  updateUserQuery,
  getCursosByAsignaturas,
  inscribirCurso,
  getMateriasByPrograma,
  getMateriasLibreEleccion,
  getCursosInscritos,
  getHistoriaAcademica,
};
