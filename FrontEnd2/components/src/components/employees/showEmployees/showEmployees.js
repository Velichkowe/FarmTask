import React, { useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Buttons from './buttons';
import CreateEmployee from '../createEmployee/createEmployee';
import UpdateEmployee from '../updateEmployee/updateEmployee';
import EmployeeRows from '../employeeRows/employeeRows';
import EmployeeInformation from '../employeeInformation/employeeInformation'

import { Col, Table } from 'react-bootstrap';
import './showEmployees.css';

import { GET_ALL_EMPLOYEES_BY_USER_ID } from '../../constants/gqlEmployeeConstants';
import { GET_LOGGED_USER } from '../../constants/gqlUserConstants';

const ShowEmployees = () => {
    const [user, setUser] = useState();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({
        id: -1,
        name: ''
    })
    
    const [getAllEmployeesByUserId] = useLazyQuery(GET_ALL_EMPLOYEES_BY_USER_ID, {
        onCompleted(data) {
            setEmployees(data.allEmployeesByUserId);
        },
        fetchPolicy: 'network-only'
    });

    useQuery(GET_LOGGED_USER, {
        onCompleted(data) {
            setUser(data.getLoggedUser);

            getAllEmployeesByUserId({
                variables: {
                    userId: parseInt(data.getLoggedUser.id)
                },
            })
        },
        fetchPolicy: 'network-only'
    });
    
    const handleSelectRow = (employee) => {
        setSelectedEmployee(employee);
    }

    return (
        <BrowserRouter>
            <Col sm={4} md={4} lg={4} className="margin-top">
                <div className="show__employees">
                    <h1>ShowEmployees component</h1>

                    <div className="table__employees">
                        <Table striped hover responsive className="table--background">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>

                            <tbody>
                                {employees.map((elem, idx) => {
                                    return (
                                        <EmployeeRows 
                                            key={idx} 
                                            elem={elem}
                                            handleSelectRow={handleSelectRow}
                                        />
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    
                    <div>
                        <p>Selected employee: {selectedEmployee.firstName}</p>
                    </div>

                    <Buttons user={user} selectedEmployee={selectedEmployee} />
                </div>
            </Col>

            <Switch>
                <Route exact path="/createEmployee" component={CreateEmployee} />
                <Route exact path="/showEmployeeInfo" component={EmployeeInformation} />
                <Route exact path="/updateEmployeeInfo" component={UpdateEmployee} />
            </Switch>
        </BrowserRouter>
    )
}

export default ShowEmployees;