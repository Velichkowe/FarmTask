import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './loginPage.css';

import { AUTH_TOKEN } from '../constants/constants';

const LOGIN_USER = gql`
     mutation login(
         $email: String!
         $password: String!
     ) {
        login(
            email: $email
            password: $password
        ) {
            token errors
        }
     }
`;

const Login = () => {
    const [login, { loading }] = useMutation(LOGIN_USER, {
        onError(err) {
            console.log('--------', err)
        },
        onCompleted({ login }) {
            if(login.errors) {
                const errors = JSON.parse(login.errors);
                setErrors(errors);
            }
            else {
                localStorage.setItem(AUTH_TOKEN, login.token);
                history.push('/appContainer');
            }
        }
    });

    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();
        login({
            variables: {
                email,
                password
            }
        })
    }

    return (
        <div className="container">
            <Col sm={12} md={12} lg={12}>
                <div className="login__form">
                    <h1>Login</h1>

                    <Form onSubmit={loginUser}>
                        <Form.Group className="form__group">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip>
                                        {errors.email ? errors.email : "Please fill your email address !"}
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id="email"
                                    className={`
                                        form__control-input
                                        ${errors.email && 'is-invalid'}    
                                    `}
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Form.Group>                     

                        <Form.Group className="form__group">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip>
                                        {errors.password ? errors.password : "Please fill your Password !"}
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id="password"
                                    className={`
                                        form__control-input
                                        ${errors.password && 'is-invalid'}    
                                    `}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Form.Group>

                        <div className="form__actions">
                            <Button 
                                variant="primary" 
                                type="submit"
                                disabled={loading}
                            >
                                {"Log In"}
                            </Button>
                        </div>

                        <div>
                            <p>If you don't have an account: <button className="register__link" onClick={() => history.push('/register')}>Register</button></p>
                        </div>

                        <div className="error-message">
                            <p>{errors.notApproved ? errors.notApproved : ''}</p>
                        </div>
                    </Form>
                </div>
            </Col>
        </div>
    )
}

export default Login;
