import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries"


export const getUser = async () => {
    return queryAsset(queries.user, apiUrl.InfoPersonal.get)
}

export const updateUser = async (query=queries.updateUser) => {
    return queryAsset(query, apiUrl.InfoPersonal.get)
}
