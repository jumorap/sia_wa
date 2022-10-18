const queries = {
    grades: `
        listGrades(null, "1234456") {
            id_course
            name
            percentage
            grades
        }
    `,
    studentsList: `
        inscripcionByIdCurso(id_curso: "1234456"){
            documento_estudiante
    `,
    createGrades: `
        mutation {
            createGrades(
                id: "1"
                id_course: "1234456"
                name: "Taller 1"
                percentage: 0.2
                grades: {"jlizarazoa": 5}
            ) {
                id
            }
        }
    `,
    updateGrades: `
        mutation {
            updateGrades(
                id: "1"
                id_course: "1234456"
                name: "Parcial 1"
                percentage: 0.2
                grades: {"jlizarazoa": 5}
            ) {
                name
                grades
            }
        }
    `,
    deleteGrades:`
        mutation {
            deleteGrades(input: "1") {
                message
            }
        }
    `
}