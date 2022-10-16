import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth } from '../../Middleware/Session/get-api';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

/**
 * mui es una mierda :v solo bootstrap loks
 */

const styles = {
    form: {
        mt: 1,
    },
    textoHead: { color: '#FFF' },
    textfield: { bgcolor: '#FFF', borderRadius: '10px' },
    controlLabel: { color: '#FFF' },
    container: { bgcolor: 'rgb(31, 45, 82,0.8)', borderRadius: '20px' },
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 8
    },
    button: {
        mt: 3,
        mb: 2,
        fontWeight: 'bold',
        color: '#1F2D52',
        bgcolor: '#FFF',
        '&:hover': {
            border: 1,
            color: '#FFF',
            bgcolor: '#1F2D52',
            marginColor: '#FFFFFF'
        }
    }
}

export default function Login(props) {
    const [passwordType, setPasswordType] = React.useState("password");
    const [passwordInput, setPasswordInput] = React.useState("");
    const [labesPasswordState, changeLabelSatus] = React.useState("Mostrar");
    const [open, setOpen] = React.useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = { nombre_usuario: data.get('nombre_usuario'), contrasena: data.get('password') };
        const token = await auth(user);
        if (token?.getToken?.auth_token) {
            sessionStorage.setItem('TOKEN', token.getToken.auth_token);
            console.log(token.getToken);
            //Redireccionar a otra ruta?
        } else {
            setOpen(true);
        }
    };

    const showPassword = () => {
        if (passwordType === "password") {
            changeLabelSatus("Ocultar");
            setPasswordType("text");
            return;
        }
        changeLabelSatus("Mostrar");
        setPasswordType("password");
    };

    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
    }

    return (
        <Container sx={styles.container} component="main" maxWidth="sm">
            <Box sx={styles.box}>
                <Typography sx={styles.textoHead} component="h1" variant="h5">
                    Ingrese su usuario y contraseña
                </Typography>
                <Box sx={styles.form} component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        sx={styles.textfield}
                        margin="normal"
                        required
                        fullWidth
                        id="nombre_usuario"
                        label="Nombre usuario"
                        name="nombre_usuario"
                        variant='filled'
                        autoFocus
                    />
                    <TextField
                        sx={styles.textfield}
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
                    />
                    <FormControlLabel
                        sx={styles.controlLabel}
                        control={<Checkbox value="remember" color="primary" />}
                        onChange={showPassword}
                        label={labesPasswordState + " contraseña"}
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
                        Usuario y contraseña incorrectos
                    </Alert>
                </Collapse>
                </Box>
            </Box>
        </Container>
    );
}