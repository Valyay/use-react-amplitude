import * as React from 'react';
import { useTrackOnMount } from '../src/useTrackOnMount';
import { render, waitFor } from '@testing-library/react';
import { track } from '@amplitude/analytics-browser';
import { Result } from '@amplitude/analytics-types';

jest.mock('@amplitude/analytics-browser', () => ({
	track: jest.fn().mockReturnValue({
		promise: Promise.resolve({
			code: 200,
			message: '',
			event: {
				event_type: 'event_type',
			},
		}),
	}),
}));

beforeEach(() => jest.clearAllMocks());

describe('useTrackOnMount', () => {
	it('track should call', () => {
		function Component() {
			useTrackOnMount('test');
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test', undefined, undefined);
	});

	it('track should call with event property', () => {
		function Component() {
			useTrackOnMount('test', { test_prop: 'test_event_property' });
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test', { test_prop: 'test_event_property' }, undefined);
	});

	it('track should call with event property and event option', () => {
		function Component() {
			useTrackOnMount('test', { test_prop: 'test_event_property' }, { android_id: 'test_android_id' });
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test', { test_prop: 'test_event_property' }, { android_id: 'test_android_id' });
	});

	it('track should return result', async () => {
		let result: Partial<Result>;
		function Component() {
			result = useTrackOnMount('test', { test_prop: 'test_event_property' }, { android_id: 'test_android_id' });
			return <div></div>;
		}
		render(<Component />);

		await waitFor(() => {
			expect(result).toEqual({
				code: 200,
				message: '',
				event: {
					event_type: 'event_type',
				},
			});
		});
	});
});
