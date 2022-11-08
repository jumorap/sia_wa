const queries = {
    history: `
        listHistory(id: "1234456", null) {
            id
            id_student
            id_program
            percentage_adv
            asignature_taken
        }
    `,
    listAsignatures: `
        listAsignatures(id_curso: "123456", termn: null){
            id
            term
            consolidated
        }
    `,
    listGrades: `
        listGrades(id: "1"}, asignature: null){
            id
            id_asignature
            name
            percentage
            id_students
            values
        }
    `,
    listGrades: `
        Tipologia(codigoAsignatura: null)
            asignatura(codigo_asignatura: null)
                codigo_asignatura
                nombre_asignatura
                creditos
                descripcion
                id_tipologia
                id_programa
    `,
}

export default queries;