import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loadToastSuccess } from '../../loadToast/loadToast';
import { ADD_NEW_FARM } from '../../constants/gqlFarmConstants';

const FARM_SAVE_SUCCESS = 'Farm saved successfully !';

const CreateFarm = (props) => {
    const { location: { state }} = props;
    const [farmName, setFarmName] = useState('');

    const [createFarm] = useMutation(ADD_NEW_FARM, {
        onCompleted(data) {
            loadToastSuccess(FARM_SAVE_SUCCESS);
        }
    })

    const saveFarm = (e) => {
        e.preventDefault();
        createFarm({
            variables: {
                name: farmName,
                userId: parseInt(state.user.id),
                countryId: parseInt(state.country.id)
            }
        });
    }

    return (
        <>
            <div className="form__create-farm">
                <h2>Create Farm Form</h2>

                <Form onSubmit={saveFarm}>
                    <Form.Group>
                        <Form.Control
                            id="Farm name"
                            type="text"
                            value={farmName}
                            placeholder="Farm name"
                            onChange={(e) => setFarmName(e.target.value)}
                        />
                    </Form.Group>

                    <div>
                        <Button 
                            variant="primary"
                            type="submit"
                        >
                            Save Farm
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default CreateFarm;
