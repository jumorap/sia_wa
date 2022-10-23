import React, {useState, useEffect, useRef} from "react";
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
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
 * @param edit Boolean to know if the card is editable
 * @param disableOption Boolean to know if the card is disabled
 * @returns {JSX.Element} Card with the title and data
 */
const cardGenerator = (title, data, edit=false, disableOption=false) => {
    const Editable = () => {
        return (
            <TextField
                ref={useRef()}
                rows={1}
                defaultValue={data}
                variant="outlined"
                size="small"
                disabled={disableOption}
                fullWidth
            />
        )
    }

    if (!data) data = "-"

    return (
        <Card sx={[styles.cards, styles.cardsShort]}>
            <CardContent>
                <Typography variant="body1" sx={styles.typoText}>
                    {title}
                </Typography>
                <Typography variant="body2">
                    {!edit ? data : <Editable />}
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
    }, [data])

    return (
        <>
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

            <Box style={styles.container}>
                    {titleCard(FaUserAlt, "Información Básica")}
                {cardGenerator("NOMBRES", data?.nombre_completo)}
                {cardGenerator("DOCUMENTO", data?.documento_identidad)}
                {cardGenerator("EXPEDIDO EN", data?.lugar_expedicion, edit, buttonEnabled)}
                {cardGenerator("SEXO", data?.sexo)}
                {cardGenerator("ETNIA", data?.etnia)}
                {cardGenerator("EMAIL", data?.email_personal, edit, buttonEnabled)}
                {cardGenerator("EMAIL INSTITUCIONAL", data?.email_institucional)}
                {cardGenerator("TELÉFONO", data?.telefono_movil, edit, buttonEnabled)}

                    {titleCard(FaBirthdayCake, "Información de Nacimiento")}
                {cardGenerator("FECHA", data?.fecha_nacimiento)}
                {cardGenerator("LUGAR", data?.lugar_nacimiento)}
                {cardGenerator("NACIONALIDAD", data?.nacionalidad)}

                    {titleCard(FaFileMedical, "Información de Salud")}
                {cardGenerator("TIPO SANGRE", data?.tipo_sangre)}
                {cardGenerator("EPS", data?.eps, edit, buttonEnabled)}

                    {titleCard(FaPeopleArrows, "Responsables")}
                        {subtitleCard("Responsable 1")}
                {cardGenerator("NOMBRES", data?.responsables[0]?.responsable_nombre)}
                {cardGenerator("TIPO DOCUMENTO", data?.responsables[0]?.responsable_tipo_doc)}
                {cardGenerator("DOCUMENTO", data?.responsables[0]?.responsable_numero_doc)}
                {cardGenerator("TELÉFONO", data?.responsables[0]?.responsable_telefono)}
                        {subtitleCard("Responsable 2")}
                {cardGenerator("NOMBRES", data?.responsables[1]?.responsable_nombre)}
                {cardGenerator("TIPO DOCUMENTO", data?.responsables[1]?.responsable_tipo_doc)}
                {cardGenerator("DOCUMENTO", data?.responsables[1]?.responsable_numero_doc)}
                {cardGenerator("TELÉFONO", data?.responsables[1]?.responsable_telefono)}

                    {titleCard(FaHouseUser, "Vivienda")}
                        {subtitleCard("Vivienda Previa")}
                {cardGenerator("DIRECCIÓN", data?.vivienda[0]?.vivienda_direccion)}
                {cardGenerator("DEPARTAMENTO", data?.vivienda[0]?.vivienda_departamento)}
                {cardGenerator("CÓDIGO POSTAL", data?.vivienda[0]?.vivienda_codigo_postal)}
                {cardGenerator("ESTRATO", data?.vivienda[0]?.vivienda_estrato)}
                {cardGenerator("TELÉFONO", data?.vivienda[0]?.vivienda_telefono)}
                        {subtitleCard("Vivienda Actual")}
                {cardGenerator("DIRECCIÓN", data?.vivienda[1]?.vivienda_direccion, edit, buttonEnabled)}
                {cardGenerator("DEPARTAMENTO", data?.vivienda[1]?.vivienda_departamento, edit, buttonEnabled)}
                {cardGenerator("CÓDIGO POSTAL", data?.vivienda[1]?.vivienda_codigo_postal, edit, buttonEnabled)}
                {cardGenerator("ESTRATO", data?.vivienda[1]?.vivienda_estrato, edit, buttonEnabled)}
                {cardGenerator("TELÉFONO", data?.vivienda[1]?.vivienda_telefono, edit, buttonEnabled)}

                    {titleCard(FaAward, "Información de Militar")}
                {cardGenerator("SIT. MILITAR", data?.situacion_militar, edit, buttonEnabled)}
            </Box>
        </>
    )
}

export default InfoPersonal;
