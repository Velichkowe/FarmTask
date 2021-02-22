import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const MachineActions = ({ selectedFarm }) => {
    const history = useHistory();
    const handleAddMachineClick = () => {
        if(selectedFarm.id === -1) {
            toast.error('Select a farm first !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;
        }

        history.push('/createMachine', selectedFarm)
    }

    const handleShowMachinesClick = () => {
        if(selectedFarm.id === -1) {
            toast.error('Select a farm first !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;
        }

        history.push('/machines', selectedFarm)
    }

    return (
        <>
            <Button 
                variant="primary"
                className="action__btn"
                onClick={() => handleAddMachineClick()}
            >
                Add Machine
            </Button>
            
            <Button 
                variant="primary"
                className="action__btn"
                onClick={() => handleShowMachinesClick()}
            >
                Show Machines
            </Button>
        </>
    )
}

export default MachineActions;