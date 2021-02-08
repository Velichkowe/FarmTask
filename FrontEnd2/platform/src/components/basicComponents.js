import React, { useEffect, lazy, useState } from 'react';
import { loadComponent } from '../helpers/federationHelper/federationHelper';

const SCOPE = 'components';

const BasicComponent = ({ componentName }) => {
    const [component, setComponent] = useState({});

    useEffect(() => {
        // const fetchedComponents = [];

        // routes.forEach(element => {
            const Component = lazy(loadComponent(SCOPE, `./${componentName}`));
            // fetchedComponents.push({
            //     component: Component,
            //     // route: element.route
            // });
        // });

        setComponent(Component);
    }, [])

    return (
        <React.Suspense>
            {React.createElement(component)}
        </React.Suspense>
    )
}

export default BasicComponent;