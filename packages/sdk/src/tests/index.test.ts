import { SDK } from '../sdk';
import mockConfig from './__mocks__/Config';

let mockedSDK: SDK;

beforeEach(() => {
    mockedSDK = new SDK(mockConfig);

    jest.spyOn(mockedSDK, 'loadEditor');
});

afterEach(() => {
    jest.restoreAllMocks();
});
describe('SDK methods', () => {
    it('Should call all of the frame properties methods of editorAPI successfully', async () => {
        mockedSDK.loadEditor();
        expect(mockedSDK.loadEditor).toHaveBeenCalledTimes(1);
    });
});

describe('SDK engine lifecycle', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.id = 'chili-editor';
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
    });

    it('releases its own previous engine frame when loadEditor is called again', () => {
        mockedSDK.loadEditor();
        const first = container.getElementsByTagName('iframe')[0];

        mockedSDK.loadEditor();

        // The previous frame must be gone, otherwise a reload leaves a fully
        // live engine (Dart heap + CanvasKit + QuickJS) behind.
        expect(container.getElementsByTagName('iframe')).toHaveLength(1);
        expect(container.getElementsByTagName('iframe')[0]).not.toBe(first);
        expect(first.isConnected).toBe(false);

        mockedSDK.destroy();
    });

    it('keeps the engine frames of other SDK instances alive', () => {
        const otherSDK = new SDK(mockConfig);

        mockedSDK.loadEditor();
        otherSDK.loadEditor();

        expect(container.getElementsByTagName('iframe')).toHaveLength(2);

        mockedSDK.destroy();

        // Destroying one instance must not remove the frame the other instance loaded.
        expect(container.getElementsByTagName('iframe')).toHaveLength(1);

        otherSDK.destroy();
        expect(container.getElementsByTagName('iframe')).toHaveLength(0);
    });
});
