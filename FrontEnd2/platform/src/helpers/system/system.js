import React from 'react';
import { useDynamicScript, loadComponent } from '../federationHelper/federationHelper';
import "regenerator-runtime/runtime";

function System(props) {
	const { ready, failed } = useDynamicScript({
		url: props.system && props.system.url,
	});

	if (!props.system) {
		return <div></div>;// <h2>Not system specified</h2>;
	}

	if (!ready) {
		return <h2>Loading dynamic script: {props.system.url}</h2>;
	}

	if (failed) {
		return <h2>Failed to load dynamic script: {props.system.url}</h2>;
	}

	const Component = React.lazy(
		loadComponent(props.system.scope, props.system.module)
	);

	return (
		<React.Suspense fallback="Loading System">
			<Component />
		</React.Suspense>
	);
}

export default System;