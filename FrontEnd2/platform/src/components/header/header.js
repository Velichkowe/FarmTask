import React from 'react';
import { useHistory } from "react-router-dom";

import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';

const  Header = (props) => {
    const { user } = props;
    let history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.push('/login');
    }

	return (
        <Row>
            <Col sm={12} md={12} lg={12} className="header">
                <Col sm={10} md={10} lg={10} className="header__inner margin--auto">
                    <div className="nav-bar">
                        <div className="header__welcome-greeting">
                            <p>Welcome to Farm Checker, {user.firstName[0] + '. ' + user.lastName}</p>
                        </div>

                        <nav className="nav__logout">
                            <ul className="nav__options nav--right">
                                <button className="logout__btn" onClick={logout}>Log out</button>
                            </ul>
                        </nav>
                    </div>
                </Col>
            </Col>
        </Row>
    );
};
            
export  default  Header;