import React, {useState, useEffect, useRef} from "react";
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { FaUserAlt, FaBirthdayCake, FaFileMedical, FaAward, FaPeopleArrows, FaHouseUser } from 'react-icons/fa';

import { getHistoriaAcademica } from "../../Middleware";

import styles from "./styles";
import Box from "@mui/material/Box";


/**
 * Generate a title card with an icon
 * @param IconTitle Icon to show in the title
 * @param title Title to show in the card
 * @returns {JSX.Element}
 */
// simple request to API
// if (!data) getUser().then((response) => setData(response.user))

const InfoAcademica = () => {
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
    </>
    )
}

export default InfoAcademica