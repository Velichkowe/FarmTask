import React from 'react';
import { useQuery } from '@apollo/client';

import { Button, Col, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

import GET_ALL_USERS from '../../requests/getAllUsers';

const  Header = ({ showUsers }) => {
    // const { data } = useQuery(GET_ALL_USERS);

	return (
        <Row>
            <Col sm={12} md={12} lg={12} className="header">
                <Col sm={11} md={11} lg={11} className="header__inner">
                    <div className="nav-bar">
                        <nav>
                            <ul className="nav__options">
                                <li>
                                    <a href="#">Test link</a>
                                </li>
                                <li>
                                    <a href="#">Option 2</a>
                                </li>
                                <li>
                                    <a href="#">Option 3</a>
                                </li>
                                <li>
                                    <a href="#">Option 4</a>
                                </li>
                                <li>
                                    <a href="#">Option 5</a>
                                </li>
                            </ul>
                        </nav>

                        <nav className="nav__admin">
                            <ul className="nav__options nav__admin--right">
                                <li>
                                    <a href="/showUsers">Show All Users</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Col>
            </Col>
        </Row>
    );
};
            
export  default  Header;