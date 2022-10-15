import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import { getUser } from "../../Middleware/InfoPersonal/get-api";

/*
        {
          user(username: "test") {
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
 */

const InfoPersonal = () => {
    const [data, setData] = useState(null);



    const cardGenerator = (title, data) => {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2">
                        {data}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    useEffect(() => {
        // Make a single request to the API
        if (!data) {
            getUser()
                .then((response) => {
                    setData(response.user)
                })
        }
    })

    return (
        <Box sx={{ minWidth: 275 }}>
            <Card sx={{ minWidth: 275 }}>
                {/*Use cardGenerator*/}
                {cardGenerator("Nombre de usuario", data?.nombre_usuario)}
                {cardGenerator("Nombre completo", data?.nombre_completo)}
                {cardGenerator("Documento de identidad", data?.documento_identidad)}
                {cardGenerator("Lugar de expedición", data?.lugar_expedicion)}
                {cardGenerator("Sexo", data?.sexo)}
                {cardGenerator("Etnia", data?.etnia)}
                {cardGenerator("Email personal", data?.email_personal)}
                {cardGenerator("Email institucional", data?.email_institucional)}
                {cardGenerator("Teléfono móvil", data?.telefono_movil)}
                {cardGenerator("Fecha de nacimiento", data?.fecha_nacimiento)}
                {cardGenerator("Lugar de nacimiento", data?.lugar_nacimiento)}
                {cardGenerator("Nacionalidad", data?.nacionalidad)}
                {cardGenerator("Tipo de sangre", data?.tipo_sangre)}
                {cardGenerator("EPS", data?.eps)}
                {cardGenerator("Situación militar", data?.situacion_militar)}
            </Card>
        </Box>
    )
}

export default InfoPersonal;
