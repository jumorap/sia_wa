import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';

import { getUser, updateUser, updateUserQuery } from "../../Middleware";
import styles from "./styles";


/**
 * Generate a title card with an icon
 * @param props props.IconTitle Icon to show in the title and props.title Ttile to show in the card
 * @returns {JSX.Element}
 */
const TitleCard = (props) => {
    return (
        <Card sx={[styles.cards, styles.cardsLong]}>
            <CardContent>
                <Typography variant="h5" sx={[styles.typoTitle, styles.typoIconTitle]}>
                    <props.IconTitle style={styles.typoText}/>
                    &nbsp; {props.title}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a subtitle card
 * @param props props.subtitle Subtitle to show in the card
 * @returns {JSX.Element}
 */
const SubtitleCard = (props) => {
    return (
        <Card sx={[styles.cards, styles.cardsLong]}>
            <CardContent>
                <Typography variant="body2" sx={styles.typoTitle}>
                    {props.subtitle}
                </Typography>
            </CardContent>
        </Card>
    )
}

/**
 * Generate a card with a title and a value to show in the page
 * @returns {JSX.Element} Card with the title and data
 * @param props Props of the component with the title and data
 */
const CardGenerator = (props) => {
    return (
        <Card sx={[styles.cards, styles.cardsShort]}>
            <CardContent>
                <Typography variant="body1" sx={styles.typoText}>
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.data}
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
    const [details, setDetails] = useState({})

    useEffect(() => {
        // Make a single request to the API
        if (!data) getUser().then((response) => setData(response.user))
    }, [data])

    /**
     * Get the user information from the API and set the data state
     */
    const getUserInfo = () => {
        setDetails({
            nombre_usuario: data?.nombre_usuario,
            lugar_expedicion: data?.lugar_expedicion,
            email_personal: data?.email_personal,
            telefono_movil: data?.telefono_movil,
            eps: data?.eps,
            vivienda_direccion: data?.vivienda[1]?.vivienda_direccion,
            vivienda_departamento: data?.vivienda[1]?.vivienda_departamento,
            vivienda_codigo_postal: data?.vivienda[1]?.vivienda_codigo_postal,
            vivienda_estrato: data?.vivienda[1]?.vivienda_estrato,
            vivienda_telefono: data?.vivienda[1]?.vivienda_telefono,
            situacion_militar: data?.situacion_militar,
        })
    }

    /**
     * Put the edited data in the state
     * @param e Event of the input
     */
    const handleChanges = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }

    /**
     * Change the view from plain text to editable text and vice versa
     * @param titleGet Title of the data to get from the state
     * @param dataGet Data to show in the input
     * @param editableGet If the input is editable or not
     * @returns {JSX.Element|string}
     */
    const editableGenerator = (titleGet, dataGet, editableGet=false) => {
        if (!dataGet) dataGet = "-"
        if (!edit || !editableGet) return (dataGet)

        if (editableGet) {
            return (
                <TextField
                    // Remove blank spaces
                    name={titleGet}
                    rows={1}
                    defaultValue={dataGet}
                    variant={"outlined"}
                    size={"small"}
                    fullWidth
                    autoComplete={"off"}
                    disabled={buttonEnabled}
                    onChange={handleChanges}
                />
            )}
    }

    /**
     * Save the changes in the state to the API updating the user info and enabling/disabling the edit mode
     */
    const updateAndEnableDisableButton = () => {
        setButtonEnabled(true)
        const query = updateUserQuery(details)
        updateUser(query)
            .then(() => setEdit(!edit))
            .then(() => setButtonEnabled(false))
            .then(() => getUser().then((response) => setData(response.user)))
            .then(() => getUserInfo())
    }

    return (
        <>
            <Card sx={[styles.cards, styles.buttonContainer]}>
                <CardContent>
                    {/** Button to edit the information enabling the text fields and lunching the GraphQL update function */}
                    <Button variant="contained" disabled={buttonEnabled} sx={styles.buttonEdit}
                            onClick={() =>
                                {edit ?
                                    updateAndEnableDisableButton() :
                                    getUserInfo()
                                    setEdit(!edit)
                                }
                            }>
                        {edit ? "GUARDAR": "MODIFICAR"}
                    </Button>
                </CardContent>
            </Card>

            <Box style={styles.container}>
                <TitleCard IconTitle={FaUserAlt} title="Información Básica"/>
                <CardGenerator title="NOMBRES" data={editableGenerator("nombrecompleto", data?.nombre_completo)}/>
                <CardGenerator title="DOCUMENTO" data={editableGenerator("documentoidentidad", data?.documento_identidad)}/>
                <CardGenerator title="EXPEDIDO EN" data={editableGenerator("lugar_expedicion", data?.lugar_expedicion, true)}/>
                <CardGenerator title="SEXO" data={editableGenerator("sexo", data?.sexo)}/>
                <CardGenerator title="ETNIA" data={editableGenerator("etnia", data?.etnia)}/>
                <CardGenerator title="EMAIL PERSONAL" data={editableGenerator("email_personal", data?.email_personal, true)}/>
                <CardGenerator title="EMAIL INSTITUCIONAL" data={editableGenerator("emailinstitucional", data?.email_institucional)}/>
                <CardGenerator title="TELÉFONO MÓVIL" data={editableGenerator("telefono_movil", data?.telefono_movil, true)}/>

                <TitleCard IconTitle={FaBirthdayCake} title="Información de Nacimiento"/>
                <CardGenerator title="FECHA" data={editableGenerator("fechanacimiento", data?.fecha_nacimiento)}/>
                <CardGenerator title="LUGAR" data={editableGenerator("lugarnacimiento", data?.lugar_nacimiento)}/>
                <CardGenerator title="NACIONALIDAD" data={editableGenerator("nacionalidad", data?.nacionalidad)}/>

                <TitleCard IconTitle={FaFileMedical} title="Información de Salud"/>
                <CardGenerator title="TIPO SANGRE" data={editableGenerator("tiposangre", data?.tipo_sangre)}/>
                <CardGenerator title="EPS" data={editableGenerator("eps", data?.eps, true)}/>

                <TitleCard IconTitle={FaPeopleArrows} title="Responsables"/>
                <SubtitleCard subtitle="Responsable 1"/>
                <CardGenerator title="NOMBRES" data={editableGenerator("responsablenombres", data?.responsables[0]?.responsable_nombre)}/>
                <CardGenerator title="TIPO DOCUMENTO" data={editableGenerator("responsabletipodocumento", data?.responsables[0]?.responsable_tipo_doc)}/>
                <CardGenerator title="DOCUMENTO" data={editableGenerator("responsabledocumento", data?.responsables[0]?.responsable_numero_doc)}/>
                <CardGenerator title="TELÉFONO" data={editableGenerator("responsabletelefono", data?.responsables[0]?.responsable_telefono)}/>
                <SubtitleCard subtitle="Responsable 2"/>
                <CardGenerator title="NOMBRES" data={editableGenerator("responsablenombres", data?.responsables[1]?.responsable_nombre)}/>
                <CardGenerator title="TIPO DOCUMENTO" data={editableGenerator("responsabletipodocumento", data?.responsables[1]?.responsable_tipo_doc)}/>
                <CardGenerator title="DOCUMENTO" data={editableGenerator("responsabledocumento", data?.responsables[1]?.responsable_numero_doc)}/>
                <CardGenerator title="TELÉFONO" data={editableGenerator("responsabletelefono", data?.responsables[1]?.responsable_telefono)}/>

                <TitleCard IconTitle={FaHouseUser} title="Vivienda"/>
                <SubtitleCard subtitle="Vivienda Previa"/>
                <CardGenerator title="DIRECCIÓN" data={editableGenerator("viviendadireccion", data?.vivienda[0]?.vivienda_direccion)}/>
                <CardGenerator title="DEPARTAMENTO" data={editableGenerator("viviendadepartamento", data?.vivienda[0]?.vivienda_departamento)}/>
                <CardGenerator title="CÓDIGO POSTAL" data={editableGenerator("viviendacodigopostal", data?.vivienda[0]?.vivienda_codigo_postal)}/>
                <CardGenerator title="ESTRATO" data={editableGenerator("viviendaestrato", data?.vivienda[0]?.vivienda_estrato)}/>
                <CardGenerator title="TELÉFONO" data={editableGenerator("viviendatelefono", data?.vivienda[0]?.vivienda_telefono)}/>
                <SubtitleCard subtitle="Vivienda Actual"/>
                <CardGenerator title="DIRECCIÓN" data={editableGenerator("vivienda_direccion", data?.vivienda[1]?.vivienda_direccion, true)}/>
                <CardGenerator title="DEPARTAMENTO" data={editableGenerator("vivienda_departamento", data?.vivienda[1]?.vivienda_departamento, true)}/>
                <CardGenerator title="CÓDIGO POSTAL" data={editableGenerator("vivienda_codigo_postal", data?.vivienda[1]?.vivienda_codigo_postal, true)}/>
                <CardGenerator title="ESTRATO" data={editableGenerator("vivienda_estrato", data?.vivienda[1]?.vivienda_estrato, true)}/>
                <CardGenerator title="TELÉFONO" data={editableGenerator("vivienda_telefono", data?.vivienda[1]?.vivienda_telefono, true)}/>

                <TitleCard IconTitle={FaAward} title="Información Militar"/>
                <CardGenerator title="SITUACIÓN MILITAR" data={editableGenerator("situacion_militar", data?.situacion_militar)}/>
            </Box>
        </>
    )
}

export default InfoPersonal;
