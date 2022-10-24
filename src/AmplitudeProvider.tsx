import React from 'react';
import { init } from '@amplitude/analytics-browser';
import { BrowserOptions, AdditionalBrowserOptions } from '@amplitude/analytics-types';

interface IAmplitudeProvider {
	apiKey: string;
	userId?: string;
	options?: BrowserOptions & AdditionalBrowserOptions;
	children: React.ReactNode;
}

export const AmplitudeProvider = (props: IAmplitudeProvider) => {
	init(props.apiKey, props.userId, props.options);
	<>{props.children}</>;
};
