import React, { useCallback, useContext } from 'react';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';
import app, { googleProvider } from '../../firebase';
import { TextField, Button, Box, Typography } from '@material-ui/core';
import classes from './login.module.scss';
import { AuthUserContext } from '../../providers/AuthProvider';

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = ({ history }): React.ReactElement => {
    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app.auth().signInWithEmailAndPassword(email.value, password.value);
                history.push('/');
            } catch (error) {
                alert(error);
            }
        },
        [history],
    );

    const signInWithGoogle = () => {
        app.auth().signInWithPopup(googleProvider);
    };

    const { authUser } = useContext(AuthUserContext);

    if (authUser) {
        return <Redirect to="/" />;
    }

    return (
        <div className={classes.login}>
            <form className={classes.loginForm} onSubmit={handleLogin}>
                <TextField
                    id="email"
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    placeholder="tu@email"
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    id="password"
                    name="password"
                    label="Contraseña"
                    type="password"
                    placeholder="********"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Ingresar
                </Button>
            </form>
            <Box p={1}>
                <Typography align="center">ó</Typography>
            </Box>
            <Button type="button" variant="contained" color="secondary" fullWidth={true} onClick={signInWithGoogle}>
                Ingresar con Google
            </Button>
        </div>
    );
};

export default withRouter(Login);
