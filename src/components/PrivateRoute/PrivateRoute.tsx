import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthUserContext } from '../../providers/AuthProvider';

interface Props extends RouteProps {
    component?: any;
}

const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, ...rest }) => {
    const { authUser } = useContext(AuthUserContext);

    return (
        <Route
            {...rest}
            render={(routeProps) => (!!authUser ? <RouteComponent {...routeProps} /> : <Redirect to={'/login'} />)}
        />
    );
};

export default PrivateRoute;
