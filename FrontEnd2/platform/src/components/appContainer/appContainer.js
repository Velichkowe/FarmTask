import { gql, useLazyQuery, useQuery } from '@apollo/client';
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
            id firstName lastName email roleId userId
        }
    }
`;

const GET_ROLE_BY_ID = gql`
    query getRoleById(
        $id: ID!
    ) {
        getRoleById(
            id: $id
        ) {
            id name
        }
    }
`;

const AppContainer = () => {
    const [user, setUser] = useState();
    const [role, setRole] = useState();

    const [getRole] = useLazyQuery(GET_ROLE_BY_ID, {
        onCompleted(data) {
            setRole(data.getRoleById)

        },
        fetchPolicy: "network-only"
    })

    useQuery(GET_LOGGED_USER, {
        onCompleted(data) {
            setUser(data.getLoggedUser);

            getRole({
                variables: {
                    id: data.getLoggedUser.roleId
                }
            })
        },
        fetchPolicy: 'network-only',
    });

    const [routes, setRoutes] = useState();

    useEffect(() => {
        const routes = getRoutes();
		setRoutes(routes);
    }, [])

    if(!user || !role) {
        return (
            <div>
                <p>Loading data !</p>
            </div>
        )
    }

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
                            role={role}
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
