import * as React from 'react';
import { useTrackOnMount } from '../src/useTrackOnMount';
import { render } from '@testing-library/react';
import { track } from '@amplitude/analytics-browser';

jest.mock('@amplitude/analytics-browser', () => ({
	track: jest.fn(),
}));

describe('useTrackOnMount', () => {
	it('track should call', () => {
		function Component() {
			useTrackOnMount('test');
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test');
	});
});
