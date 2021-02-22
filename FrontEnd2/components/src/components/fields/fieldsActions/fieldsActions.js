import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import { loadToastError } from '../../loadToast/loadToast';
const NO_FARM_SELECTED = 'Select a farm first !'; 

const FieldActions = ({ selectedFarm }) => {
    const history = useHistory();

    const handleCreateFieldClick = () => {
        if(selectedFarm.id === -1) {
            loadToastError(NO_FARM_SELECTED);

            return;
        }

        history.push('/createField', selectedFarm)
    }

    const handleShowFieldsClick = () => {
        if(selectedFarm.id === -1) {
            loadToastError(NO_FARM_SELECTED);

            return;
        }

        history.push('/fields', selectedFarm)
    }

    return (
        <>
            <Button
                className="field__action-btn"
                variant="primary"
                onClick={() => handleCreateFieldClick()}
            >
                Create Field
            </Button>
            
            <Button
                className="field__action-btn"
                variant="primary"
                onClick={() => handleShowFieldsClick()}
            >
                Show Fields
            </Button>
        </>
    )
}

export default FieldActions;
