/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
// import 'regenerator-runtime/runtime';

export const useDynamicScript = () => {
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const fetchManifests = async (urls) => {
            Promise.all(urls.map((url) => loadScript(url))).then(() => setReady(true));
        };
        setReady(false);
        setFailed(false);

        fetchManifests(['http://localhost:3002/']);
    }, []);

    return {
        ready,
        failed
    };
};

export const loadComponent = (scope, module) => {
    const getModule = async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__('default');
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        const Module = factory();

        return Module;
    };

    return async () => {
        try {
            const module = await getModule();

            return module;
        } catch (err) {
            console.log('Federation console error', err);
            // Code will enter catch block if the wanted component is not available. In this case we need to fetch a fresh manifest.
            // Find the url of the plugin
            const pluginKey = Object.entries(plugins).find((entry) => entry[0] == scope)[1];
            const url = process.env[pluginKey];

            // Remove old manifest script tag
            const scriptTag = document.querySelector(`script[src="${url}remoteManifest.js"]`);
            scriptTag.parentNode.removeChild(scriptTag);

            // Load fresh manifest
            await loadScript(url);

            // Get wanted component
            const module = await getModule();

            return module;
        }
    };
};

const loadScript = (url) =>
    new Promise((resolve) => {
        const element = document.createElement('script');
        element.async = true;
        element.src = `${url}remoteEntry.js`;
        element.type = 'text/javascript';

        document.head.appendChild(element);

        element.addEventListener('load', resolve, {
            once: true
        });
    });
