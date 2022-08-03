import { useEffect } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions } from '@amplitude/analytics-types';

export const useTrackOnMount = (
	eventInput: string,
	eventProperties?: Record<string, any> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	useEffect(() => {
		track(eventInput, eventProperties, eventOptions);
	}, []);
};
