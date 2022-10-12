import { DependencyList, useCallback, useEffect, useState, useRef } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions, Result } from '@amplitude/analytics-types';
import isEqual from 'lodash.isequal';

const useComponentDidUpdate = (effect: (...args: unknown[]) => unknown, dependencies: DependencyList) => {
	dependencies = dependencies || [];
	const hasMounted = useRef(false);

	const memoized = useCallback(effect, dependencies);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}
		memoized();
	}, [memoized]);
};

export const useTrackOnUpdate = (
	eventInput: string,
	changingValue: DependencyList,
	eventProperties?: Record<string, any> | undefined,
	eventOptions?: EventOptions | undefined,
) => {
	const [currentValue, setCurrentValue] = useState<DependencyList>([]);
	const [result, setResult] = useState<Partial<Result>>({ event: undefined, code: undefined, message: undefined });

	if (!isEqual(currentValue, changingValue)) {
		setCurrentValue(changingValue);
	}

	useComponentDidUpdate(() => {
		track(eventInput, eventProperties, eventOptions).promise.then(data => {
			setResult(data);
		});
	}, [currentValue]);

	return result;
};
