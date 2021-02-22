import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Test1234 from '../../components/test';

import Login from '../../components/loginPage/loginPage';
// import Header from '../../components/header/header';
// const LoginPage = React.lazy(() => import("components/loginPage"));
// import Register from '../../components/registerPage/registerPage';
// import AppContainer from '../../components/appContainer/appContainer';

export const Routes = ({ routes }) => {
    return (
        <Switch>
            {routes}

            {/* <Route exact path='/login' component={Login} /> */}
            {/* <Route path="/test" component={Test1234} /> */}

        </Switch>
    )
}