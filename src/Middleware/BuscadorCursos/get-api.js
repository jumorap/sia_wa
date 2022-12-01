import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries"



export const getCursos = async (query=queries.cursos) => {
    let error = null;
    const data = await queryAsset(query, apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data, error};
}   

export const getCurso = async (codigo_asignatura) => {
    let error = null;
    const data = await queryAsset(queries.curso(codigo_asignatura), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data, error};
}

export const getSede = async () => {
    let error = null;
    const data = await queryAsset(queries.sede(), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data : data.sedes, error};
}

export const getFacultades = async () => {
    let error = null;
    const data =  await queryAsset(queries.facultades(), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data: data.facultades, error};
}

export const getPorgramasByFacultad = async (id_facultad) => {
    let error = null;
    const data = await queryAsset(queries.programasByFacultad(id_facultad), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    console.log(data);
    return {data: data.facultad.programas, error};
}

export const getAsignaturasByPrograma = async (id_programa) => {
    let error = null;
    const data = await queryAsset(queries.cursosByPrograma(id_programa), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data: data.programa.asignaturas, error};
}

export const getProgramas = async () => {
    let error = null;
    const data =  await queryAsset(queries.programas(), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data : data.programas, error};
}

export const getCursosCompletos = async () => {
    let error = null;
    const data =  await queryAsset(queries.cursos_completos(), apiUrl.BuscadorCursos.get)
    .catch((err) => {
        error = err;
    });
    return {data, error};
}

