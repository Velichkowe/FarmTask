import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Col, Dropdown, Form } from 'react-bootstrap';

import { GET_ALL_CROPS } from '../../constants/gqlCropConstants';
import { GET_ALL_SOIL_TYPES } from '../../constants/gqlSoilConstants';
import { UPDATE_FIELD } from '../../constants/gqlFieldConstants';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import CropSoilDropdown from '../dropdowns/cropSoilDropdown';

const UPDATE_FIELD_SUCCESS = 'Field updated successfully !';
const UPDATE_FIELD_ERROR = 'Updating a field is not successful !';
const EMPTY_FIELDS = 'Please fill all empty fields !';
const NO_CROP_CHOSEN = 'Please choose a crop !';
const NO_SOIL_CHOSEN = 'Please choose a soil !';

const UpdateField = (props) => {
    const { location: { state }} = props;
    const [fieldName, setFieldName] = useState(state.name)
    const [soilTypes, setSoilTypes] = useState([]);
    const [crops, setCrops] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedSoil, setSelectedSoil] = useState(state.soil);
    const [selectedCrop, setSelectedCrop] = useState(state.crop);
    
    useQuery(GET_ALL_SOIL_TYPES, {
        onCompleted(data) {
            setSoilTypes(data.soils);
        }
    });

    useQuery(GET_ALL_CROPS, {
        onCompleted(data) {
            setCrops(data.crops);
        }
    });

    const [updateField] = useMutation(UPDATE_FIELD, {
        onCompleted(data) {
            if(data.updateField) {
                loadToastSuccess(UPDATE_FIELD_SUCCESS);
            } else {
                loadToastError(UPDATE_FIELD_ERROR);
            }
        }
    })

    const handleUpdateFieldClick = () => {
        const isOk = checkEmptyFields();

        if(!isOk) {
            return;
        }

        updateField({
            variables: {
                id: parseInt(state.id),
                name: fieldName,
                cropId: parseInt(selectedCrop.id),
                soilId: parseInt(selectedSoil.id)
            }
        });
    }

    const checkEmptyFields = () => {
        if(!fieldName) {
            setErrors({
                fieldName: "Please fill all empty fields !"
            });

            loadToastError(EMPTY_FIELDS);

            return false;
        }

        if(parseInt(selectedCrop.id) === -1) {
            setErrors({
                crop: "Please choose a crop !"
            });

            loadToastError(NO_CROP_CHOSEN);

            return false;
        }

        if(parseInt(selectedSoil.id) === -1) {
            setErrors({
                soil: "Please chose soil !"
            });

            loadToastError(NO_SOIL_CHOSEN);

            return false;
        }

        return true;
    }

    return (
        <Col sm={7} md={7} lg={7}>
            <div className="field__component">
                <h1>Update Field Form</h1>

                <Form>
                    <Form.Group>
                        <Form.Control
                            className={`${errors.fieldName && 'is-invalid'}`}
                            placeholder="Field name"
                            type="text"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedSoil.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {soilTypes.map((elem, idx) => {
                                    return (
                                        <CropSoilDropdown key={idx} elem={elem} setSelected={setSelectedSoil}/>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedCrop.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {crops.map((elem, idx) => {
                                    return (
                                        <CropSoilDropdown key={idx} elem={elem} setSelected={setSelectedCrop}/>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    <Form.Group>
                        <div>
                            <Button variant="primary" onClick={() => handleUpdateFieldClick()}>Update Field</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </Col>
    );
}

export default UpdateField;
