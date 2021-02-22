import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

const Menu = ({ isAdmin, showAllUsersToggle }) => {
    let history = useHistory();

    // useEffect(() => {
    //     if(showAllUsersToggle) {
    //         console.log('push')
    //         history.push('/showAllUsers');
    //     }
    // }, [])
    

    return (
        <>
            <div>
                <ul>
                    {isAdmin ? 
                        <li>
                            <button onClick={() => history.push('/showUsers')} className="button__show-all">Show All Users</button>
                        </li> : null
                    }
                </ul>
            </div> 
        </>
    )
}

export default Menu;