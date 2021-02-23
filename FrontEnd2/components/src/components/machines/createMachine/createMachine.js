import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { Col, Dropdown, Form } from 'react-bootstrap';

import CombineForm from '../machineForms/combineForm';
import TraktorForm from '../machineForms/traktorForm';
import BalerForm from '../machineForms/balerForm';

const formMap = new Map();
formMap.set('Combine', CombineForm);
formMap.set('Traktor', TraktorForm);
formMap.set('Balers', BalerForm);

let ComponentForm = null;

const GET_ALL_MACHINE_TYPES = gql`
    query machineTypes {
        machineTypes {
            id name
        }
    }
`;

const CreateMachine = (props) => {
    const { location: { state }} = props;
    useQuery(GET_ALL_MACHINE_TYPES, {
        onCompleted(data) {
            setAllMachineTypes(data.machineTypes);
        },
        fetchPolicy: "network-only"
    });
    
    const [allMachineTypes, setAllMachineTypes] = useState([]);
    const [selectedMachineType, setSelectedMachineType] = useState({
        id: -1,
        name: 'Machine Types' 
    });
    

    const handleMachineSelect = (machineType) => {
        setSelectedMachineType(machineType);

        ComponentForm = formMap.get(machineType.name);
    }
    
    return (
        <>
            <Col sm={5} md={5} lg={5} className="margin-top">
                <Form>
                    <h2>Please choose a type of the machine you want</h2>

                    <Form.Group>
                        <Dropdown className="machine-type__dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedMachineType.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {allMachineTypes.map((elem, idx) => {
                                    return (
                                        <Dropdown.Item 
                                            key={idx} 
                                            onClick={() => handleMachineSelect(elem)}
                                        >
                                            {elem.name}
                                        </Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        {ComponentForm ?
                            <ComponentForm 
                                className="form__style"
                                selectedMachineType={selectedMachineType}
                                selectedFarm={state}
                                machine={{}}
                            /> : null
                        }
                    </Form.Group>
                </Form>
            </Col>
        </>
    )
}

export default CreateMachine;
