import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';

import { getUser, updateUser } from "../../Middleware";
import styles from "./styles";
import Box from "@mui/material/Box";


/**
 * Generate a title card with an icon
 * @param IconTitle Icon to show in the title
 * @param title Title to show in the card
 * @returns {JSX.Element}
 */
const titleCard = (IconTitle, title) => {
    return (
        <Card sx={[styles.cards, styles.cardsLong]}>
            <CardContent>
                <Typography variant="h5" sx={[styles.typoTitle, styles.typoIconTitle]}>
                    <IconTitle style={styles.typoText}/>
                    &nbsp; {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a subtitle card
 * @param subtitle Subtitle to show in the card
 * @returns {JSX.Element}
 */
const subtitleCard = (subtitle) => {
    return (
        <Card sx={[styles.cards, styles.cardsLong]}>
            <CardContent>
                <Typography variant="body2" sx={styles.typoTitle}>
                    {subtitle}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a card with a title and a value to show in the page
 * @param title Type of information to show
 * @param data Data to show in the card
 * @returns {JSX.Element} Card with the title and data
 */
const cardGenerator = (title, data) => {
    return (
        <Card sx={[styles.cards, styles.cardsShort]}>
            <CardContent>
                <Typography variant="body1" sx={styles.typoText}>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {!data ? "-" : data}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a card with a title and a value to show in the page
 * @param title Type of information to show
 * @param data Data to show in the card
 * @param edit Boolean to know if the card is editable
 * @returns {JSX.Element}
 */
const editOrCardGenerator = (title, data, edit) => {
    return (
        <>
            {!edit ? (cardGenerator(title, data)) :
                cardGenerator(title,
                    (
                        <TextField
                            rows={1}
                            defaultValue={data}
                            variant="outlined"
                            size="small"
                            sx={styles.inputEdit}
                        />
            ))}
        </>
    )
}

/**
 * Page to show the personal information of the user
 * @returns {JSX.Element}
 */
const InfoPersonal = () => {
    const [data, setData] = useState(null)
    const [edit, setEdit] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(false)

    const enableDisableButton = () => {
        setButtonEnabled(true)
        updateUser()
            .then(() => setEdit(!edit))
            .then(() => setButtonEnabled(false))
    }

    useEffect(() => {
        // Make a single request to the API
        if (!data) getUser().then((response) => setData(response.user))
    })

    return (
        <Box sx={styles.generalContainer}>
            <Card sx={[styles.cards, styles.buttonContainer]}>
                <CardContent>
                    {/** Button to edit the information enabling the text fields and lunching the GraphQL update function */}
                    <Button variant="contained" disabled={buttonEnabled} sx={styles.buttonEdit}
                            onClick={() =>
                                {edit ?
                                    enableDisableButton() :
                                    setEdit(!edit)
                                }
                            }>
                        {edit ? "GUARDAR": "MODIFICAR"}
                    </Button>
                </CardContent>
            </Card>

            <div style={styles.container}>
                {titleCard(FaUserAlt, "Información Básica")}
                {cardGenerator("NOMBRES", data?.nombre_completo)}
                {cardGenerator("DOCUMENTO", data?.documento_identidad)}
                {editOrCardGenerator("EXPEDIDO EN", data?.lugar_expedicion, edit)}
                {cardGenerator("SEXO", data?.sexo)}
                {cardGenerator("ETNIA", data?.etnia)}
                {editOrCardGenerator("EMAIL", data?.email_personal, edit)}
                {cardGenerator("EMAIL INSTITUCIONAL", data?.email_institucional)}
                {editOrCardGenerator("TELÉFONO", data?.telefono_movil, edit)}

                {titleCard(FaBirthdayCake, "Información de Nacimiento")}
                {cardGenerator("FECHA", data?.fecha_nacimiento)}
                {cardGenerator("LUGAR", data?.lugar_nacimiento)}
                {cardGenerator("NACIONALIDAD", data?.nacionalidad)}

                {titleCard(FaFileMedical, "Información de Salud")}
                {cardGenerator("Tipo de sangre", data?.tipo_sangre)}
                {editOrCardGenerator("EPS", data?.eps, edit)}

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
                {editOrCardGenerator("DIRECCIÓN", data?.vivienda[1]?.vivienda_direccion, edit)}
                {editOrCardGenerator("DEPARTAMENTO", data?.vivienda[1]?.vivienda_departamento, edit)}
                {editOrCardGenerator("CÓDIGO POSTAL", data?.vivienda[1]?.vivienda_codigo_postal, edit)}
                {editOrCardGenerator("ESTRATO", data?.vivienda[1]?.vivienda_estrato, edit)}
                {editOrCardGenerator("TELÉFONO", data?.vivienda[1]?.vivienda_telefono, edit)}

                {titleCard(FaAward, "Información de Militar")}
                {editOrCardGenerator("Situación militar", data?.situacion_militar, edit)}
            </div>
        </Box>
    )
}

export default InfoPersonal;
