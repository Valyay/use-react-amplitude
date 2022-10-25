import { init } from '@amplitude/analytics-browser';
import { BrowserOptions } from '@amplitude/analytics-types';

/**
 * Wrapper for initialization Amplitude
 *
 * @param {string} apiKey
 * @param {string} userId
 * @param {BrowserOptions} options
 *
 */

export const initAmplitude = (apiKey: string, userId?: string, options?: BrowserOptions) => {
	init(apiKey, userId, options);
};
