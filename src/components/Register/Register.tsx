import React, { useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import app from '../../firebase';
import { TextField, Button } from '@material-ui/core';
import classes from './register.module.scss';

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = ({ history }): React.ReactElement => {
    const handleRegister = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app.auth().createUserWithEmailAndPassword(email.value, password.value);
                history.push('/');
            } catch (error) {
                alert(error);
            }
        },
        [history],
    );

    return (
        <div className={classes.register}>
            <form className={classes.registerForm} onSubmit={handleRegister}>
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
                    Registrarse
                </Button>
            </form>
        </div>
    );
};

export default withRouter(Register);
