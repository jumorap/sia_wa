import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';

import { getUser } from "../../Middleware";


const styles = {
    cards: {
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        boxShadow: 'none',
        borderTop: '1px solid var(--translucentGray)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        boxSizing: "border-box",
        flexFlow: "wrap"
    }
}

/**
 * Generate a title card with an icon
 * @param IconTitle Icon to show in the title
 * @param title Title to show in the card
 * @returns {JSX.Element}
 */
const titleCard = (IconTitle, title) => {
    return (
        <Card sx={[styles.cards, { width: "100%" }]}>
            <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold"}}>
                    <IconTitle style={{ fontSize: "20px", color: "var(--softGray)" }}/>
                    &nbsp; {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a subtitle card
 * @param title Subtitle to show in the card
 * @returns {JSX.Element}
 */
const subtitleCard = (title) => {
    return (
        <Card sx={[styles.cards, { width: "100%" }]}>
            <CardContent>
                <Typography variant="body2" sx={{ fontWeight: "bold"}}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a card with a title and a value to show in the page
 * @param subtitle Type of information to show
 * @param data Data to show in the card
 * @returns {JSX.Element} Card with the title and data
 */
const cardGenerator = (subtitle, data) => {
    return (
        <Card sx={[styles.cards, { width: "50%" }]}>
            <CardContent>
                <Typography variant="body1" sx={{ color: "var(--softGray)" }}>
                    {subtitle}
                </Typography>
                <Typography variant="body2">
                    {!data ? "NO APLICA" : data}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Page to show the personal information of the user
 * @returns {JSX.Element}
 */
const InfoPersonal = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        // Make a single request to the API
        if (!data) getUser().then((response) => setData(response.user))
    })
    console.log(data)

    return (
        <>
            <div style={styles.container}>
                {titleCard(FaUserAlt, "Información Básica")}
                {cardGenerator("NOMBRES", data?.nombre_completo)}
                {cardGenerator("DOCUMENTO", data?.documento_identidad)}
                {cardGenerator("EXPEDIDO EN", data?.lugar_expedicion)}
                {cardGenerator("SEXO", data?.sexo)}
                {cardGenerator("ETNIA", data?.etnia)}
                {cardGenerator("EMAIL", data?.email_personal)}
                {cardGenerator("EMAIL INSTITUCIONAL", data?.email_institucional)}
                {cardGenerator("TELEFONO", data?.telefono_movil)}

                {titleCard(FaBirthdayCake, "Información de Nacimiento")}
                {cardGenerator("FECHA", data?.fecha_nacimiento)}
                {cardGenerator("LUGAR", data?.lugar_nacimiento)}
                {cardGenerator("NACIONALIDAD", data?.nacionalidad)}

                {titleCard(FaFileMedical, "Información de Salud")}
                {cardGenerator("Tipo de sangre", data?.tipo_sangre)}
                {cardGenerator("EPS", data?.eps)}

                {titleCard(FaPeopleArrows, "Responsables")}
                {subtitleCard("Responsable 1")}
                {cardGenerator("NOMBRES R1", data?.responsables[0]?.responsable_nombre)}
                {cardGenerator("TIPO DOCUMENTO R1", data?.responsables[0]?.responsable_tipo_doc)}
                {cardGenerator("DOCUMENTO R1", data?.responsables[0]?.responsable_numero_doc)}
                {cardGenerator("TELÉFONO R1", data?.responsables[0]?.responsable_telefono)}
                {subtitleCard("Responsable 2")}
                {cardGenerator("NOMBRES R2", data?.responsables[1]?.responsable_nombre)}
                {cardGenerator("TIPO DOCUMENTO R2", data?.responsables[1]?.responsable_tipo_doc)}
                {cardGenerator("DOCUMENTO R2", data?.responsables[1]?.responsable_numero_doc)}
                {cardGenerator("TELÉFONO R2", data?.responsables[1]?.responsable_telefono)}

                {titleCard(FaHouseUser, "Vivienda")}
                {subtitleCard("Vivienda Previa")}
                {cardGenerator("DIRECCIÓN", data?.vivienda[0]?.vivienda_direccion)}
                {cardGenerator("DEPARTAMENTO", data?.vivienda[0]?.vivienda_departamento)}
                {cardGenerator("CÓDIGO POSTAL", data?.vivienda[0]?.vivienda_codigo_postal)}
                {cardGenerator("ESTRATO", data?.vivienda[0]?.vivienda_estrato)}
                {cardGenerator("TELÉFONO", data?.vivienda[0]?.vivienda_telefono)}
                {subtitleCard("Vivienda Actual")}
                {cardGenerator("DIRECCIÓN", data?.vivienda[1]?.vivienda_direccion)}
                {cardGenerator("DEPARTAMENTO", data?.vivienda[1]?.vivienda_departamento)}
                {cardGenerator("CÓDIGO POSTAL", data?.vivienda[1]?.vivienda_codigo_postal)}
                {cardGenerator("ESTRATO", data?.vivienda[1]?.vivienda_estrato)}
                {cardGenerator("TELÉFONO", data?.vivienda[1]?.vivienda_telefono)}

                {titleCard(FaAward, "Información de Militar")}
                {cardGenerator("Situación militar", data?.situacion_militar)}
            </div>
        </>
    )
}

export default InfoPersonal;
