import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';

import { Button, Col, Dropdown, Form } from 'react-bootstrap';

import { GET_ALL_CROPS } from '../../constants/gqlCropConstants';
import { GET_ALL_SOIL_TYPES } from '../../constants/gqlSoilConstants';
import { CREATE_NEW_FIELD } from '../../constants/gqlFieldConstants';
import { loadToastError, loadToastSuccess } from '../../loadToast/loadToast';
import CropSoilDropdown from '../dropdowns/cropSoilDropdown';

const CREATE_FIELD_SUCCESS = 'Field created successfully !';
const CREATE_FIELD_ERROR = 'Creating a field is not successful !';
const EMPTY_FIELDS = 'Please fill all empty fields !';
const NO_CROP_CHOSEN = 'Please choose a crop !';
const NO_SOIL_CHOSEN = 'Please choose a soil !';

const CreateField = (props) => {
    const { location: { state }} = props;
    const [fieldName, setFieldName] = useState('');
    const [soilTypes, setSoilTypes] = useState([]);
    const [crops, setCrops] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedSoil, setSelectedSoil] = useState({
        id: -1,
        name: 'Soil Type'
    });
    const [selectedCrop, setSelectedCrop] = useState({
        id: -1,
        name: 'Crop Type'
    });
    
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

    const [addField] = useMutation(CREATE_NEW_FIELD, {
        onCompleted(data) {
            if(data) {
                loadToastSuccess(CREATE_FIELD_SUCCESS);
            } else {
                loadToastError(CREATE_FIELD_ERROR);
            }
        }
    })

    const handleSaveFieldClick = () => {
        const isOk = checkEmptyFields();

        if(!isOk) {
            return;
        }

        addField({
            variables: {
                name: fieldName,
                farmId: parseInt(state.id),
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
                <h1>Create Field Form</h1>

                <Form>
                    <Form.Group>
                        <Form.Control
                            className={`${errors.fieldName && 'is-invalid'}`}
                            placeholder="Farm name"
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
                            <Button variant="primary" onClick={() => handleSaveFieldClick()}>Save Field</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </Col>
    );
}

export default CreateField;
