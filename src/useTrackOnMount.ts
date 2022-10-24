import { useState, useEffect } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions, Result } from '@amplitude/analytics-types';

/**
 * Hook is called after the component is mounted
 * Analogue of componentDidMount
 *
 * @param {string} eventInput
 * @param {Record<string, unknown>} eventProperties
 * @param {EventOptions} eventOptions
 *
 * @returns `{ event: Event, code: number, message: string }`
 *
 */

export const useTrackOnMount = (
	eventInput: string,
	eventProperties?: Record<string, unknown> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	const [result, setResult] = useState<Partial<Result>>({ event: undefined, code: undefined, message: undefined });

	useEffect(() => {
		track(eventInput, eventProperties, eventOptions).promise.then((trackResult) => {
			setResult(trackResult);
		});
	}, []);

	return result;
};
