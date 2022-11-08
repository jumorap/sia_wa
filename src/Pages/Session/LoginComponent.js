import React, { useState, useEffect, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, TextField, FormControlLabel, Checkbox, Box, Typography, Container, Alert, IconButton, Collapse } from '@mui/material';
import { Redirect } from "react-router-dom";
import tokenAsset from '../../Middleware/tokenAsset';
import { UserContext } from "../../Routes";
import { auth, auth_refresh } from '../../Middleware/Session/get-api';
import styles from "./styles";


export default function Login() {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [labelPasswordState, changeLabelStatus] = useState("Mostrar");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isUser, setUser] = useContext(UserContext);


    tokenAsset(useEffect, auth_refresh,setLoading, setUser, loading);

    if (isUser) {
        return <Redirect to={'/info_personal'} />
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = { nombre_usuario: data.get('nombre_usuario'), contrasena: data.get('password') };
        let token = await auth(user);

        if (token?.getToken?.auth_token && token?.getToken?.rol) {
            sessionStorage.setItem('USER', user.nombre_usuario);
            sessionStorage.setItem('TOKEN', token.getToken.auth_token);
            token.getToken.rol.forEach(element => {
                sessionStorage.setItem(element.tipo_rol, 'true');
            });
            console.log(token.getToken);
            setUser(true);
        } else {
            sessionStorage.clear();
            setOpen(true);
        }
    };

    const showPassword = () => {
        if (passwordType === "password") {
            changeLabelStatus("Ocultar");
            setPasswordType("text");
            return;
        }
        changeLabelStatus("Mostrar");
        setPasswordType("password");
    };

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }

    return (
        <Container sx={styles.container} component="main" maxWidth="sm">
            <Box sx={styles.box}>
                <Typography sx={styles.textHead} component="h1" variant="h5">
                    Iniciar Sesión
                </Typography>
                <Box sx={styles.form} component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        sx={styles.textField}
                        margin="normal"
                        required
                        fullWidth
                        id="nombre_usuario"
                        label="Usuario"
                        name="nombre_usuario"
                        variant='filled'
                        autoFocus
                        error={open}
                        size={'small'}
                    />
                    <TextField
                        sx={styles.textField}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={passwordType}
                        id="password"
                        variant='filled'
                        value={passwordInput}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                        error={open}
                        size={'small'}
                    />
                    <FormControlLabel
                        sx={styles.controlLabel}
                        control={<Checkbox value="remember" color="primary" />}
                        onChange={showPassword}
                        label={labelPasswordState + " contraseña"}
                    />
                    <Button
                        sx={styles.button}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Iniciar sesión
                    </Button>
                    <Collapse in={open}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"

                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Usuario o contraseña incorrectos
                        </Alert>
                    </Collapse>
                </Box>
            </Box>
        </Container>
    );
}