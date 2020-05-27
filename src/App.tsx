import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { AuthProvider } from './providers/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import ProductCard from './components/ProductCard';
import Profile from './components/Profile';
import LoginOrRegister from './components/LoginOrRegister';

const App: React.FC = () => {
    return (
        <div className="App">
            <AuthProvider>
                <CssBaseline />
                <Layout>
                    <Router>
                        <PrivateRoute exact path="/" component={ProductList} />
                        <PrivateRoute exact path="/:id/view" component={ProductCard} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <Route exact path="/login" component={LoginOrRegister} />
                    </Router>
                </Layout>
            </AuthProvider>
        </div>
    );
};

export default App;
