import { useMutation } from '@apollo/client';
import React from 'react';
import { Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { DELETE_EMPLOYEE } from '../../constants/gqlEmployeeConstants';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
const DELETE_EMPLOYEE_ERROR = 'Employee could not be deleted !';
const DELETE_EMPLOYEE_SUCCESS = 'Employee is deleted successfully !';

const EmployeeInformation = (props) => {
    const history = useHistory();
    const { location: { state }} = props;

    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        onCompleted(data) {
            if(!data.deleteEmployee) {
                loadToastError(DELETE_EMPLOYEE_ERROR);
            } else {
                loadToastSuccess(DELETE_EMPLOYEE_SUCCESS);
            }
        }
    })

    const handleEditInfo = () => {
        history.push('/updateEmployeeInfo', state);
    }

    const handleDeleteEmployee = () => {
        deleteEmployee({
            variables: {
                id: parseInt(state.id)
            }
        });
    }

    return (
        <Col sm={5} md={5} lg={5}>
            <div className="field__component field__component--margin">
                <h1>{state.firstName + '\'s information'}</h1>
                <p>{'First name: ' + state.firstName}</p>
                <p>{'Last name: ' + state.lastName}</p>
                <p>{'Email: ' + state.email}</p>
                <p>{'Address: ' + state.address}</p>
                <p>{'Number: ' + state.number}</p>
                <p>{'Salary: ' + state.salary}</p>
            </div>

            <div>
                <Button className="employee__info--btn" onClick={() => handleEditInfo()}>Edit Information</Button>

                <Button className="employee__info--btn" onClick={() => handleDeleteEmployee()}>Delete Employee</Button>
            </div>
        </Col>
    )
}

export default EmployeeInformation;