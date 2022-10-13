import * as React from 'react';
import { useTrackOnChange } from '../src/useTrackOnChange';
import { render, waitFor, fireEvent } from '@testing-library/react';
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

describe('useTrackOnChange', () => {
	it('track should call', () => {
		function Component() {
			const count = 0;
			useTrackOnChange('test', [count]);
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test', undefined, undefined);
	});

	it('track should call with event property', () => {
		function Component() {
			const count = 0;
			useTrackOnChange('test', [count], { test_prop: 'test_event_property' });
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test', { test_prop: 'test_event_property' }, undefined);
	});

	it('track should call with event property and event option', () => {
		function Component() {
			const count = 0;
			useTrackOnChange('test', [count], { test_prop: 'test_event_property' }, { android_id: 'test_android_id' });
			return <div></div>;
		}
		render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('test', { test_prop: 'test_event_property' }, { android_id: 'test_android_id' });
	});

	it('track should return result', async () => {
		let result: Partial<Result>;
		function Component() {
			const count = 0;
			result = useTrackOnChange(
				'test',
				[count],
				{ test_prop: 'test_event_property' },
				{ android_id: 'test_android_id' },
			);
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

	it('track should call when dependency change', async () => {
		function Component() {
			const [count, setCount] = React.useState<number>(1);
			useTrackOnChange(count.toString(), [count]);
			return (
				<div>
					<button
						onClick={() => {
							setCount(count + 1);
						}}
					></button>
				</div>
			);
		}
		const component = render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('1', undefined, undefined);

		const button = component.findByRole('button');

		fireEvent.click(await button);

		expect(track).toBeCalledTimes(2);
		expect(track).toBeCalledWith('2', undefined, undefined);
	});

	it('track should call one time', async () => {
		function Component() {
			const [count, setCount] = React.useState<number>(1);
			useTrackOnChange(count.toString(), []);
			return (
				<div>
					<button
						onClick={() => {
							setCount(count + 1);
						}}
					></button>
				</div>
			);
		}
		const component = render(<Component />);

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('1', undefined, undefined);

		const button = await component.findByRole('button');

		fireEvent.click(button);

		expect(track).toBeCalledTimes(1);
	});

	it('track should call when several dependencies change', async () => {
		function Component() {
			const [count, setCount] = React.useState<number>(1);
			const [anotherCount, setAnotherCount] = React.useState<number>(1);
			useTrackOnChange((count + anotherCount).toString(), [anotherCount, count]);
			return (
				<div>
					<button
						aria-label="first_count"
						onClick={() => {
							setCount(count + 1);
						}}
					></button>
					<button
						aria-label="second_count"
						onClick={() => {
							setAnotherCount(anotherCount + 1);
						}}
					></button>
				</div>
			);
		}
		const component = render(<Component />);

		const firstCountButton = await component.findByLabelText('first_count');
		const secondCountButton = await component.findByLabelText('second_count');

		expect(track).toBeCalledTimes(1);
		expect(track).toBeCalledWith('2', undefined, undefined);

		fireEvent.click(firstCountButton);

		expect(track).toBeCalledTimes(2);
		expect(track).toBeCalledWith('2', undefined, undefined);

		fireEvent.click(secondCountButton);

		expect(track).toBeCalledTimes(3);
		expect(track).toBeCalledWith('3', undefined, undefined);
	});
});
