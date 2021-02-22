import React from 'react';

const MachineRows = ({ elem, handleDeleteRow }) => {
    return (
        <tr>
            <td>{elem.name}</td>
            <td>{elem.machineType.name}</td>
            <td>{elem.grainTankCap || '---'}</td>
            <td>{elem.maxHp || '---'}</td>
            <td>{elem.maxCutWidth || '---'}</td>
            <td>{elem.unloadingSpeed || '---'}</td>
            <td>{elem.maxLiftCap || '---'}</td>
            <td>{elem.transmission || '---'}</td>
            <td>{elem.engine || '---'}</td>
            <td>{elem.pickUpWidth || '---'}</td>
            <td>{elem.plungerSpeed || '---'}</td>
            <td>
                <div className="btn__delete-item">
                    <div 
                        className="btn__delete"
                        onClick={(e) => handleDeleteRow(elem)}
                    >
                        x
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MachineRows;