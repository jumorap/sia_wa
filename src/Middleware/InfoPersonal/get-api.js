import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries"


const url = apiUrl.InfoPersonal.get

export const getUser = async () => {
    return queryAsset(queries(sessionStorage.USER, "user"), url)
}

export const updateUser = async (query=queries(sessionStorage.USER, "updateUser")) => {
    return queryAsset(query, url)
}
