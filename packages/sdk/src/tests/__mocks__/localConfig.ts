import { WellKnownConfigurationKeys } from '../../types/ConfigurationTypes';

export const mockBaseUrl = 'https://mock-url.com';
export const mockLocalConfig = new Map<string, string>().set(
    WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl,
    mockBaseUrl,
);
