import React from 'react';
import { Grid, Typography, Paper, Box, Link } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import me from '../../assets/images/me.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        me: {
            height: 200,
            marginRight: 20,
        },
        profileHeader: {
            display: 'flex',
            verticalAlign: 'middle',
        },
        back: {
            display: 'flex',
            justifyContent: 'center',
        },
        '@media (max-width: 960px)': {
            me: {
                width: '100%',
                height: 'auto',
            },
            profileHeader: {
                flexDirection: 'column',
            },
        },
    }),
);

const Profile: React.FC = (): React.ReactElement => {
    const classes = useStyles();

    return (
        <>
            <Grid container justify="center">
                <Grid item lg={8} xs={12}>
                    <Paper>
                        <Box p={4}>
                            <div className={classes.profileHeader}>
                                <img src={me} className={classes.me} alt="It's me..." />
                                <Typography variant="h2" gutterBottom>
                                    <Box fontWeight="bold">Hola, soy Álvaro Véliz</Box>
                                </Typography>
                            </div>
                            <Typography variant="subtitle1" gutterBottom>
                                Ingeniero Informático Senior con más de 10 años de experiencia en desarrollo Front-end,
                                Back-end y aplicaciones SaaS. Actualmente trabajo en{' '}
                                <Link href="https://viajesfalabella.cl">Viajes Falabella by Despegar</Link> como
                                Ingeniero de Desarrollo, y me reencanté con las{' '}
                                <abbr title="React, Node, TypeScript, entre otras">nuevas tecnologías</abbr>. He vuelto
                                con el <Link href="https://alvaroveliz.cl">blog</Link> y a veces hago un{' '}
                                <Link href="https://open.spotify.com/show/2ovzcF7Cz5hvJqPkmuuz67">podcast</Link> con un
                                amigo. Mis amigos y cercanos también me conocen como{' '}
                                <Link href="https://mixcloud.com/thisperso">DJ thisperso</Link>.
                            </Typography>
                        </Box>
                    </Paper>
                    <Box p={2} className={classes.back}>
                        <Link href="/">Volver al catálogo</Link>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default Profile;
