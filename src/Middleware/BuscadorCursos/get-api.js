import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries"



export const getCursos = async (query=queries.cursos) => {
    return queryAsset(query, apiUrl.BuscadorCursos.get)
}   

export const getCurso = async (codigo_asignatura) => {
    return queryAsset(queries.curso(codigo_asignatura), apiUrl.BuscadorCursos.get)
}

export const getSede = async () => {
    return queryAsset(queries.sede(), apiUrl.BuscadorCursos.get)
}

export const getFacultades = async () => {
    return queryAsset(queries.facultades(), apiUrl.BuscadorCursos.get)
}

