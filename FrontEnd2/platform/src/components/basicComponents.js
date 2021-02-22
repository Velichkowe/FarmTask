import React, { useEffect, lazy, useState } from 'react';
import { loadComponent } from '../helpers/federationHelper/federationHelper';
import 'regenerator-runtime/runtime';

const SCOPE = 'components';

const BasicComponent = ({ componentName }) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        const Component = lazy(loadComponent(SCOPE, `./${componentName}`));

        setComponent(Component);
    }, [componentName])

    return (
        <>
            {component && (
                <React.Suspense fallback='Loading component..'>
                    {React.createElement(component)}
                </React.Suspense>
            )}
        </>
    )
}

export default BasicComponent;