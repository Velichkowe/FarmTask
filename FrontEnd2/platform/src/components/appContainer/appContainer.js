import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../header/header';
import { getRoutes } from '../../helpers/routes/routes';
import { Routes } from '../../helpers/routeManager/routeManager';
import LeftSideBar from '../leftSidebar/leftSideBar';
import './appContainer.css';
import { Col } from 'react-bootstrap';

const GET_LOGGED_USER = gql`
    query getLoggedUser {
        getLoggedUser {
            id firstName lastName email role {
                name
            }
        }
    }
`;

const AppContainer = () => {
    const { loading, data } = useQuery(GET_LOGGED_USER, {
        fetchPolicy: 'network-only',
    });

    const [routes, setRoutes] = useState();

    useEffect(() => {
        const routes = getRoutes();
		setRoutes(routes);
    }, [])
    
    if(loading) {
        return (
            <div>
                <p>Loading data !</p>
            </div>
        )
    }
    
    const user = data.getLoggedUser;
    const roleName = user.role.name;
    
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Header user={user} />
            
            <Col sm={12} md={12} lg={12} className="app__container--margin">
                <BrowserRouter>
                    <div className="main">
                        <LeftSideBar
                            isAdmin={roleName === 'admin' ? true : false}
                            user={user}
                        />

                        <Switch>
                            <Routes routes={routes} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Col>
        </div>
    )
}

export default AppContainer;
