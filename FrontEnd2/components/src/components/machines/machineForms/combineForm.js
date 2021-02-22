import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import { CREATE_NEW_MACHINE_COMBINE } from '../../constants/gqlMachineConstants';
const ADD_NEW_MACHINE_ERROR = 'There was an error adding this machine !';
const ADD_NEW_MACHINE_SUCCESS = 'Machine is added successfully !';

const CombineForm = ( {selectedMachineType, selectedFarm} ) => {
    const [addNewMachine] = useMutation(CREATE_NEW_MACHINE_COMBINE, {
        onCompleted(data) {
            if(!data) {
                loadToastError(ADD_NEW_MACHINE_ERROR);
            } else {
                loadToastSuccess(ADD_NEW_MACHINE_SUCCESS);
            }
        }
    });

    const [name, setName] = useState('');
    const [grainTankCap, setGrainTankCap] = useState('');
    const [maxHp, setMaxHp] = useState('');
    const [maxCutWidth, setMaxCutWidth] = useState('');
    const [unloadingSpeed, setUnloadingSpeed] = useState('');
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
                grainTankCap: parseInt(grainTankCap),
                maxHp: parseInt(maxHp),
                maxCutWidth: parseFloat(maxCutWidth),
                unloadingSpeed: parseInt(unloadingSpeed),
                machineTypeId: parseInt(selectedMachineType.id),
                farmId: parseInt(selectedFarm.id)
            }
        });
    }

    const checkEmptyFields = (fieldErrors) => {
        if(!name) {
            fieldErrors.name = "Please add name"
        }

        if(!grainTankCap) {
            fieldErrors.grainTankCap = "Please add Grain capacity"
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
                    className={`form__input-field ${errors.grainTankCap && 'is-invalid'}`}
                    placeholder="Grain Tank Capacity"
                    type="text"
                    value={grainTankCap}
                    onChange={(e) => setGrainTankCap(e.target.value)}
                />
                <Form.Control
                    className={`form__input-field ${errors.maxHp && 'is-invalid'}`}
                    placeholder="Max HP"
                    type="text"
                    value={maxHp}
                    onChange={(e) => setMaxHp(e.target.value)}
                />
                <Form.Control
                    className={`form__input-field ${errors.maxCutWidth && 'is-invalid'}`}
                    placeholder="Max Cutting Width"
                    type="text"
                    value={maxCutWidth}
                    onChange={(e) => setMaxCutWidth(e.target.value)}
                />
                <Form.Control
                    className={`form__input-field ${errors.unloadingSpeed && 'is-invalid'}`}
                    placeholder="Unloading Speed"
                    type="text"
                    value={unloadingSpeed}
                    onChange={(e) => setUnloadingSpeed(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <div>
                    <Button variant="primary" onClick={() => handleSaveClick()}>Save Machine</Button>
                </div>
            </Form.Group>
        </>
    )
}

export default CombineForm;
