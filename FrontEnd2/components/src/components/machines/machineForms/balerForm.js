import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import { CREATE_NEW_MACHINE_BALER } from '../../constants/gqlMachineConstants';
import { UPDATE_MACHINE_BALER } from '../../constants/gqlMachineConstants';
const ADD_NEW_MACHINE_ERROR = 'There was an error adding this machine !';
const ADD_NEW_MACHINE_SUCCESS = 'Machine is added successfully !';
const UPDATE_MACHINE_ERROR = 'There was an error updating this machine !';
const UPDATE_MACHINE_SUCCESS = 'Machine is updated successfully !';

const BalerForm = (props) => {
    const { selectedMachineType, selectedFarm, machine } = props;
    const [addNewMachine] = useMutation(CREATE_NEW_MACHINE_BALER, {
        onCompleted(data) {
            if(!data) {
                loadToastError(ADD_NEW_MACHINE_ERROR);
            } else {
                loadToastSuccess(ADD_NEW_MACHINE_SUCCESS);
            }
        }
    });

    const [updateMachine] = useMutation(UPDATE_MACHINE_BALER, {
        onCompleted(data) {
            if(!data.updateMachine) {
                loadToastError(UPDATE_MACHINE_ERROR);
            } else {
                loadToastSuccess(UPDATE_MACHINE_SUCCESS);
            }
        }
    });

    const [name, setName] = useState(machine.name ? machine.name : '');
    const [pickUpWidth, setPickUpWidth] = useState(machine.pickUpWidth ? machine.pickUpWidth : '');
    const [maxHp, setMaxHp] = useState(machine.maxHp ? machine.maxHp : '');
    const [plungerSpeed, setPlungerSpeed] = useState(machine.plungerSpeed ? machine.plungerSpeed : '');
    const [errors, setErrors] = useState({});

    const handleSaveClick = () => {
        let fieldErrors = {};

        checkFields(fieldErrors);

        if(Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);

            return;
        }

        addNewMachine({
            variables: {
                name,
                pickUpWidth: parseInt(pickUpWidth),
                maxHp: parseInt(maxHp),
                plungerSpeed: parseFloat(plungerSpeed),
                machineTypeId: parseInt(selectedMachineType.id),
                farmId: parseInt(selectedFarm.id)
            }
        })
    }

    const checkEmptyFields = (fieldErrors) => {
        if(!name) {
            fieldErrors.name = "Please add name"
        }

        if(!pickUpWidth) {
            fieldErrors.pickUpWidth = "Please add Pick up width"
        }

        if(!maxHp) {
            fieldErrors.maxHp = "Please add max Horse Powers (HP)"
        }

        if(!plungerSpeed) {
            fieldErrors.plungerSpeed = "Please add Plunger speed"
        }
    }

    const handleUpdateClick = () => {
        let fieldErrors = {};
        
        checkEmptyFields(fieldErrors);

        if(Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);

            return;
        }

        updateMachine({
            variables: {
                id: parseInt(machine.id),
                name,
                pickUpWidth: parseInt(pickUpWidth),
                maxHp: parseInt(maxHp),
                plungerSpeed: parseFloat(plungerSpeed),
                machineTypeId: parseInt(selectedMachineType.id),
                farmId: parseInt(machine.farmId)
            }
        });
    }

    return (
        <>
            <Form.Group>
                <Form.Control
                    className={`form__input-field ${errors.name && 'is-invalid'}`}
                    placeholder="Machine name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Form.Control
                    className={`form__input-field ${errors.pickUpWidth && 'is-invalid'}`}
                    placeholder="Pick up width"
                    type="text"
                    value={pickUpWidth}
                    onChange={(e) => setPickUpWidth(e.target.value)}
                />

                <Form.Control
                    className={`form__input-field ${errors.maxHp && 'is-invalid'}`}
                    placeholder="Max HP"
                    type="text"
                    value={maxHp}
                    onChange={(e) => setMaxHp(e.target.value)}
                />

                <Form.Control
                    className={`form__input-field ${errors.plungerSpeed && 'is-invalid'}`}
                    placeholder="Plunger speed"
                    type="text"
                    value={plungerSpeed}
                    onChange={(e) => setPlungerSpeed(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <div>
                    {!machine ?
                        <Button variant="primary" onClick={() => handleSaveClick()}>Save Machine</Button>
                        :
                        <Button variant="primary" onClick={() => handleUpdateClick()}>Update Machine</Button>
                    }
                </div>
            </Form.Group>
        </>
    )
}

export default BalerForm;
