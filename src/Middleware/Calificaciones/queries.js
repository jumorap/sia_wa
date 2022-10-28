const queries = {
    listGrades: `
            {
                listGrades(id: null, course: 1234456) {
                        id
                        id_course
                        name
                        percentage
                        grades
                    }
            }
    `,
    studentsList: `
        inscripcionByIdCurso(id_curso: "1234456"){
            documento_estudiante
    `,
    createGrades: `
        mutation {
            createGrades(
                id: 1
                id_course: 1234456
                name: ""
                percentage: 0.2
                grades: "{'jlizarazoa': 5}"
            ) {
                id
            }
        }
    `,
    updateGrades: `
        mutation {
            updateGrades(
                id: 1
                id_course: 1234456
                name: ""
                percentage: 0.2
                grades: "{'jlizarazoa': 5}"
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
    `,
    formatStudents:`
        {
            formatStudents(student: null, course: 1234456) {
            id
            id_student
            id_course
            grades
            }
        }
    `
}

export const updateGradesQuery = (data) => {
    return `
        mutation {
            updateGrades(
                id: ${data.id}
                id_course: ${data.id_course}
                name: "${data.name}"
                percentage: ${data.percentage}
                grades: "${data.grades}"
            ) {
                name
                grades
            }
        }
    `
}

export const createGradesQuery = (data) => {
    return `
    mutation {
        createGrades(
            id: ${data.id}
            id_course: ${data.id_course}
            name: "${data.name}"
            percentage: ${data.percentage}
            grades: "${data.grades}"
        ) {
            id
        }
    }
`
}

export const getGradesQuery = (data) => {
    return `
    {
        listGrades(id: null, course: ${data}) {
                id
                id_course
                name
                percentage
                grades
            }
    }`
}

export const getFormatStudents = (data) => {
    return `
    {
        formatStudents(student: null, course: ${data}) {
        id
        id_student
        id_course
        grades
        }
    }
    `
}


export default queries