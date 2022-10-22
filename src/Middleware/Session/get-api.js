import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries";

export const auth = async (userData) => {
    var token;
    try {
        token = await queryAsset(queries('auth', userData), apiUrl.Session.get);
    } catch (e) {
        token = null;
    }
    return token;
}

export const auth_refresh = async (token) => {
    var token;
    try {
        token = await queryAsset(queries('refresh', token), apiUrl.Session.get);
    } catch (e) {
        token = null;
    }
    return token;
}
