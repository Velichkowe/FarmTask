import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import { CREATE_NEW_MACHINE_TRAKTOR } from '../../constants/gqlMachineConstants';
import { UPDATE_MACHINE_TRAKTOR } from '../../constants/gqlMachineConstants';
const ADD_NEW_MACHINE_ERROR = 'There was an error adding this machine !';
const ADD_NEW_MACHINE_SUCCESS = 'Machine is added successfully !';
const UPDATE_MACHINE_ERROR = 'There was an error updating this machine !';
const UPDATE_MACHINE_SUCCESS = 'Machine is updated successfully !';

const TraktorForm = (props)  => {
    const { selectedMachineType, selectedFarm, machine } = props;
    const [addNewMachine] = useMutation(CREATE_NEW_MACHINE_TRAKTOR, {
        onCompleted(data) {
            if(!data) {
                loadToastError(ADD_NEW_MACHINE_ERROR);
            } else {
                loadToastSuccess(ADD_NEW_MACHINE_SUCCESS);
            }
        }
    });

    const [updateMachine] = useMutation(UPDATE_MACHINE_TRAKTOR, {
        onCompleted(data) {
            if(!data.updateMachine) {
                loadToastError(UPDATE_MACHINE_ERROR);
            } else {
                loadToastSuccess(UPDATE_MACHINE_SUCCESS);
            }
        }
    });
    
    const [name, setName] = useState(machine ? machine.name : '');
    const [maxLiftCapacity, setMaxLiftCapacity] = useState(machine.maxLiftCapacity ? machine.maxLiftCapacity : '');
    const [maxHp, setMaxHp] = useState(machine.maxHp ? machine.maxHp : '');
    const [transmission, setTransmission] = useState(machine.transmission ? machine.transmission : '');
    const [engine, setEngine] = useState(machine.engine ? machine.engine : '');
    const [errors, setErrors] = useState({});

    const handleSaveClick = () => {
        let fieldErrors = {};

        checkEmptyFields(fieldErrors);

        if(Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);

            return;
        }

        addNewMachine({
            variables: {
                name,
                maxLiftCapacity: parseInt(maxLiftCapacity),
                maxHp: parseInt(maxHp),
                transmission: transmission,
                engine: engine,
                machineTypeId: parseInt(selectedMachineType.id),
                farmId: parseInt(selectedFarm.id)
            }
        })
    }

    const checkEmptyFields = (fieldErrors) => {
        if(!name) {
            fieldErrors.name = "Please add name"
        }

        if(!maxLiftCapacity) {
            fieldErrors.maxLiftCapacity = "Please add Max lift capacity"
        }

        if(!maxHp) {
            fieldErrors.maxHp = "Please add max Horse Powers (HP)"
        }

        if(!transmission) {
            fieldErrors.transmission = "Please add transmission"
        }

        if(!engine) {
            fieldErrors.engine = "Please add engine"
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
                maxLiftCapacity: parseInt(maxLiftCapacity),
                maxHp: parseInt(maxHp),
                transmission: transmission,
                engine: engine,
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
                    className={`form__input-field ${errors.maxLiftCapacity && 'is-invalid'}`}
                    placeholder="Max lift capacity"
                    type="text"
                    value={maxLiftCapacity}
                    onChange={(e) => setMaxLiftCapacity(e.target.value)}
                />

                <Form.Control
                    className={`form__input-field ${errors.maxHp && 'is-invalid'}`}
                    placeholder="Max HP"
                    type="text"
                    value={maxHp}
                    onChange={(e) => setMaxHp(e.target.value)}
                />

                <Form.Control
                    className={`form__input-field ${errors.transmission && 'is-invalid'}`}
                    placeholder="Transmission"
                    type="text"
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                />

                <Form.Control
                    className={`form__input-field ${errors.engine && 'is-invalid'}`}
                    placeholder="Engine"
                    type="text"
                    value={engine}
                    onChange={(e) => setEngine(e.target.value)}
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

export default TraktorForm;
