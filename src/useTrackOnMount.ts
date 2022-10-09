import { useState, useEffect } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions, Result } from '@amplitude/analytics-types';

export const useTrackOnMount = (
	eventInput: string,
	eventProperties?: Record<string, any> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	const [result, setResult] = useState<Partial<Result>>({ event: undefined, code: undefined, message: undefined });

	useEffect(() => {
		track(eventInput, eventProperties, eventOptions).promise.then(trackResult => {
			setResult(trackResult);
		});
	}, []);

	return result;
};
