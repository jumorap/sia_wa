const queries = {
  cursos: `
    {
      asignaturas{
        codigo_asignatura
        nombre_asignatura
      }
    }
    `,
  curso: (codigo_asignatura) =>
    `
    {
      asignatura(codigo_asignatura: ${codigo_asignatura}){
        codigo_asignatura
        nombre_asignatura
        nombre_asignatura
        creditos
        descripcion
      }
    }
    `,
  sede: () =>
    `
    {
       sedes{
        id_sede
        nombre_sede
       }
    }
    `,
  facultades: () =>
    `
    {
      facultades{
       nombre_facultad
       id_facultad
     }
     }
    `,
};

export default queries;
