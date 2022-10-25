import { initAmplitude } from '../src/initAmplitude';
import { init } from '@amplitude/analytics-browser';

jest.mock('@amplitude/analytics-browser', () => ({
	init: jest.fn(),
}));

beforeEach(() => jest.clearAllMocks());

describe('initAmplitude', () => {
	it('track should call', () => {
		initAmplitude('1234', 'test_id');

		expect(init).toBeCalledTimes(1);
		expect(init).toBeCalledWith('1234', 'test_id', undefined);
	});
});
