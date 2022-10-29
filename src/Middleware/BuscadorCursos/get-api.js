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
    const data = await queryAsset(queries.sede(), apiUrl.BuscadorCursos.get)
    return data.sedes
}

export const getFacultades = async () => {
    const data =  await queryAsset(queries.facultades(), apiUrl.BuscadorCursos.get)
    return data.facultades
}

export const getProgramas = async () => {
    const data =  await queryAsset(queries.programas(), apiUrl.BuscadorCursos.get)
    return data.programas
}

export const getCursosCompletos = async () => {
    const data =  await queryAsset(queries.cursos_completos(), apiUrl.BuscadorCursos.get)
    return data.asignaturas
}

