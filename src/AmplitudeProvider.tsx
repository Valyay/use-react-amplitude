import React, { Fragment } from 'react';
import { init } from '@amplitude/analytics-browser';
import { BrowserOptions } from '@amplitude/analytics-types';

interface IAmplitudeProvider {
	apiKey: string;
	userId?: string;
	options?: BrowserOptions;
	children: React.ReactNode;
}

export const AmplitudeProvider = (props: IAmplitudeProvider) => {
	init(props.apiKey, props.userId, props.options);
	return <Fragment>{props.children}</Fragment>;
};
