import React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { loadToastError } from '../../loadToast/loadToast';

const NO_SELECTED_EMPLOYEE_ERROR = 'Please select an employee first';

const Buttons = ({ user, selectedEmployee }) => {
    const history = useHistory();

    const handleCreateEmployeeClick = () => {
        history.push('/createEmployee', user);
    }

    const handleShowEmployeeInfo = () => {
        if(selectedEmployee.id === -1) {
            loadToastError(NO_SELECTED_EMPLOYEE_ERROR);

            return;
        }

        history.push('/showEmployeeInfo', selectedEmployee);
    }

    return (
        <div>
            <Button 
                className="action-btn"
                onClick={() => handleCreateEmployeeClick()}
            >
                Create New Employee
            </Button>
            
            <Button
                className="action-btn" 
                onClick={() => handleShowEmployeeInfo()}
            >
                Show employee info
            </Button>
        </div>
    )
}

export default Buttons;