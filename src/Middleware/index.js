import { getUser, updateUser } from "./InfoPersonal/get-api";
import { updateUserQuery } from "./InfoPersonal/queries";
import {
  getCursosByPrograma,
  inscribirCurso,
  getCursoInscrito,
  getMateriasByPrograma,
  getMateriasLibreEleccion,
} from "./Inscripcion/get-api";
import { getHistoriaAcademica } from "./InfoAcademica/get-api";


export {
  getUser,
  updateUser,
  updateUserQuery,
  getCursosByPrograma,
  inscribirCurso,
  getCursoInscrito,
  getMateriasByPrograma,
  getMateriasLibreEleccion,

  getHistoriaAcademica,
};
