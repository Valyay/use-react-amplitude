import { DependencyList, useCallback, useEffect, useState, useRef } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions, Result } from '@amplitude/analytics-types';
import isEqual from 'lodash.isequal';

const useComponentDidUpdate = (effect: (...args: unknown[]) => unknown, dependencies: DependencyList) => {
	const hasMounted = useRef<boolean>(false);

	const memoized = useCallback(effect, dependencies);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}
		memoized();
	}, [memoized]);
};

/**
 * The hook is called after changing any of the values in the array. (deep comparison is used)
 * Analogue of DidComponentUpdate
 *
 * @param {string} eventInput
 * @param {DependencyList} dependencies
 * @param {Record<string, unknown>} eventProperties
 * @param {EventOptions} eventOptions
 *
 * @returns `{ event: Event, code: number, message: string }`
 *
 */

export const useTrackOnUpdate = (
	eventInput: string,
	dependencies: DependencyList,
	eventProperties?: Record<string, unknown> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	const [currentDependencies, setCurrentValue] = useState<DependencyList>([]);
	const [result, setResult] = useState<Partial<Result>>({ event: undefined, code: undefined, message: undefined });

	if (!isEqual(currentDependencies, dependencies)) {
		setCurrentValue(dependencies);
	}

	useComponentDidUpdate(() => {
		track(eventInput, eventProperties, eventOptions).promise.then((data) => {
			setResult(data);
		});
	}, [currentDependencies]);

	return result;
};
