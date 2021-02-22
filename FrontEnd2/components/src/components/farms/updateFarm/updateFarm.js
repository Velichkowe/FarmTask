import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { loadToastSuccess } from '../../loadToast/loadToast';
import { UPDATE_FARM } from '../../constants/gqlFarmConstants';

const FARM_SAVE_SUCCESS = 'Farm saved successfully !';

const UpdateFarm = (props) => {
    const { location: { state }} = props;
    const [farmName, setFarmName] = useState(state.name);

    const [updateFarm] = useMutation(UPDATE_FARM, {
        onCompleted(data) {
            loadToastSuccess(FARM_SAVE_SUCCESS);
        }
    })

    const saveFarm = (e) => {
        e.preventDefault();
        updateFarm({
            variables: {
                id: parseInt(state.id),
                name: farmName
            }
        });
    }

    return (
        <>
            <div className="form__create-farm">
                <h2>Update Farm Form</h2>

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
                            Update Farm
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default UpdateFarm;
