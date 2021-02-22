import React from 'react';
import { Dropdown} from 'react-bootstrap';

const CropSoilDropdown = ({elem, setSelected}) => {
    return (
        <Dropdown.Item 
            onClick={() => setSelected(elem)}
        >
            {elem.name}
        </Dropdown.Item>
    );
}

export default CropSoilDropdown;
