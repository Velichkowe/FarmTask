import React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Buttons = ({ user, selectedEmployee }) => {
    const history = useHistory();

    const handleCreateEmployeeClick = () => {
        history.push('/createEmployee', user);
    }

    const handleShowEmployeeInfo = () => {
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