import { LogLevel, RuntimeConfigType, ConfigType, LoggerFunction, LogCategory } from '../../types/CommonTypes';
import { ConfigHelper } from '../../utils/ConfigHelper';

describe('ConfigHelper', () => {
    let originalConsoleError: unknown;
    let originalConsoleWarn: unknown;
    let originalConsoleLog: unknown;

    beforeEach(() => {
        originalConsoleError = console.error;
        originalConsoleWarn = console.warn;
        originalConsoleLog = console.log;

        console.error = jest.fn();
        console.warn = jest.fn();
        console.log = jest.fn();
    });

    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.error = originalConsoleError;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.warn = originalConsoleWarn;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log = originalConsoleLog;
    });

    const createConfigWithLogLevel = (logLevel: LogLevel): RuntimeConfigType => {
        const config: ConfigType = {
            logging: {
                logLevel: logLevel,
            },
        };
        return ConfigHelper.createRuntimeConfig(config);
    };

    it('should log error messages when log level is ERROR', () => {
        const runtimeConfig = createConfigWithLogLevel(LogLevel.error);
        getLogger(runtimeConfig)(LogLevel.error, LogCategory.general, 'This is an error message');
        getLogger(runtimeConfig)(LogLevel.warn, LogCategory.general, 'This is a warning message');
        getLogger(runtimeConfig)(LogLevel.info, LogCategory.general, 'This is an info message');

        expect(console.error).toHaveBeenCalledWith('[general] [error] This is an error message');
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should log warning and error messages when log level is WARN', () => {
        const runtimeConfig = createConfigWithLogLevel(LogLevel.warn);
        getLogger(runtimeConfig)(LogLevel.error, LogCategory.general, 'This is an error message');
        getLogger(runtimeConfig)(LogLevel.warn, LogCategory.general, 'This is a warning message');
        getLogger(runtimeConfig)(LogLevel.info, LogCategory.general, 'This is an info message');

        expect(console.error).toHaveBeenCalledWith('[general] [error] This is an error message');
        expect(console.warn).toHaveBeenCalledWith('[general] [warn] This is a warning message');
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should log info, warning, and error messages when log level is INFO', () => {
        const runtimeConfig = createConfigWithLogLevel(LogLevel.info);
        getLogger(runtimeConfig)(LogLevel.error, LogCategory.general, 'This is an error message');
        getLogger(runtimeConfig)(LogLevel.warn, LogCategory.general, 'This is a warning message');
        getLogger(runtimeConfig)(LogLevel.info, LogCategory.general, 'This is an info message');

        expect(console.error).toHaveBeenCalledWith('[general] [error] This is an error message');
        expect(console.warn).toHaveBeenCalledWith('[general] [warn] This is a warning message');
        expect(console.log).toHaveBeenCalledWith('[general] [info] This is an info message');
    });

    it('should log only ERROR when loglevel is undefined', () => {
        const runtimeConfig = createConfigWithLogLevel(undefined as unknown as LogLevel);
        getLogger(runtimeConfig)(LogLevel.error, LogCategory.general, 'This is an error message');
        getLogger(runtimeConfig)(LogLevel.warn, LogCategory.general, 'This is a warning message');
        getLogger(runtimeConfig)(LogLevel.info, LogCategory.general, 'This is an info message');

        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.log).not.toHaveBeenCalled();
    });

    it('should adopt functionality when loglevel changes', () => {
        const runtimeConfig = createConfigWithLogLevel(LogLevel.error);
        getLogger(runtimeConfig)(LogLevel.error, LogCategory.general, 'This is an error message');
        getLogger(runtimeConfig)(LogLevel.warn, LogCategory.general, 'This is a warning message');
        getLogger(runtimeConfig)(LogLevel.info, LogCategory.general, 'This is an info message');

        expect(console.error).toHaveBeenCalledWith('[general] [error] This is an error message');
        expect(console.warn).not.toHaveBeenCalled();
        expect(console.log).not.toHaveBeenCalled();

        if (runtimeConfig.logging) {
            runtimeConfig.logging.logLevel = LogLevel.warn;
        } else {
            throw new Error('runtimeConfig.logging is undefined');
        }
        getLogger(runtimeConfig)(LogLevel.error, LogCategory.general, 'This is an error message');
        getLogger(runtimeConfig)(LogLevel.warn, LogCategory.general, 'This is a warning message');
        getLogger(runtimeConfig)(LogLevel.info, LogCategory.general, 'This is an info message');

        expect(console.error).toHaveBeenCalledTimes(2);
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.log).not.toHaveBeenCalled();
    });
});

function getLogger(runtimeConfig?: RuntimeConfigType): LoggerFunction {
    if (runtimeConfig?.logging?.logger === undefined) {
        throw new Error('Logger is undefined');
    }

    return runtimeConfig.logging.logger;
}
