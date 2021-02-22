import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { Col, Table } from 'react-bootstrap';
import { GET_ALL_FIELDS_BY_FARM } from '../../constants/gqlFieldConstants';
import { DELETE_FIELD_BY_ID } from '../../constants/gqlFieldConstants';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import FieldRows from './fieldRows';

const FIELD_DEL_SUCCESS = 'Field deleted successfully !';
const FIELD_DEL_ERROR = 'There was an error deleting that field !';

const ShowFields = (props) => {
    const { location: { state }} = props;
    const [fields, setFields] = useState([]);

    useQuery(GET_ALL_FIELDS_BY_FARM, {
        variables: {
            farmId: parseInt(state.id)
        },
        onCompleted(data) {
            setFields(data.fieldsByFarmId);
        },
        fetchPolicy: "network-only"
    });

    const [deleteField] = useMutation(DELETE_FIELD_BY_ID, {
        onCompleted(data) {
            if(data) {
                loadToastSuccess(FIELD_DEL_SUCCESS)
            } else {
                loadToastError(FIELD_DEL_ERROR);
            }
        }
    })

    const handleDeleteRow = (elem) => {
        deleteField({
            variables: {
                id: parseInt(elem.id)
            }
        });

        setFields(fields.filter(e => parseInt(e.id) !== parseInt(elem.id)));
    }

    return (
        <Col sm={7} md={7} lg={7}>
            <div className="field__component">
                <h1>Show Fields</h1>

                {fields.length === 0 ?
                    <p>There are no fields for the selected farm !</p>
                    :
                    <div className="table__farms">
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Crop</th>
                                    <th>Soil</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>
                                {fields.map((elem, idx) => {
                                    return (
                                        <FieldRows key={idx} elem={elem} handleDeleteRow={handleDeleteRow} />
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
export default ShowFields;
