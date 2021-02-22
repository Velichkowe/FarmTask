import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CountryRegionDropdown = ({ elem, handleSelectRegion}) => {
    return (
        <Dropdown.Item
            onClick={() => handleSelectRegion(elem)}
        >
            {elem.region ? elem.region.name : elem.country.name}
        </Dropdown.Item>
    )
}

export default CountryRegionDropdown;
