import { DependencyList, useEffect, useState } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions, Result } from '@amplitude/analytics-types';
import isEqual from 'lodash.isequal';

/**
 * The hook is called after mounting a component or changing any of the values in the array. (deep comparison is used)
 *
 * @param {string} eventInput
 * @param {DependencyList} dependencies
 * @param {Record<string, any} eventProperties
 * @param {EventOptions} eventOptions
 *
 * @returns `{ event: Event, code: number, message: string }`
 *
 */

export const useTrackOnChange = (
	eventInput: string,
	dependencies: DependencyList,
	eventProperties?: Record<string, any> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	const [currentDependencies, setCurrentDependencies] = useState<DependencyList>([]);
	const [result, setResult] = useState<Partial<Result>>({ event: undefined, code: undefined, message: undefined });

	if (!isEqual(currentDependencies, dependencies)) {
		setCurrentDependencies(dependencies);
	}

	useEffect(() => {
		track(eventInput, eventProperties, eventOptions).promise.then(data => {
			setResult(data);
		});
	}, [currentDependencies]);

	return result;
};
