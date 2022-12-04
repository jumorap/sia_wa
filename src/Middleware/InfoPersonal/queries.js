const queries = (username, typ) => {
    console.log({username, typ})

    const user = (username) => `
        {
          user(username: "${username}") {
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
    `

    const updateUser = (username) => `
        mutation {
          updateUser(
            nombre_usuario: "${username}"
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
    `

    return eval(typ)(username)
}

export const updateUserQuery = (details) => {
    return `
      mutation {
        updateUser(
          nombre_usuario: "${details.nombre_usuario.trim()}",
          lugar_expedicion: "${details.lugar_expedicion.trim()}",
          email_personal: "${details.email_personal.trim()}",
          telefono_movil: "${details.telefono_movil.trim()}",
          eps: "${details.eps.trim()}",
          situacion_militar: "${details.situacion_militar.trim()}",
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
                vivienda_tipo: "a",
                vivienda_direccion: "${details.vivienda_direccion.trim()}",
                vivienda_departamento: "${details.vivienda_departamento.trim()}",
                vivienda_codigo_postal: "${details.vivienda_codigo_postal.trim()}",
                vivienda_telefono: "${details.vivienda_telefono.trim()}",
                vivienda_estrato: "${details.vivienda_estrato.trim()}"
              },
          ]
        ) {
          message
        }
      }
    `
}


export default queries
