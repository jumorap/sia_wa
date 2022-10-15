const queries = {
    user: `
        {
          user(username: "jumorap") {
            nombre_usuario
            nombre_completo
            documento_identidad
            lugar_expedicion
            sexo
            etnia
            email_personal
            email_institucional
            telefono_movil
            fecha_nacimiento
            lugar_nacimiento
            nacionalidad
            tipo_sangre
            eps
            situacion_militar
            responsables {
              responsable_nombre
              responsable_tipo_doc
              responsable_numero_doc
              responsable_telefono
            }
            vivienda {
              vivienda_tipo
              vivienda_direccion
              vivienda_departamento
              vivienda_codigo_postal
              vivienda_telefono
              vivienda_estrato
            }
          }
        }
    `,
    updateUser: `
        mutation {
          updateUser(
            nombre_usuario: "test"
            lugar_expedicion: "NEW PLACE"
            email_personal: "NEW EMAIL"
            telefono_movil: "NEW PHONE"
            eps: "NEW EPS SANITAS"
            situacion_militar: "N"
            vivienda: [
            {
              vivienda_tipo: ""
              vivienda_direccion: ""
              vivienda_departamento: ""
              vivienda_codigo_postal: ""
              vivienda_telefono: ""
              vivienda_estrato: ""
            },
            {
              vivienda_tipo: "a"
              vivienda_direccion: ""
              vivienda_departamento: ""
              vivienda_codigo_postal: ""
              vivienda_telefono: ""
              vivienda_estrato: "5"
            },
          ]
          ) {
            message
          }
        }
    `,
}

export default queries
