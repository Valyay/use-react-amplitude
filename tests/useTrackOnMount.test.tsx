import * as React from 'react';
import { useTrackOnMount } from '../src/useTrackOnMount';
import { render } from '@testing-library/react';
import { track } from '@amplitude/analytics-browser';

jest.mock('@amplitude/analytics-browser', () => ({
	track: jest.fn(),
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
});
