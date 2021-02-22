import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { loadToastError } from '../../loadToast/loadToast';

const NO_SELECTION_ERROR = 'Select region and country !';

const Buttons = ({ selectedRegion, selectedCountry, user }) => {
    const history = useHistory();

    const handleSearchFarmsClick = () => {
        const isOk = checkForSelection();

        if(!isOk) {
            return;
        }

        history.push('/farms', { 
            region: selectedRegion, 
            country: selectedCountry, 
            user: user 
        });
    }

    const handleCreateFarmClick = () => {
        const isOk = checkForSelection();

        if(!isOk) {
            return;
        }

        history.push('/createFarm', { 
            region: selectedRegion, 
            country: selectedCountry,
            user: user 
        });
    }

    const checkForSelection = () => {
        if(selectedRegion.id === -1 || selectedCountry.id === -1) {
            loadToastError(NO_SELECTION_ERROR);

            return false;
        }

        return true;
    }
    
    if(!user) {
        return <>Loading</>
    }
    
    return (
        <>
            <div>
                <Button 
                    className="button__choice" 
                    variant="primary" 
                    onClick={() => handleSearchFarmsClick()}
                >
                    Search Farms
                </Button>

                {user.roleName !== "employee" ? (
                    <Button 
                        variant="primary" 
                        onClick={() => handleCreateFarmClick()}
                    >
                        Create Farm
                    </Button>
                ) : null }
            </div>
        </>
    )
}

export default Buttons;
