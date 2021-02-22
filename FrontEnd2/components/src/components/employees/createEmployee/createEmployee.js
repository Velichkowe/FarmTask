import React, { useState } from 'react';

import { Button, Col, Form } from 'react-bootstrap';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';

import { CREATE_EMPLOYEE } from '../../constants/gqlEmployeeConstants';
import { useMutation } from '@apollo/client';
const EMPTY_FIELD_ERROR = "Please fill all empty fields !";
const CREATE_EMPLOYEE_ERROR = "Employee could not be created";
const CREATE_EMPLOYEE_SUCCESS = "Employee has been created successfully";

const CreateEmployee = (props) => {
    const { location: { state }} = props;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [salary, setSalary] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
        onCompleted(data) {
            if(!data.addEmployee.employee) {
                loadToastError(CREATE_EMPLOYEE_ERROR);
                setErrors(JSON.parse(data.addEmployee.errors));
            }
            else {
                loadToastSuccess(CREATE_EMPLOYEE_SUCCESS);
                setErrors({});
                
            }
        }
    })

    const handleCreateEmployee = () => {
        const err = {};

        checkFields(err);

        if(Object.keys(err).length > 0) {
            loadToastError(EMPTY_FIELD_ERROR);
            setErrors(err);

            return;
        }

        createEmployee({
            variables: {
                userId: parseInt(state.id),
                firstName,
                lastName,
                email,
                address,
                number,
                salary: parseInt(salary),
                password,
                confirmPassword
            }
        });
    }

    const checkFields = (fieldErrors) => {
        if(!firstName) {
            fieldErrors.firstName = "Empty";
        }

        if(!lastName) {
            fieldErrors.lastName = "Empty";
        }

        if(!email) {
            fieldErrors.email = "Empty";
        }

        if(!address) {
            fieldErrors.address = "Empty";
        }

        if(!number) {
            fieldErrors.number = "Empty";
        }

        if(!salary) {
            fieldErrors.salary = "Empty";
        }

        if(!password) {
            fieldErrors.password = "Empty";
        }

        if(!confirmPassword) {
            fieldErrors.confirmPassword = "Empty";
        }
    }

    return (
        <Col sm={7} md={7} lg={7}>
            <div className="field__component"> 
                <h1>Create Employee component</h1>

                <Form>
                    <Form.Group>
                        <Form.Control 
                            className={`${errors.firstName && 'is-invalid'}`}
                            placeholder="First Name"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.lastName && 'is-invalid'}`}
                            placeholder="Last Name"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.email && 'is-invalid'}`}
                            placeholder="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.address && 'is-invalid'}`}
                            placeholder="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.number && 'is-invalid'}`}
                            placeholder="Number"
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.salary && 'is-invalid'}`}
                            placeholder="Salary"
                            type="text"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.password && 'is-invalid'}`}
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control 
                            className={`${errors.confirmPassword && 'is-invalid'}`}
                            placeholder="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <div>
                        <Button onClick={() => handleCreateEmployee()}>Create employee</Button>
                    </div>
                </Form>
            </div>
        </Col>
    )
}

export default CreateEmployee;
