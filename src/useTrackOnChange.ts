import { DependencyList, useEffect } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions } from '@amplitude/analytics-types';

export const useTrackOnChange = (
	eventInput: string,
	changingValue: DependencyList,
	eventProperties?: Record<string, any> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	useEffect(() => {
		track(eventInput, eventProperties, eventOptions);
	}, [changingValue]);
};
