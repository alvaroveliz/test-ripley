import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import app from '../firebase/firebase';

interface Props {
    authUser?: any;
}

interface ICurrentUser {
    authUser: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

export const AuthUserContext = React.createContext<ICurrentUser>({ authUser: null });

export const AuthProvider: React.FC<Props> = (props) => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState<ICurrentUser>({ authUser: null });
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((authUser) => {
            const currentUser = authUser ? authUser : null;
            setCurrentUser({ authUser: currentUser });
            setPending(false);
        });
    }, []);

    if (pending) {
        return (
            <Backdrop className={classes.backdrop} open={pending}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return <AuthUserContext.Provider value={currentUser}>{props.children}</AuthUserContext.Provider>;
};
