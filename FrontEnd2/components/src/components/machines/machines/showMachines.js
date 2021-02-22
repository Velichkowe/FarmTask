import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { Col, Table } from 'react-bootstrap';

import { loadToastSuccess } from '../../loadToast/loadToast';
import { GET_ALL_MACHINES_BY_FARM_ID, DELETE_MACHINE } from '../../constants/gqlMachineConstants';
import MachineRows from './machineRows';

const MACHINE_REMOVE_SUCCESS = 'Machine removed successfully !';

const ShowMachines = (props) => {
    const { location: { state }} = props;
    const [machines, setMachines] = useState([]);

    useQuery(GET_ALL_MACHINES_BY_FARM_ID, {
        variables: {
            farmId: parseInt(state.id)
        },
        onCompleted(data) {
            setMachines(data.machinesByFarmId)
            console.log(data.machinesByFarmId)
        }
        ,fetchPolicy: "network-only"
    });

    const [deleteMachineById] = useMutation(DELETE_MACHINE, {
        onCompleted(data) {
            loadToastSuccess(MACHINE_REMOVE_SUCCESS);
        }
    });

    const handleDeleteRow = (elem) => {
        deleteMachineById({
            variables: {
                id: parseInt(elem.id)
            }
        });

        setMachines(machines.filter(e => parseInt(e.id) !== parseInt(elem.id)));
    }

    return (
        <Col className="machines__table">
            <div className="field__component">
                <h1>All Machines</h1>

                {machines.length === 0 ?
                    <p>There are no Machines in the selected farm !</p>
                    :
                    <div className="table__farms">
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Grain Tank Cap</th>
                                    <th>Max HP</th>
                                    <th>Max Cut Width</th>
                                    <th>Unloading Speed</th>
                                    <th>Max Lift Cap</th>
                                    <th>Transmission</th>
                                    <th>Engine</th>
                                    <th>Pick Up Width</th>
                                    <th>Plunger Speed</th>
                                    <th>Delete</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>

                            <tbody>
                                {machines.map((elem, idx) => {
                                    return (
                                        <MachineRows key={idx} elem={elem} handleDeleteRow={handleDeleteRow} />
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        </Col>
    )
}

export default ShowMachines;
