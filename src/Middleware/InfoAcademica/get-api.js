import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import {queries} from "./queries"


export const getHistoriaAcademica = async (id_student) => {
    return queryAsset(queries(id_student), apiUrl.InfoAcademica.get)
}