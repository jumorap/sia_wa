import apiUrl from "../api-url"
import queryAsset from "../queryAsset"
import queries from "./queries"


export const getGrades = async (query=queries.getGrades) => {
    return queryAsset(query, apiUrl.Calificaciones.get)
    /*let grades = [
        {
            id: 1,
            id_course: 1234456,
            name: "Parcial 2",
            percentage: 0.7,
            grades: {'jlizarazoa': 5, 'jumorap': 5}
        },
        {
            id: 2,
            id_course: 1234456,
            name: "Parcial 1",
            percentage: 0.3,
            grades: {'jlizarazoa': 5, 'jumorap': 5}
        },
        {
            id: 3,
            id_course: 123456,
            name: "Nota 1",
            percentage: 0.7,
            grades: {'pacuna': 5}
        },
        {
            id: 4,
            id_course: 123456,
            name: "Nota 2",
            percentage: 0.3,
            grades: {'pacuna': 5}
        }
    ];

    let courseSel = []
    if (args != null) {
        
        grades.map((grade) => {
            if (grade.id_course == args) {
                courseSel.push(grade)
            }
        })
    }
    
    return courseSel*/
}

export const getStudents = async (query=queries.formatStudents) => {
    return queryAsset(query, apiUrl.Calificaciones.get)
    
    /*let students = [
        {   
            id: 1,
            id_student: 'jlizarazoa',
            id_course: 1234456,
            grades: {'Parcial 2': [1, 5], 'Parcial 1': [1, 5], 'Definitiva': [1, 5]}
        },
        {
            id: 2,
            id_student: 'jumorap',
            id_course: 1234456,
            grades: {'Parcial 2': [1, 5], 'Parcial 1': [1, 5], 'Definitiva': [1, 5]}
        },
        {
            id: 3,
            id_student: 'pacuna',
            id_course: 123456,
            grades: {'Nota 1': [1, 5], 'Nota 2': [1, 5], 'Definitiva': [1, 5]}
        },
    ];
    
    let studentSel = []
    students.map((student) => {
        if (student.id_course == args) {
            studentSel.push(student)
        }
    })
    return studentSel*/

}

export const createGrades = async (query=queries.createGrades) => {
    return queryAsset(query, apiUrl.Calificaciones.get)
}

export const updateGrades = async (query=queries.updateGrades) => {
    return queryAsset(query, apiUrl.Calificaciones.get)
}

export const deleteGrades = async () => {
    return queryAsset(queries.deleteGrades, apiUrl.Calificaciones.get)
}

export const asignaturesStudents = async () => {
    return [
        {
            id: 1,
            id_student: 'jlizarazoa',
            id_course: "Arquitectura de Software",
            grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4]}',
        },
        {
            id: 2,
            id_student: 'jlizarazoa',
            id_course: "Computación Visual",
            grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4]}',
        },
        {
            id: 3,
            id_student: 'jlizarazoa',
            id_course: "Sistemas Inteligentes",
            grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4]}',
        },
        {
            id: 4,
            id_student: 'jlizarazoa',
            id_course: "Trabajo de Grado",
            grades: '{"Parcial 1": [0.2, 4.5], "Parcial 2": [0.3,5], "Parcial 3": [0.3,4], "Parcial 4": [0.3,4], "Parcial 5": [0.3,4], "Parcial 6": [0.3,4], "Parcial 7": [0.3,4], "Parcial 8": [0.3,4]}',
        },
          
    ];
    //return queryAsset(queries.formatStudents, apiUrl.Calificaciones.get)
}

export const docAsignatures = async () => {
    return [
        {
            id_curso: 1234456,
            documento_profesor: '2134455656',
            codigo_asignatura: '001', 
            nameCourse: 'ARQUITECTURA DE SOFTWARE'
        },
        {
            id_curso: 123456,
            documento_profesor: '2134455656',
            codigo_asignatura: '001', 
            nameCourse: 'ARQUITECTURA DE SOFTWARE'
        },
        {
            id_curso: 1234567,
            documento_profesor: '2134455656',
            codigo_asignatura: '002', 
            nameCourse: 'INGENIERÍA DE SOFTWARE I'
        },
    ]
}

export const listStudents = async () => {
    return [
        {   
            id: 1,
            id_student: 'jlizarazoa',
            id_course: 1234456,
            grades: "{}"
        },
        {
            id: 2,
            id_student: 'jumorap',
            id_course: 1234456,
            grades: "{}"
        },
        {
            id: 3,
            id_student: 'pacuna',
            id_course: 123456,
            grades: "{}"
        },
    ];
}
