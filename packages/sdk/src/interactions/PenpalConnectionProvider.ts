import { connectToChild } from 'penpal';
import { StudioStyling } from '../types/ConfigurationTypes';
import { ConfigParameterTypes } from './Connector';
import { IConnectionProvider } from './base/IConnectionProvider';
import { StudioConnection } from './base/StudioConnection';

export const validateEditorLink = (editorLink: string) => {
    const linkValidator = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w]+\/$/);
    let link = '';
    if (linkValidator.test(editorLink)) {
        link = editorLink;
    } else if (editorLink.indexOf('/index.html') > -1) {
        link = editorLink.replace('/index.html', '/');
    } else if (editorLink.charAt(-1) !== '/') {
        link = `${editorLink}/`;
    }
    return link;
};

export const setupFrame = (iframe: HTMLIFrameElement, editorLink: string, styling?: StudioStyling) => {
    const link = validateEditorLink(editorLink);
    const stylingJson = JSON.stringify(styling || {});
    const html = `<html>
        <head>
            <base href="/" />
            <meta charset="UTF-8"/>
            <!--  use this property to pass the StudioStyling to the engine -->
            <meta name="studio-styling" content='${stylingJson}'>
        </head>
        <body>
            <script>
            </script>
            <script src="${link}init.js" async></script>
            <script src="${link}flutter_bootstrap.js"></script>
            <script>
                initializeStudioEngine({
                    assetBase: '${link}',
                });
            </script>
        </body>
        </html>
    `;

    // Set the iframe's content using DOM manipulation
    // eslint-disable-next-line no-param-reassign
    iframe.srcdoc = html;
};

export class PenpalConnectionProvider implements IConnectionProvider {
    createConnection(
        editorLink: string,
        params: ConfigParameterTypes,
        setConnection: (connection: StudioConnection) => void,
        editorId = 'chili-editor',
        styling?: StudioStyling,
    ) {
        const editorSelectorId = `#${editorId}`;
        const iframe = document.createElement('iframe');
        iframe.setAttribute('srcdoc', ' ');
        iframe.setAttribute('title', 'Chili-Editor');
        iframe.setAttribute('style', 'width: 100%; height: 100%;');
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('referrerpolicy', 'origin');

        const setupNewFrame = () => {
            const iframeContainer = document.querySelector(editorSelectorId);
            if (iframeContainer) {
                iframeContainer?.appendChild(iframe);
                setupFrame(iframe, editorLink, styling);
            }
        };

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setupNewFrame();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setupNewFrame();
            });
        }
        const connection = connectToChild({
            // The iframe to which a connection should be made
            iframe,
            // All the methods that we want to expose to the child should be inside the methods object
            // f.e. stateChange(documentJson)
            methods: {
                actionsChanged: params.onActionsChanged,
                stateChanged: params.onStateChanged,
                documentLoaded: params.onDocumentLoaded,
                authExpired: params.onAuthExpired,
                viewportRequested: params.onViewportRequested,
                selectedFramesContent: params.onSelectedFramesContentChanged,
                selectedFramesLayout: params.onSelectedFramesLayoutChanged,
                selectedLayoutProperties: params.onSelectedLayoutPropertiesChanged,
                openLayoutPropertiesPanel: params.onPageSelectionChanged,
                selectedLayoutUnit: params.onSelectedLayoutUnitChanged,
                scrubberPositionChanged: params.onScrubberPositionChanged,
                frameAnimationsChanged: params.onFrameAnimationsChanged,
                selectedToolChanged: params.onSelectedToolChanged,
                variableListChanged: params.onVariableListChanged,
                undoStackStateChanged: params.onUndoStateChanged,
                selectedLayoutFramesChanged: params.onSelectedLayoutFramesChanged,
                selectedTextStyleChanged: params.onSelectedTextStyleChanged,
                colorsChanged: params.onColorsChanged,
                paragraphStylesChanged: params.onParagraphStylesChanged,
                characterStylesChanged: params.onCharacterStylesChanged,
                fontFamiliesChanged: params.onFontFamiliesChanged,
                selectedLayoutId: params.onSelectedLayoutIdChanged,
                layoutListChanged: params.onLayoutsChanged,
                connectorEvent: params.onConnectorEvent,
                connectorsChanged: params.onConnectorsChanged,
                zoomChanged: params.onZoomChanged,
                pageSnapshotInvalidated: params.onPageSnapshotInvalidated,
                pagesChanged: params.onPagesChanged,
                pageSizeChanged: params.onPageSizeChanged,
                shapeCornerRadiusChanged: params.onShapeCornerRadiusChanged,
                cropActiveFrameIdChanged: params.onCropActiveFrameIdChanged,
                asyncError: params.onAsyncError,
                viewModeChanged: params.onViewModeChanged,
                barcodeValidationChanged: params.onBarcodeValidationChanged,
                selectedPageIdChanged: params.onSelectedPageIdChanged,
                dataSourceIdChanged: params.onDataSourceIdChanged,
                documentIssueListChanged: params.onDocumentIssueListChanged,
                customUndoDataChanged: params.onCustomUndoDataChanged,
                engineEditingModeChanged: params.onEngineEditModeChanged,
            },
        });
        setConnection({
            ...connection,
        } as unknown as StudioConnection);
    }
}
