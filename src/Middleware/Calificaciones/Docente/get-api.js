import apiUrl from "../../api-url"
import queryAsset from "../../queryAsset"

export const getGrades = async () => {
    return queryAsset(queries.grades, apiUrl.Calificaciones.get)
}

export const getStudents = async () => {
    return queryAsset(queries.studentsList, apiUrl.Calificaciones.get)
}

export const createGrades = async () => {
    return queryAsset(queries.createGrades, apiUrl.Calificaciones.get)
}

export const updateGrades = async () => {
    return queryAsset(queries.updateGrades, apiUrl.Calificaciones.get)
}

export const deleteGrades = async () => {
    return queryAsset(queries.deleteGrades, apiUrl.Calificaciones.get)
}