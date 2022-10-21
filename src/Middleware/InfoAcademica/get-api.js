import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries"


export const getHistoriaAcademica = async () => {
    return queryAsset(queries.history, apiUrl.InfoAcademica.get)
}
