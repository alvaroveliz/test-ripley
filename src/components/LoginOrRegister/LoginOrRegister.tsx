import React, { useState } from 'react';
import { Grid, Paper, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import Login from '../Login';
import Register from '../Register';

const LoginOrRegister: React.FC = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <div className="">
            <Grid container justify="center" alignItems="center">
                <Grid item lg={5} xs={12}>
                    <Paper square>
                        <AppBar position="static" color="default">
                            <Tabs
                                variant="fullWidth"
                                value={currentTab}
                                onChange={handleChangeTab}
                                indicatorColor="primary"
                                centered
                            >
                                <Tab label="Ingresar" />
                                <Tab label="Nuevo usuario" />
                            </Tabs>
                        </AppBar>
                        {currentTab === 0 && (
                            <Box p={3}>
                                <Login></Login>
                            </Box>
                        )}
                        {currentTab === 1 && (
                            <Box p={3}>
                                <Register></Register>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginOrRegister;
