import React, { useContext } from 'react';
import app from '../../firebase';
import { AuthUserContext } from '../../providers/AuthProvider';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {},
        appBar: {
            backgroundColor: '#1A1A1A',
        },
        headerTitle: {
            flexGrow: 1,
        },
    }),
);

const Header: React.FC = (): React.ReactElement => {
    const classes = useStyles();
    const { authUser } = useContext(AuthUserContext);

    return (
        <div className={classes.header}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.headerTitle}>
                        Catálogo Ripley
                    </Typography>
                    {authUser && (
                        <>
                            <IconButton color="inherit" href="/profile">
                                <AccountCircle />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                onClick={() => {
                                    app.auth().signOut();
                                }}
                            >
                                <ExitToApp />
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
