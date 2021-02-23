import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import { CREATE_NEW_MACHINE_COMBINE } from '../../constants/gqlMachineConstants';
import { UPDATE_MACHINE_COMBINE } from '../../constants/gqlMachineConstants';
const ADD_NEW_MACHINE_ERROR = 'There was an error adding this machine !';
const ADD_NEW_MACHINE_SUCCESS = 'Machine is added successfully !';
const UPDATE_MACHINE_ERROR = 'There was an error updating this machine !';
const UPDATE_MACHINE_SUCCESS = 'Machine is updated successfully !';

const CombineForm = (props) => {
    const { selectedMachineType, selectedFarm, machine } = props;
    const [addNewMachine] = useMutation(CREATE_NEW_MACHINE_COMBINE, {
        onCompleted(data) {
            if(!data.addMachine) {
                loadToastError(ADD_NEW_MACHINE_ERROR);
            } else {
                loadToastSuccess(ADD_NEW_MACHINE_SUCCESS);
            }
        }
    });

    const [updateMachine] = useMutation(UPDATE_MACHINE_COMBINE, {
        onCompleted(data) {
            if(!data.updateMachine) {
                loadToastError(UPDATE_MACHINE_ERROR);
            } else {
                loadToastSuccess(UPDATE_MACHINE_SUCCESS);
            }
        }
    });

    const [name, setName] = useState(machine.name ? machine.name : '');
    const [grainTankCapacity, setGrainTankCap] = useState(machine.grainTankCapacity ? machine.grainTankCapacity : '');
    const [maxHp, setMaxHp] = useState(machine.maxHp ? machine.maxHp : '');
    const [maxCutWidth, setMaxCutWidth] = useState(machine.maxCutWidth ? machine.maxCutWidth : '');
    const [unloadingSpeed, setUnloadingSpeed] = useState(machine.unloadingSpeed ? machine.unloadingSpeed: '');
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
                grainTankCapacity: parseInt(grainTankCapacity),
                maxHp: parseInt(maxHp),
                maxCutWidth: parseFloat(maxCutWidth),
                unloadingSpeed: parseInt(unloadingSpeed),
                machineTypeId: parseInt(selectedMachineType.id),
                farmId: parseInt(selectedFarm.id)
            }
        });
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
                name,
                grainTankCapacity: parseInt(grainTankCapacity),
                maxHp: parseInt(maxHp),
                maxCutWidth: parseFloat(maxCutWidth),
                unloadingSpeed: parseInt(unloadingSpeed),
                machineTypeId: parseInt(selectedMachineType.id),
                farmId: parseInt(machine.farmId),
                id: parseInt(machine.id)
            }
        });
    }

    const checkEmptyFields = (fieldErrors) => {
        if(!name) {
            fieldErrors.name = "Please add name"
        }

        if(!grainTankCapacity) {
            fieldErrors.grainTankCapacity = "Please add Grain capacity"
        }

        if(!maxHp) {
            fieldErrors.maxHp = "Please add max Horse Powers (HP)"
        }

        if(!maxCutWidth) {
            fieldErrors.maxCutWidth = "Please add maximum cutting width"
        }

        if(!unloadingSpeed) {
            fieldErrors.unloadingSpeed = "Please add unloading speed"
        }
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
                    className={`form__input-field ${errors.grainTankCapacity && 'is-invalid'}`}
                    placeholder="Grain Tank Capacity - litre"
                    type="number"
                    value={grainTankCapacity}
                    onChange={(e) => setGrainTankCap(e.target.value)}
                />
                <Form.Control
                    className={`form__input-field ${errors.maxHp && 'is-invalid'}`}
                    placeholder="Max HP"
                    type="number"
                    value={maxHp}
                    onChange={(e) => setMaxHp(e.target.value)}
                />
                <Form.Control
                    className={`form__input-field ${errors.maxCutWidth && 'is-invalid'}`}
                    placeholder="Max Cutting Width - meter"
                    type="number"
                    value={maxCutWidth}
                    onChange={(e) => setMaxCutWidth(e.target.value)}
                />
                <Form.Control
                    className={`form__input-field ${errors.unloadingSpeed && 'is-invalid'}`}
                    placeholder="Unloading Speed - litre/second"
                    type="number"
                    value={unloadingSpeed}
                    onChange={(e) => setUnloadingSpeed(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <div>
                    {Object.keys(machine).length === 0 ?
                        <Button variant="primary" onClick={() => handleSaveClick()}>Save Machine</Button>
                        :
                        <Button variant="primary" onClick={() => handleUpdateClick()}>Update Machine</Button>
                    }
                </div>
            </Form.Group>
        </>
    )
}

export default CombineForm;
