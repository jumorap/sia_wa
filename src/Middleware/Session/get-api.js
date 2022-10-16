import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries";

export const auth = async (userData) => {
    const token = await queryAsset(queries('auth',userData), apiUrl.Session.get);
    return token;
}

export const auth_refresh = async (token) => {
    return queryAsset(queries('refresh',token), apiUrl.Session.get)
}
