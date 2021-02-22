import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './registerPage.css';

const REGISTER = gql`
    mutation register(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        ) {
            user {
                firstName lastName
            }
            errors
        }
    }
`;

const Register = () => {
    const [register, { loading }] = useMutation(REGISTER, {
        onError(err) {
            // setErrors(err.graphQLErrors[0].extensions.errors);
            // console.log('+++', JSON.parse(err));
        },
        onCompleted({ register }) {
            if(register.errors) {
                console.log(register)
                const errors = JSON.parse(register.errors);
                setErrors(errors);
            }
            else {
                console.log('++++++++', register.user.firstName)
                history.push('/login');
            }
        }
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    let history = useHistory();

    const registerUser = (e) => {
        e.preventDefault()
        // console.log('register pressed')
        register({
            variables: {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            }
        });
    }

    return (
        <div className="container">
            <Col sm={12} md={12} lg={12}>
                <div className="register__form">
                    <h1>Register</h1>

                    <Form onSubmit={registerUser}>
                        <Form.Group className="form__group">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip>
                                        {errors.firstName ? errors.firstName : "Please fill your first name!"}
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id="firstName"
                                    className={`
                                        form__control-input
                                        ${errors.firstName && 'is-invalid'}    
                                    `}
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Form.Group>


                        <Form.Group className="form__group">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip>
                                        {errors.lastName ? errors.lastName : "Please fill your last name!"}
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id="lastName"
                                    className={`
                                        form__control-input
                                        ${errors.lastName && 'is-invalid'}    
                                    `}
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Form.Group>

                        <Form.Group className="form__group">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip>
                                        {errors.email ? errors.email : "Please fill your email address."}
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
                                        {errors.password ? errors.password : <strong>Please fill your password.</strong>}
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
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Form.Group> 

                        <Form.Group className="form__group">
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip>
                                        {errors.password ? errors.password : "Please fill your password again."}
                                    </Tooltip>
                                }
                            >
                                <Form.Control
                                    id="confirmPassword"
                                    className={`
                                        form__control-input
                                        ${errors.password && 'is-invalid'}    
                                    `}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </OverlayTrigger>
                        </Form.Group>

                        <div className="form__actions">
                            <Button 
                                variant="primary"  
                                type="submit"
                                disabled={loading}
                            >
                                {"Register"}
                            </Button>
                        </div>

                        <div>
                            <p>If you already have an account: <button className="login__link" onClick={() => history.push('/login')}>Login</button></p>
                        </div>
                    </Form>
                </div>
            </Col>
        </div>
    )
}

export default Register;