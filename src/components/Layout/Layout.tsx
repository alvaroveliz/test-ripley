import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Header from '../Header';
import classes from './layout.module.scss';

interface Props {}

const Layout: React.FC<Props> = (props) => {
    return (
        <div className={classes.layout}>
            <Header></Header>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Layout;
