import React from 'react';
import { Switch } from 'react-router-dom';

export const Routes = ({ routes }) => {
    return (
        <Switch>
            {routes}
        </Switch>
    )
}