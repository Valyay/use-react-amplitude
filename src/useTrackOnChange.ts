import { DependencyList, useEffect, useState } from 'react';
import { track } from '@amplitude/analytics-browser';
import { EventOptions, Result } from '@amplitude/analytics-types';
import isEqual from 'lodash.isequal';

export const useTrackOnChange = (
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

	useEffect(() => {
		track(eventInput, eventProperties, eventOptions).promise.then(data => {
			setResult(data);
		});
	}, [currentValue]);

	return result;
};
