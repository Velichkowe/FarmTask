import React, { useState } from 'react';

import { Button, Col, Form } from 'react-bootstrap';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';

import { UPDATE_EMPLOYEE } from '../../constants/gqlEmployeeConstants';
import { useMutation } from '@apollo/client';
const EMPTY_FIELD_ERROR = "Please fill all empty fields !";
const UPDATE_EMPLOYEE_ERROR = "Employee could not be updated";
const UPDATE_EMPLOYEE_SUCCESS = "Employee has been updated successfully";

const UpdateEmployee = (props) => {
    const { location: { state }} = props;
    const [firstName, setFirstName] = useState(state ? state.firstName : '');
    const [lastName, setLastName] = useState(state ? state.lastName : '');
    const [email, setEmail] = useState(state ? state.email : '');
    const [address, setAddress] = useState(state ? state.address : '');
    const [number, setNumber] = useState(state ? state.number : '');
    const [salary, setSalary] = useState(state ? state.salary : '');
    const [errors, setErrors] = useState({});
    
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        onCompleted(data) {
            if(!data.updateEmployee) {
                loadToastError(UPDATE_EMPLOYEE_ERROR);
            }
            else {
                loadToastSuccess(UPDATE_EMPLOYEE_SUCCESS);
            }
        }
    })

    const handleUpdateEmployee = () => {
        const err = {};

        checkFields(err);

        if(Object.keys(err).length > 0) {
            loadToastError(EMPTY_FIELD_ERROR);
            setErrors(err);

            return;
        }

        updateEmployee({
            variables: {
                id: parseInt(state.id),
                firstName,
                lastName,
                email,
                address,
                number,
                salary: parseInt(salary),
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
    }

    return (
        <Col sm={5} md={5} lg={5}>
             <div className="field__component"> 
                 <h1>Update Employee information</h1>

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

                    <div>
                        <Button onClick={() => handleUpdateEmployee()}>Update information</Button>
                    </div>
                </Form>
            </div>
        </Col>
    )
}

export default UpdateEmployee;
