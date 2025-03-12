!(function (root, factory) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = factory())
        : 'function' == typeof define && define.amd
        ? define('ChiliEditorSDK', [], factory)
        : 'object' == typeof exports
        ? (exports.ChiliEditorSDK = factory())
        : (root.ChiliEditorSDK = factory());
})(this, () =>
    (() => {
        'use strict';
        var enums_MessageType,
            Resolution,
            ErrorCode,
            NativeErrorName,
            enums_NativeEventType,
            __webpack_require__ = {
                d: (exports, definition) => {
                    for (var key in definition)
                        __webpack_require__.o(definition, key) &&
                            !__webpack_require__.o(exports, key) &&
                            Object.defineProperty(exports, key, { enumerable: !0, get: definition[key] });
                },
                o: (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop),
                r: (exports) => {
                    'undefined' != typeof Symbol &&
                        Symbol.toStringTag &&
                        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' }),
                        Object.defineProperty(exports, '__esModule', { value: !0 });
                },
            },
            __webpack_exports__ = {};
        __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, {
                ActionEditorEvent: () => ActionEditorEvent,
                Alignment: () => Alignment,
                BasicAnimationsEmphasisStyles: () => BasicAnimationsEmphasisStyles,
                BlendMode: () => BlendMode,
                Case: () => Case,
                ColorType: () => ColorType,
                ConnectorEventType: () => ConnectorEventType,
                ConnectorMapping: () => ConnectorMapping,
                ConnectorMappingSource: () => ConnectorMappingSource,
                ConnectorRegistrationSource: () => ConnectorRegistrationSource,
                ConnectorStateType: () => ConnectorStateType,
                ConnectorType: () => ConnectorType,
                CornerRadiusType: () => CornerRadiusType,
                DeprecatedMediaType: () => DeprecatedMediaType,
                DocumentType: () => DocumentType,
                DownloadFormats: () => DownloadFormats,
                EaseTypes: () => EaseTypes,
                EnvironmentType: () => EnvironmentType,
                FitMode: () => FitMode,
                FlowDirection: () => FlowDirection,
                FontPreviewFormat: () => FontPreviewFormat,
                FontWeights: () => FontWeights,
                FramePropertyNames: () => FramePropertyNames,
                FrameTypeEnum: () => FrameTypeEnum,
                ImageSourceTypeEnum: () => ImageSourceTypeEnum,
                LayoutPropertyNames: () => LayoutPropertyNames,
                LayoutType: () => LayoutType,
                MediaDownloadType: () => MediaDownloadType,
                MediaType: () => MediaType,
                Scripting: () => Scripting,
                SelectedTextStyleSections: () => SelectedTextStyleSections,
                SelectedTextStyles: () => SelectedTextStyles,
                ShakeDirections: () => ShakeDirections,
                ShapeType: () => ShapeType,
                SlideDirections: () => SlideDirections,
                SortBy: () => SortBy,
                SortOrder: () => SortOrder,
                TextDirection: () => TextDirection,
                TextPosition: () => TextPosition,
                ToolType: () => ToolType,
                TweenTypes: () => TweenTypes,
                UpdateZIndexMethod: () => UpdateZIndexMethod,
                VariableType: () => VariableType,
                VerticalAlign: () => VerticalAlign,
                WellKnownConfigurationKeys: () => WellKnownConfigurationKeys,
                default: () => src,
                grafxMediaConnectorRegistration: () => grafxMediaConnectorRegistration,
            }),
            (function (MessageType) {
                (MessageType.Call = 'call'),
                    (MessageType.Reply = 'reply'),
                    (MessageType.Syn = 'syn'),
                    (MessageType.SynAck = 'synAck'),
                    (MessageType.Ack = 'ack');
            })(enums_MessageType || (enums_MessageType = {})),
            (function (Resolution) {
                (Resolution.Fulfilled = 'fulfilled'), (Resolution.Rejected = 'rejected');
            })(Resolution || (Resolution = {})),
            (function (ErrorCode) {
                (ErrorCode.ConnectionDestroyed = 'ConnectionDestroyed'),
                    (ErrorCode.ConnectionTimeout = 'ConnectionTimeout'),
                    (ErrorCode.NoIframeSrc = 'NoIframeSrc');
            })(ErrorCode || (ErrorCode = {})),
            (function (NativeErrorName) {
                NativeErrorName.DataCloneError = 'DataCloneError';
            })(NativeErrorName || (NativeErrorName = {})),
            (function (NativeEventType) {
                NativeEventType.Message = 'message';
            })(enums_NativeEventType || (enums_NativeEventType = {}));
        const DEFAULT_PORT_BY_PROTOCOL = { 'http:': '80', 'https:': '443' },
            URL_REGEX = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/,
            opaqueOriginSchemes = ['file:', 'data:'],
            serializeError = ({ name, message, stack }) => ({ name, message, stack });
        let id = 0;
        const generateId = () => ++id,
            keyPathToSegments = (keyPath) => (keyPath ? keyPath.split('.') : []),
            setAtKeyPath = (subject, keyPath, value) => {
                const segments = keyPathToSegments(keyPath);
                return (
                    segments.reduce(
                        (prevSubject, key, idx) => (
                            void 0 === prevSubject[key] && (prevSubject[key] = {}),
                            idx === segments.length - 1 && (prevSubject[key] = value),
                            prevSubject[key]
                        ),
                        subject,
                    ),
                    subject
                );
            },
            methodSerialization_serializeMethods = (methods, prefix) => {
                const flattenedMethods = {};
                return (
                    Object.keys(methods).forEach((key) => {
                        const value = methods[key],
                            keyPath = ((key, prefix) => {
                                const segments = keyPathToSegments(prefix || '');
                                return segments.push(key), ((segments) => segments.join('.'))(segments);
                            })(key, prefix);
                        'object' == typeof value &&
                            Object.assign(flattenedMethods, methodSerialization_serializeMethods(value, keyPath)),
                            'function' == typeof value && (flattenedMethods[keyPath] = value);
                    }),
                    flattenedMethods
                );
            },
            lib_connectCallSender = (callSender, info, methodKeyPaths, destroyConnection, log) => {
                const { localName, local, remote, originForSending, originForReceiving } = info;
                let destroyed = !1;
                log(`${localName}: Connecting call sender`);
                const createMethodProxy =
                        (methodName) =>
                        (...args) => {
                            let iframeRemoved;
                            log(`${localName}: Sending ${methodName}() call`);
                            try {
                                remote.closed && (iframeRemoved = !0);
                            } catch (e) {
                                iframeRemoved = !0;
                            }
                            if ((iframeRemoved && destroyConnection(), destroyed)) {
                                const error = new Error(
                                    `Unable to send ${methodName}() call due to destroyed connection`,
                                );
                                throw ((error.code = ErrorCode.ConnectionDestroyed), error);
                            }
                            return new Promise((resolve, reject) => {
                                const id = generateId(),
                                    handleMessageEvent = (event) => {
                                        if (
                                            event.source !== remote ||
                                            event.data.penpal !== enums_MessageType.Reply ||
                                            event.data.id !== id
                                        )
                                            return;
                                        if (event.origin !== originForReceiving)
                                            return void log(
                                                `${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`,
                                            );
                                        const replyMessage = event.data;
                                        log(`${localName}: Received ${methodName}() reply`),
                                            local.removeEventListener(
                                                enums_NativeEventType.Message,
                                                handleMessageEvent,
                                            );
                                        let returnValue = replyMessage.returnValue;
                                        replyMessage.returnValueIsError &&
                                            (returnValue = ((obj) => {
                                                const deserializedError = new Error();
                                                return (
                                                    Object.keys(obj).forEach(
                                                        (key) => (deserializedError[key] = obj[key]),
                                                    ),
                                                    deserializedError
                                                );
                                            })(returnValue)),
                                            (replyMessage.resolution === Resolution.Fulfilled ? resolve : reject)(
                                                returnValue,
                                            );
                                    };
                                local.addEventListener(enums_NativeEventType.Message, handleMessageEvent);
                                const callMessage = { penpal: enums_MessageType.Call, id, methodName, args };
                                remote.postMessage(callMessage, originForSending);
                            });
                        },
                    flattenedMethods = methodKeyPaths.reduce(
                        (api, name) => ((api[name] = createMethodProxy(name)), api),
                        {},
                    );
                return (
                    Object.assign(
                        callSender,
                        ((flattenedMethods) => {
                            const methods = {};
                            for (const keyPath in flattenedMethods)
                                setAtKeyPath(methods, keyPath, flattenedMethods[keyPath]);
                            return methods;
                        })(flattenedMethods),
                    ),
                    () => {
                        destroyed = !0;
                    }
                );
            },
            handleAckMessageFactory = (serializedMethods, childOrigin, originForSending, destructor, log) => {
                const { destroy, onDestroy } = destructor;
                let destroyCallReceiver, receiverMethodNames;
                const callSender = {};
                return (event) => {
                    if (event.origin !== childOrigin)
                        return void log(
                            `Parent: Handshake - Received ACK message from origin ${event.origin} which did not match expected origin ${childOrigin}`,
                        );
                    log('Parent: Handshake - Received ACK');
                    const info = {
                        localName: 'Parent',
                        local: window,
                        remote: event.source,
                        originForSending,
                        originForReceiving: childOrigin,
                    };
                    destroyCallReceiver && destroyCallReceiver(),
                        (destroyCallReceiver = ((info, serializedMethods, log) => {
                            const { localName, local, remote, originForSending, originForReceiving } = info;
                            let destroyed = !1;
                            const handleMessageEvent = (event) => {
                                if (event.source !== remote || event.data.penpal !== enums_MessageType.Call) return;
                                if (event.origin !== originForReceiving)
                                    return void log(
                                        `${localName} received message from origin ${event.origin} which did not match expected origin ${originForReceiving}`,
                                    );
                                const callMessage = event.data,
                                    { methodName, args, id } = callMessage;
                                log(`${localName}: Received ${methodName}() call`);
                                const createPromiseHandler = (resolution) => (returnValue) => {
                                    if ((log(`${localName}: Sending ${methodName}() reply`), destroyed))
                                        return void log(
                                            `${localName}: Unable to send ${methodName}() reply due to destroyed connection`,
                                        );
                                    const message = { penpal: enums_MessageType.Reply, id, resolution, returnValue };
                                    resolution === Resolution.Rejected &&
                                        returnValue instanceof Error &&
                                        ((message.returnValue = serializeError(returnValue)),
                                        (message.returnValueIsError = !0));
                                    try {
                                        remote.postMessage(message, originForSending);
                                    } catch (err) {
                                        if (err.name === NativeErrorName.DataCloneError) {
                                            const errorReplyMessage = {
                                                penpal: enums_MessageType.Reply,
                                                id,
                                                resolution: Resolution.Rejected,
                                                returnValue: serializeError(err),
                                                returnValueIsError: !0,
                                            };
                                            remote.postMessage(errorReplyMessage, originForSending);
                                        }
                                        throw err;
                                    }
                                };
                                new Promise((resolve) =>
                                    resolve(serializedMethods[methodName].apply(serializedMethods, args)),
                                ).then(
                                    createPromiseHandler(Resolution.Fulfilled),
                                    createPromiseHandler(Resolution.Rejected),
                                );
                            };
                            return (
                                local.addEventListener(enums_NativeEventType.Message, handleMessageEvent),
                                () => {
                                    (destroyed = !0),
                                        local.removeEventListener(enums_NativeEventType.Message, handleMessageEvent);
                                }
                            );
                        })(info, serializedMethods, log)),
                        onDestroy(destroyCallReceiver),
                        receiverMethodNames &&
                            receiverMethodNames.forEach((receiverMethodName) => {
                                delete callSender[receiverMethodName];
                            }),
                        (receiverMethodNames = event.data.methodNames);
                    const destroyCallSender = lib_connectCallSender(
                        callSender,
                        info,
                        receiverMethodNames,
                        destroy,
                        log,
                    );
                    return onDestroy(destroyCallSender), callSender;
                };
            },
            connectToChild = (options) => {
                let { iframe, methods = {}, childOrigin, timeout, debug = !1 } = options;
                const log = (
                        (debug) =>
                        (...args) => {
                            debug && console.log('[Penpal]', ...args);
                        }
                    )(debug),
                    destructor = ((localName, log) => {
                        const callbacks = [];
                        let destroyed = !1;
                        return {
                            destroy(error) {
                                destroyed ||
                                    ((destroyed = !0),
                                    log(`${localName}: Destroying connection`),
                                    callbacks.forEach((callback) => {
                                        callback(error);
                                    }));
                            },
                            onDestroy(callback) {
                                destroyed ? callback() : callbacks.push(callback);
                            },
                        };
                    })('Parent', log),
                    { onDestroy, destroy } = destructor;
                childOrigin ||
                    (((iframe) => {
                        if (!iframe.src && !iframe.srcdoc) {
                            const error = new Error('Iframe must have src or srcdoc property defined.');
                            throw ((error.code = ErrorCode.NoIframeSrc), error);
                        }
                    })(iframe),
                    (childOrigin = ((src) => {
                        if (src && opaqueOriginSchemes.find((scheme) => src.startsWith(scheme))) return 'null';
                        const location = document.location,
                            regexResult = URL_REGEX.exec(src);
                        let protocol, hostname, port;
                        return (
                            regexResult
                                ? ((protocol = regexResult[1] ? regexResult[1] : location.protocol),
                                  (hostname = regexResult[2]),
                                  (port = regexResult[4]))
                                : ((protocol = location.protocol),
                                  (hostname = location.hostname),
                                  (port = location.port)),
                            `${protocol}//${hostname}${
                                port && port !== DEFAULT_PORT_BY_PROTOCOL[protocol] ? `:${port}` : ''
                            }`
                        );
                    })(iframe.src)));
                const originForSending = 'null' === childOrigin ? '*' : childOrigin,
                    serializedMethods = methodSerialization_serializeMethods(methods),
                    handleSynMessage = ((log, serializedMethods, childOrigin, originForSending) => (event) => {
                        if (event.origin !== childOrigin)
                            return void log(
                                `Parent: Handshake - Received SYN message from origin ${event.origin} which did not match expected origin ${childOrigin}`,
                            );
                        log('Parent: Handshake - Received SYN, responding with SYN-ACK');
                        const synAckMessage = {
                            penpal: enums_MessageType.SynAck,
                            methodNames: Object.keys(serializedMethods),
                        };
                        event.source.postMessage(synAckMessage, originForSending);
                    })(log, serializedMethods, childOrigin, originForSending),
                    handleAckMessage = handleAckMessageFactory(
                        serializedMethods,
                        childOrigin,
                        originForSending,
                        destructor,
                        log,
                    ),
                    promise = new Promise((resolve, reject) => {
                        const stopConnectionTimeout = ((timeout, callback) => {
                                let timeoutId;
                                return (
                                    void 0 !== timeout &&
                                        (timeoutId = window.setTimeout(() => {
                                            const error = new Error(`Connection timed out after ${timeout}ms`);
                                            (error.code = ErrorCode.ConnectionTimeout), callback(error);
                                        }, timeout)),
                                    () => {
                                        clearTimeout(timeoutId);
                                    }
                                );
                            })(timeout, destroy),
                            handleMessage = (event) => {
                                if (event.source === iframe.contentWindow && event.data)
                                    if (event.data.penpal !== enums_MessageType.Syn)
                                        if (event.data.penpal !== enums_MessageType.Ack);
                                        else {
                                            const callSender = handleAckMessage(event);
                                            callSender && (stopConnectionTimeout(), resolve(callSender));
                                        }
                                    else handleSynMessage(event);
                            };
                        window.addEventListener(enums_NativeEventType.Message, handleMessage),
                            log('Parent: Awaiting handshake'),
                            ((iframe, destructor) => {
                                const { destroy, onDestroy } = destructor,
                                    checkIframeInDocIntervalId = setInterval(() => {
                                        iframe.isConnected || (clearInterval(checkIframeInDocIntervalId), destroy());
                                    }, 6e4);
                                onDestroy(() => {
                                    clearInterval(checkIframeInDocIntervalId);
                                });
                            })(iframe, destructor),
                            onDestroy((error) => {
                                window.removeEventListener(enums_NativeEventType.Message, handleMessage),
                                    error && reject(error);
                            });
                    });
                return {
                    promise,
                    destroy() {
                        destroy();
                    },
                };
            },
            setupFrame = (iframe, editorLink, styling) => {
                const link = ((editorLink) => {
                        let link = '';
                        return (
                            new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w]+\/$/).test(editorLink)
                                ? (link = editorLink)
                                : editorLink.indexOf('/index.html') > -1
                                ? (link = editorLink.replace('/index.html', '/'))
                                : '/' !== editorLink.charAt(-1) && (link = `${editorLink}/`),
                            link
                        );
                    })(editorLink),
                    html = `<html>\n    <head>\n      <base href="/" />\n      <meta charset="UTF-8"/>\n      \x3c!--  use this property to pass the StudioStyling to the engine --\x3e\n      <meta name="studio-styling" content=${JSON.stringify(
                        styling || {},
                    )}>\n    </head>\n    <body>\n    <script src="${link}init.js" async><\/script>\n    <script src="${link}init_engine.js"><\/script>\n    <script>\n        initializeStudioEngine({\n            assetBase: '${link}',\n            entryPointUrl: '${link}main.dart.js',\n        });\n    <\/script>\n    </body>\n    </html>\n    `;
                iframe.srcdoc = 'placeholder';
                let iframeDoc = iframe.ownerDocument;
                iframe.contentWindow && (iframeDoc = iframe.contentWindow.document),
                    iframeDoc.open(),
                    iframeDoc.write(html),
                    iframeDoc.close();
            },
            connector = (editorLink, params, setConnection, editorId = 'chili-editor', styling) => {
                const editorSelectorId = `#${editorId}`,
                    iframe = document.createElement('iframe');
                iframe.setAttribute('srcdoc', ' '),
                    iframe.setAttribute('title', 'Chili-Editor'),
                    iframe.setAttribute('style', 'width: 100%; height: 100%;'),
                    iframe.setAttribute('frameBorder', '0'),
                    iframe.setAttribute('referrerpolicy', 'origin');
                const setupNewFrame = () => {
                    const iframeContainer = document.querySelector(editorSelectorId);
                    iframeContainer &&
                        (null == iframeContainer || iframeContainer.appendChild(iframe),
                        setupFrame(iframe, editorLink, styling));
                };
                'complete' === document.readyState || 'interactive' === document.readyState
                    ? setupNewFrame()
                    : document.addEventListener('DOMContentLoaded', () => {
                          setupNewFrame();
                      }),
                    setConnection(
                        connectToChild({
                            iframe,
                            methods: {
                                actionsChanged: params.onActionsChanged,
                                stateChanged: params.onStateChanged,
                                documentLoaded: params.onDocumentLoaded,
                                selectedFrameContent: params.onSelectedFrameContentChanged,
                                selectedFrameLayout: params.onSelectedFrameLayoutChanged,
                                selectedLayoutProperties: params.onSelectedLayoutPropertiesChanged,
                                openLayoutPropertiesPanel: params.onPageSelectionChanged,
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
                                zoomChanged: params.onZoomChanged,
                                pageSizeChanged: params.onPageSizeChanged,
                                shapeCornerRadiusChanged: params.onShapeCornerRadiusChanged,
                                cropActiveFrameIdChanged: params.onCropActiveFrameIdChanged,
                                asyncError: params.onAsyncError,
                            },
                        }),
                    );
            };
        var WellKnownConfigurationKeys;
        !(function (WellKnownConfigurationKeys) {
            (WellKnownConfigurationKeys.GraFxStudioEnvironmentApiUrl = 'ENVIRONMENT_API'),
                (WellKnownConfigurationKeys.GraFxStudioSdkVersion = 'SDK_VERSION'),
                (WellKnownConfigurationKeys.GraFxStudioDocumentType = 'DOCUMENT_TYPE'),
                (WellKnownConfigurationKeys.GraFxStudioTemplateId = 'TEMPLATE_ID'),
                (WellKnownConfigurationKeys.GraFxStudioAuthToken = 'GRAFX_AUTH_TOKEN');
        })(WellKnownConfigurationKeys || (WellKnownConfigurationKeys = {}));
        const defaultStudioOptions = {
                shortcutOptions: {
                    debugPanel: { enabled: !1 },
                    ellipse: { enabled: !1 },
                    hand: { enabled: !1 },
                    image: { enabled: !1 },
                    polygon: { enabled: !1 },
                    rectangle: { enabled: !1 },
                    select: { enabled: !1 },
                    text: { enabled: !1 },
                    zoom: { enabled: !1 },
                },
            },
            package_namespaceObject_i8 = '0.155.3',
            editor_engine_namespaceObject_V = '0.1.9';
        var ImageFrameSourceType, FramePropertiesType, DocumentType;
        function getEditorResponseData(response, parse = !0) {
            var _a, _b;
            try {
                if (!response.success)
                    throw new Error(
                        null !== (_a = response.error) && void 0 !== _a ? _a : 'Yikes, something went wrong',
                        {
                            cause: {
                                name: String(response.status),
                                message:
                                    null !== (_b = response.error) && void 0 !== _b
                                        ? _b
                                        : 'Yikes, something went wrong',
                            },
                        },
                    );
                const dataShouldBeParsed = response.data && parse;
                return Object.assign(Object.assign({}, response), {
                    parsedData: dataShouldBeParsed ? JSON.parse(response.data) : response.data,
                });
            } catch (error) {
                throw (console.error(error), error);
            }
        }
        !(function (ImageFrameSourceType) {
            (ImageFrameSourceType.url = 'url'),
                (ImageFrameSourceType.assetProvider = 'assetProvider'),
                (ImageFrameSourceType.variable = 'variable');
        })(ImageFrameSourceType || (ImageFrameSourceType = {})),
            (function (FramePropertiesType) {
                (FramePropertiesType.top = 'top'), (FramePropertiesType.child = 'child');
            })(FramePropertiesType || (FramePropertiesType = {})),
            (function (DocumentType) {
                (DocumentType.project = 'project'), (DocumentType.template = 'template');
            })(DocumentType || (DocumentType = {}));
        var _ActionController_editorAPI,
            __awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            __classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            __classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ActionController {
            constructor(editorAPI) {
                _ActionController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .getActions()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .getActionById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = () =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .createAction()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.duplicate = (id) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .duplicateAction(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (id) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .removeAction(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (id, name) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .renameAction(id, name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.updateScript = (id, actionScript) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .updateActionScript(id, actionScript)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.updateTriggers = (id, triggers) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .updateActionTriggers(id, JSON.stringify(triggers))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.move = (order, ids) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .moveActions(order, ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setTypeError = (id, hasTypeErrors) =>
                        __awaiter(this, void 0, void 0, function* () {
                            return (yield __classPrivateFieldGet(this, _ActionController_editorAPI, 'f'))
                                .setActionTypeError(id, hasTypeErrors)
                                .then((result) => getEditorResponseData(result));
                        })),
                    __classPrivateFieldSet(this, _ActionController_editorAPI, editorAPI, 'f');
            }
        }
        _ActionController_editorAPI = new WeakMap();
        var _AnimationController_editorAPI,
            AnimationController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            AnimationController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            AnimationController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class AnimationController {
            constructor(children) {
                _AnimationController_editorAPI.set(this, void 0),
                    (this.getAllOnSelectedLayout = () =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .getAnimationsOnSelectedLayout()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getByFrameId = (id, layoutId) =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .getAnimationByFrameId(id, layoutId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getByLayoutId = (id) =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .getAnimationsByLayoutId(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setFrameAnimation = (animation) =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .setFrameAnimation(JSON.stringify(animation))
                                .then((result) =>
                                    getEditorResponseData(
                                        Object.assign(Object.assign({}, result), { data: JSON.stringify(animation) }),
                                    ),
                                );
                        })),
                    (this.play = () =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .playAnimation()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.pause = () =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .pauseAnimation()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setScrubberPosition = (timeInMS) =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .setScrubberPosition(timeInMS)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setDuration = (timeInMS) =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .setAnimationDuration(timeInMS)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetFrameAnimation = (id) =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .resetFrameAnimation(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.reset = () =>
                        AnimationController_awaiter(this, void 0, void 0, function* () {
                            return (yield AnimationController_classPrivateFieldGet(
                                this,
                                _AnimationController_editorAPI,
                                'f',
                            ))
                                .resetAnimation()
                                .then((result) => getEditorResponseData(result));
                        })),
                    AnimationController_classPrivateFieldSet(this, _AnimationController_editorAPI, children, 'f');
            }
        }
        _AnimationController_editorAPI = new WeakMap();
        var _CanvasController_editorAPI,
            CanvasController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            CanvasController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            CanvasController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class CanvasController {
            constructor(editorAPI) {
                _CanvasController_editorAPI.set(this, void 0),
                    (this.zoomToPage = (id, left, top, width, height) =>
                        CanvasController_awaiter(this, void 0, void 0, function* () {
                            return (yield CanvasController_classPrivateFieldGet(this, _CanvasController_editorAPI, 'f'))
                                .zoomToPage(id, left, top, width, height)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getZoomPercentage = () =>
                        CanvasController_awaiter(this, void 0, void 0, function* () {
                            return (yield CanvasController_classPrivateFieldGet(this, _CanvasController_editorAPI, 'f'))
                                .getZoomPercentage()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setZoomPercentage = (scaleFactor) =>
                        CanvasController_awaiter(this, void 0, void 0, function* () {
                            return (yield CanvasController_classPrivateFieldGet(this, _CanvasController_editorAPI, 'f'))
                                .setZoomPercentage(scaleFactor)
                                .then((result) => getEditorResponseData(result));
                        })),
                    CanvasController_classPrivateFieldSet(this, _CanvasController_editorAPI, editorAPI, 'f');
            }
        }
        _CanvasController_editorAPI = new WeakMap();
        var _CharacterStyleController_editorAPI,
            CharacterStyleController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            CharacterStyleController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            CharacterStyleController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class CharacterStyleController {
            constructor(editorAPI) {
                _CharacterStyleController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .getCharacterStyles()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (characterStyleId) =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .getCharacterStyleById(characterStyleId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = () =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .createCharacterStyle()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.update = (characterStyleId, characterStyle) =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .updateCharacterStyle(characterStyleId, JSON.stringify(characterStyle))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (characterStyleId) =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .removeCharacterStyle(characterStyleId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.duplicate = (characterStyleId) =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .duplicateCharacterStyle(characterStyleId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (characterStyleId, characterStyleName) =>
                        CharacterStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield CharacterStyleController_classPrivateFieldGet(
                                this,
                                _CharacterStyleController_editorAPI,
                                'f',
                            ))
                                .renameCharacterStyle(characterStyleId, characterStyleName)
                                .then((result) => getEditorResponseData(result));
                        })),
                    CharacterStyleController_classPrivateFieldSet(
                        this,
                        _CharacterStyleController_editorAPI,
                        editorAPI,
                        'f',
                    );
            }
        }
        _CharacterStyleController_editorAPI = new WeakMap();
        var _ColorStyleController_editorAPI,
            ColorStyleController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ColorStyleController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ColorStyleController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ColorStyleController {
            constructor(editorAPI) {
                _ColorStyleController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .getColors()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .getColorById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = () =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .createColor()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.duplicate = (id) =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .duplicateColor(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.move = (order, ids) =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .moveColors(order, ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (id, newColorName) =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .renameColor(id, newColorName)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.update = (id, newColorProperties) =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .updateColor(id, JSON.stringify(newColorProperties))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (id) =>
                        ColorStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorStyleController_classPrivateFieldGet(
                                this,
                                _ColorStyleController_editorAPI,
                                'f',
                            ))
                                .removeColor(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    ColorStyleController_classPrivateFieldSet(this, _ColorStyleController_editorAPI, editorAPI, 'f');
            }
        }
        _ColorStyleController_editorAPI = new WeakMap();
        var _ColorConversionController_editorAPI,
            ColorConversionController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ColorConversionController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ColorConversionController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ColorConversionController {
            constructor(editorAPI) {
                _ColorConversionController_editorAPI.set(this, void 0),
                    (this.convertToRgb = (color) =>
                        ColorConversionController_awaiter(this, void 0, void 0, function* () {
                            return (yield ColorConversionController_classPrivateFieldGet(
                                this,
                                _ColorConversionController_editorAPI,
                                'f',
                            ))
                                .colorToRgb(color)
                                .then((result) => getEditorResponseData(result));
                        })),
                    ColorConversionController_classPrivateFieldSet(
                        this,
                        _ColorConversionController_editorAPI,
                        editorAPI,
                        'f',
                    );
            }
        }
        _ColorConversionController_editorAPI = new WeakMap();
        var _ConfigurationController_editorAPI,
            DeprecatedMediaType,
            MediaType,
            ConnectorType,
            SortBy,
            SortOrder,
            ConnectorRegistrationSource,
            ConnectorMappingSource,
            ConnectorStateType,
            ConnectorEventType,
            ConfigurationController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ConfigurationController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ConfigurationController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ConfigurationController {
            constructor(editorAPI) {
                _ConfigurationController_editorAPI.set(this, void 0),
                    (this.getValue = (key) =>
                        ConfigurationController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConfigurationController_classPrivateFieldGet(
                                this,
                                _ConfigurationController_editorAPI,
                                'f',
                            ))
                                .getConfigValue(key)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setValue = (key, value) =>
                        ConfigurationController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConfigurationController_classPrivateFieldGet(
                                this,
                                _ConfigurationController_editorAPI,
                                'f',
                            ))
                                .setConfigValue(key, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.updateStudioOptions = (options) =>
                        ConfigurationController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConfigurationController_classPrivateFieldGet(
                                this,
                                _ConfigurationController_editorAPI,
                                'f',
                            ))
                                .updateStudioOptions(JSON.stringify(options))
                                .then((result) => getEditorResponseData(result));
                        })),
                    ConfigurationController_classPrivateFieldSet(
                        this,
                        _ConfigurationController_editorAPI,
                        editorAPI,
                        'f',
                    );
            }
        }
        (_ConfigurationController_editorAPI = new WeakMap()),
            (function (DeprecatedMediaType) {
                (DeprecatedMediaType[(DeprecatedMediaType.file = 0)] = 'file'),
                    (DeprecatedMediaType[(DeprecatedMediaType.collection = 1)] = 'collection');
            })(DeprecatedMediaType || (DeprecatedMediaType = {})),
            (function (MediaType) {
                (MediaType.file = 'file'), (MediaType.collection = 'collection');
            })(MediaType || (MediaType = {})),
            (function (ConnectorType) {
                (ConnectorType.media = 'media'), (ConnectorType.fonts = 'fonts');
            })(ConnectorType || (ConnectorType = {})),
            (function (SortBy) {
                (SortBy.name = 'name'), (SortBy.path = 'relativePath'), (SortBy.id = 'id');
            })(SortBy || (SortBy = {})),
            (function (SortOrder) {
                (SortOrder.ascending = 'asc'), (SortOrder.descending = 'desc');
            })(SortOrder || (SortOrder = {})),
            (function (ConnectorRegistrationSource) {
                (ConnectorRegistrationSource.url = 'url'),
                    (ConnectorRegistrationSource.grafx = 'grafx'),
                    (ConnectorRegistrationSource.local = 'local');
            })(ConnectorRegistrationSource || (ConnectorRegistrationSource = {}));
        class ConnectorMapping {
            constructor(contextProperty, mapFrom, sourceValue) {
                (this.name = contextProperty),
                    mapFrom === ConnectorMappingSource.variable
                        ? (this.value = `${mapFrom}.${sourceValue}`)
                        : (this.value = sourceValue);
            }
        }
        !(function (ConnectorMappingSource) {
            (ConnectorMappingSource.variable = 'var'), (ConnectorMappingSource.value = 'value');
        })(ConnectorMappingSource || (ConnectorMappingSource = {})),
            (function (ConnectorStateType) {
                (ConnectorStateType.loading = 'loading'),
                    (ConnectorStateType.loaded = 'loaded'),
                    (ConnectorStateType.running = 'running'),
                    (ConnectorStateType.ready = 'ready'),
                    (ConnectorStateType.error = 'error');
            })(ConnectorStateType || (ConnectorStateType = {})),
            (function (ConnectorEventType) {
                (ConnectorEventType.stateChanged = 'stateChanged'),
                    (ConnectorEventType.authChanged = 'authChanged'),
                    (ConnectorEventType.reloadRequired = 'reloadRequired'),
                    (ConnectorEventType.unloaded = 'unloaded');
            })(ConnectorEventType || (ConnectorEventType = {}));
        const grafxMediaConnectorRegistration = { url: 'grafx-media.json', source: ConnectorRegistrationSource.local };
        var _ConnectorController_editorAPI,
            _ConnectorConfigurator_connectorId,
            _ConnectorConfigurator_res,
            ConnectorController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ConnectorController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ConnectorController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ConnectorController {
            constructor(editorAPI) {
                _ConnectorController_editorAPI.set(this, void 0),
                    (this.getById = (id) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .getConnectorById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getAllByType = (type) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .getConnectors(type)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.register = (registration) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .registerConnector(JSON.stringify(registration))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.unregister = (id) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .unregisterConnector(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.configure = (id, configurationCallback) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            const res = yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            );
                            return (
                                yield this.waitToBeReady(id),
                                yield configurationCallback(new ConnectorConfigurator(id, res)),
                                res.updateConnectorConfiguration(id).then((result) => getEditorResponseData(result))
                            );
                        })),
                    (this.getState = (id) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .getConnectorState(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getMappings = (id) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .getConnectorMappings(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getOptions = (id) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield ConnectorController_classPrivateFieldGet(
                                this,
                                _ConnectorController_editorAPI,
                                'f',
                            ))
                                .getConnectorOptions(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.waitToBeReady = (id, timeoutMilliseconds = 2e3) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            let timeout = Math.max(timeoutMilliseconds, 500);
                            timeout = Math.min(timeout, 5e3);
                            let retries = 0;
                            try {
                                for (; 100 * retries < timeout; ) {
                                    const result = yield this.getState(id);
                                    if (
                                        result.success &&
                                        result.parsedData &&
                                        (result.parsedData.type === ConnectorStateType.running ||
                                            result.parsedData.type === ConnectorStateType.ready)
                                    )
                                        return getEditorResponseData(
                                            { data: null, success: !0, error: void 0, status: 0, parsedData: void 0 },
                                            !1,
                                        );
                                    yield new Promise((resolve) => setTimeout(resolve, 100)), retries++;
                                }
                            } catch (err) {
                                return getEditorResponseData(
                                    {
                                        data: null,
                                        success: !1,
                                        error: `Error while getting connector state ${err}`,
                                        status: 5e4,
                                        parsedData: void 0,
                                    },
                                    !1,
                                );
                            }
                            return getEditorResponseData(
                                {
                                    data: null,
                                    success: !1,
                                    error: 'Timed out waiting for connector',
                                    status: 5e4,
                                    parsedData: void 0,
                                },
                                !1,
                            );
                        })),
                    ConnectorController_classPrivateFieldSet(this, _ConnectorController_editorAPI, editorAPI, 'f');
            }
        }
        _ConnectorController_editorAPI = new WeakMap();
        class ConnectorConfigurator {
            constructor(id, res) {
                _ConnectorConfigurator_connectorId.set(this, void 0),
                    _ConnectorConfigurator_res.set(this, void 0),
                    (this.setOptions = (options) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return ConnectorController_classPrivateFieldGet(this, _ConnectorConfigurator_res, 'f')
                                .setConnectorOptions(
                                    ConnectorController_classPrivateFieldGet(
                                        this,
                                        _ConnectorConfigurator_connectorId,
                                        'f',
                                    ),
                                    JSON.stringify(options),
                                )
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setMappings = (mappings) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return getEditorResponseData(
                                yield ConnectorController_classPrivateFieldGet(
                                    this,
                                    _ConnectorConfigurator_res,
                                    'f',
                                ).setConnectorMappings(
                                    ConnectorController_classPrivateFieldGet(
                                        this,
                                        _ConnectorConfigurator_connectorId,
                                        'f',
                                    ),
                                    mappings.map(function (m) {
                                        return JSON.stringify(m);
                                    }),
                                ),
                            );
                        })),
                    (this.setChiliToken = (token) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return ConnectorController_classPrivateFieldGet(this, _ConnectorConfigurator_res, 'f')
                                .connectorAuthenticationSetChiliToken(
                                    ConnectorController_classPrivateFieldGet(
                                        this,
                                        _ConnectorConfigurator_connectorId,
                                        'f',
                                    ),
                                    token,
                                )
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setHttpHeader = (headerName, headerValue) =>
                        ConnectorController_awaiter(this, void 0, void 0, function* () {
                            return ConnectorController_classPrivateFieldGet(this, _ConnectorConfigurator_res, 'f')
                                .connectorAuthenticationSetHttpHeader(
                                    ConnectorController_classPrivateFieldGet(
                                        this,
                                        _ConnectorConfigurator_connectorId,
                                        'f',
                                    ),
                                    headerName,
                                    headerValue,
                                )
                                .then((result) => getEditorResponseData(result));
                        })),
                    ConnectorController_classPrivateFieldSet(this, _ConnectorConfigurator_connectorId, id, 'f'),
                    ConnectorController_classPrivateFieldSet(this, _ConnectorConfigurator_res, res, 'f');
            }
        }
        (_ConnectorConfigurator_connectorId = new WeakMap()), (_ConnectorConfigurator_res = new WeakMap());
        var _DebugController_editorAPI,
            DebugController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            DebugController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            DebugController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class DebugController {
            constructor(editorAPI) {
                _DebugController_editorAPI.set(this, void 0),
                    (this.getAllLogs = () =>
                        DebugController_awaiter(this, void 0, void 0, function* () {
                            return (yield DebugController_classPrivateFieldGet(this, _DebugController_editorAPI, 'f'))
                                .getLogs()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.toggleDebugPanel = () =>
                        DebugController_awaiter(this, void 0, void 0, function* () {
                            return (yield DebugController_classPrivateFieldGet(this, _DebugController_editorAPI, 'f'))
                                .toggleDebugPanel()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.enableDebug = () =>
                        DebugController_awaiter(this, void 0, void 0, function* () {
                            return (yield DebugController_classPrivateFieldGet(this, _DebugController_editorAPI, 'f'))
                                .enableDebug()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.disableDebug = () =>
                        DebugController_awaiter(this, void 0, void 0, function* () {
                            return (yield DebugController_classPrivateFieldGet(this, _DebugController_editorAPI, 'f'))
                                .disableDebug()
                                .then((result) => getEditorResponseData(result));
                        })),
                    DebugController_classPrivateFieldSet(this, _DebugController_editorAPI, editorAPI, 'f');
            }
        }
        _DebugController_editorAPI = new WeakMap();
        var _DocumentController_editorAPI,
            ImageSourceTypeEnum,
            FrameTypeEnum,
            TextDirection,
            FlowDirection,
            VerticalAlign,
            BlendMode,
            FitMode,
            UpdateZIndexMethod,
            DocumentController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            DocumentController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            DocumentController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class DocumentController {
            constructor(editorAPI) {
                _DocumentController_editorAPI.set(this, void 0),
                    (this.getCurrentState = () =>
                        DocumentController_awaiter(this, void 0, void 0, function* () {
                            return (yield DocumentController_classPrivateFieldGet(
                                this,
                                _DocumentController_editorAPI,
                                'f',
                            ))
                                .getCurrentDocumentState()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.load = (doc, options = { keepConnectors: !1 }) =>
                        DocumentController_awaiter(this, void 0, void 0, function* () {
                            const res = yield DocumentController_classPrivateFieldGet(
                                this,
                                _DocumentController_editorAPI,
                                'f',
                            );
                            return (options.keepConnectors ? res.loadDocumentKeepConnectors : res.loadDocument)(
                                'string' != typeof doc ? JSON.stringify(doc) : doc,
                            ).then((result) => getEditorResponseData(result));
                        })),
                    DocumentController_classPrivateFieldSet(this, _DocumentController_editorAPI, editorAPI, 'f');
            }
        }
        (_DocumentController_editorAPI = new WeakMap()),
            (function (ImageSourceTypeEnum) {
                (ImageSourceTypeEnum.url = 'url'),
                    (ImageSourceTypeEnum.variable = 'variable'),
                    (ImageSourceTypeEnum.connector = 'connector');
            })(ImageSourceTypeEnum || (ImageSourceTypeEnum = {})),
            (function (FrameTypeEnum) {
                (FrameTypeEnum.text = 'text'), (FrameTypeEnum.image = 'image'), (FrameTypeEnum.shape = 'shape');
            })(FrameTypeEnum || (FrameTypeEnum = {})),
            (function (TextDirection) {
                (TextDirection.leftToRight = 'leftToRight'),
                    (TextDirection.rightToLeft = 'rightToLeft'),
                    (TextDirection.weak = 'weak');
            })(TextDirection || (TextDirection = {})),
            (function (FlowDirection) {
                (FlowDirection.horizontal = 'horizontal'),
                    (FlowDirection.vertical = 'vertical'),
                    (FlowDirection.onPath = 'onPath');
            })(FlowDirection || (FlowDirection = {})),
            (function (VerticalAlign) {
                (VerticalAlign.top = 'top'),
                    (VerticalAlign.bottom = 'bottom'),
                    (VerticalAlign.middle = 'middle'),
                    (VerticalAlign.justify = 'justify');
            })(VerticalAlign || (VerticalAlign = {})),
            (function (BlendMode) {
                (BlendMode.normal = 'normal'),
                    (BlendMode.screen = 'screen'),
                    (BlendMode.overlay = 'overlay'),
                    (BlendMode.darken = 'darken'),
                    (BlendMode.lighten = 'lighten'),
                    (BlendMode.colorDodge = 'colorDodge'),
                    (BlendMode.colorBurn = 'colorBurn'),
                    (BlendMode.hardLight = 'hardLight'),
                    (BlendMode.softLight = 'softLight'),
                    (BlendMode.difference = 'difference'),
                    (BlendMode.exclusion = 'exclusion'),
                    (BlendMode.multiply = 'multiply'),
                    (BlendMode.hue = 'hue'),
                    (BlendMode.saturation = 'saturation'),
                    (BlendMode.color = 'color'),
                    (BlendMode.luminosity = 'luminosity');
            })(BlendMode || (BlendMode = {})),
            (function (FitMode) {
                (FitMode.fit = 'fit'), (FitMode.fill = 'fill');
            })(FitMode || (FitMode = {})),
            (function (UpdateZIndexMethod) {
                (UpdateZIndexMethod.bringToFront = 'bringToFront'),
                    (UpdateZIndexMethod.sendToBack = 'sendToBack'),
                    (UpdateZIndexMethod.bringForward = 'bringForward'),
                    (UpdateZIndexMethod.sendBackward = 'sendBackward');
            })(UpdateZIndexMethod || (UpdateZIndexMethod = {}));
        var _ExperimentController_editorAPI,
            ExperimentController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ExperimentController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ExperimentController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ExperimentController {
            constructor(editorAPI) {
                _ExperimentController_editorAPI.set(this, void 0),
                    (this.insertImageVariableToFrame = (imageFrameId, variableId) =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            const res = yield ExperimentController_classPrivateFieldGet(
                                    this,
                                    _ExperimentController_editorAPI,
                                    'f',
                                ),
                                src = { id: variableId, type: ImageSourceTypeEnum.variable };
                            return res
                                .setImageSource(imageFrameId, JSON.stringify(src))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.insertTextVariable = (id) =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            return (yield ExperimentController_classPrivateFieldGet(
                                this,
                                _ExperimentController_editorAPI,
                                'f',
                            ))
                                .insertTextVariable(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.enterTextEditMode = (id) =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            return (yield ExperimentController_classPrivateFieldGet(
                                this,
                                _ExperimentController_editorAPI,
                                'f',
                            ))
                                .enterTextEditMode(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.exitTextEditMode = () =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            return (yield ExperimentController_classPrivateFieldGet(
                                this,
                                _ExperimentController_editorAPI,
                                'f',
                            ))
                                .exitTextEditMode()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getText = (frameId, textType) =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            return (yield ExperimentController_classPrivateFieldGet(
                                this,
                                _ExperimentController_editorAPI,
                                'f',
                            ))
                                .getTextByFrameId(frameId, textType)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setText = (frameId, text) =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            return (yield ExperimentController_classPrivateFieldGet(
                                this,
                                _ExperimentController_editorAPI,
                                'f',
                            ))
                                .setTextByFrameId(frameId, text)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.selectText = (frameId, startIndex, length) =>
                        ExperimentController_awaiter(this, void 0, void 0, function* () {
                            return (yield ExperimentController_classPrivateFieldGet(
                                this,
                                _ExperimentController_editorAPI,
                                'f',
                            ))
                                .selectTextById(frameId, startIndex, length)
                                .then((result) => getEditorResponseData(result));
                        })),
                    ExperimentController_classPrivateFieldSet(this, _ExperimentController_editorAPI, editorAPI, 'f');
            }
        }
        _ExperimentController_editorAPI = new WeakMap();
        var _FontConnectorController_editorAPI,
            _FontConnectorController_blobAPI,
            FontConnectorController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            FontConnectorController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            FontConnectorController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class FontConnectorController {
            constructor(editorAPI) {
                _FontConnectorController_editorAPI.set(this, void 0),
                    _FontConnectorController_blobAPI.set(this, void 0),
                    (this.query = (connectorId, queryOptions, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorQuery(connectorId, JSON.stringify(queryOptions), JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.detail = (connectorId, fontFamilyId, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorDetail(connectorId, fontFamilyId, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.download = (connectorId, fontStyleId, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_blobAPI,
                                'f',
                            ))
                                .fontConnectorDownload(connectorId, fontStyleId, JSON.stringify(context))
                                .then((result) => {
                                    var _a;
                                    return null !== (_a = result) && void 0 !== _a ? _a : result;
                                });
                        })),
                    (this.preview = (connectorId, fontFamilyId, previewFormat, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_blobAPI,
                                'f',
                            ))
                                .fontConnectorPreview(connectorId, fontFamilyId, previewFormat, JSON.stringify(context))
                                .then((result) => {
                                    var _a;
                                    return null !== (_a = result) && void 0 !== _a ? _a : result;
                                });
                        })),
                    (this.upload = (connectorId, fontStyleId, blob, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorUpload(connectorId, fontStyleId, blob, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (connectorId, fontStyleId, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorRemove(connectorId, fontStyleId, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.copy = (connectorId, fontStyleId, newName, context = {}) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorCopy(connectorId, fontStyleId, newName, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getConfigurationOptions = (connectorId) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorGetConfigurationOptions(connectorId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getCapabilities = (connectorId) =>
                        FontConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontConnectorController_classPrivateFieldGet(
                                this,
                                _FontConnectorController_editorAPI,
                                'f',
                            ))
                                .fontConnectorGetCapabilities(connectorId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.parseDeprecatedFontType = (deprecatedType) =>
                        deprecatedType === DeprecatedMediaType.file
                            ? MediaType.file
                            : deprecatedType === DeprecatedMediaType.collection
                            ? MediaType.collection
                            : void 0),
                    FontConnectorController_classPrivateFieldSet(
                        this,
                        _FontConnectorController_editorAPI,
                        editorAPI,
                        'f',
                    ),
                    FontConnectorController_classPrivateFieldSet(
                        this,
                        _FontConnectorController_blobAPI,
                        editorAPI,
                        'f',
                    );
            }
        }
        (_FontConnectorController_editorAPI = new WeakMap()), (_FontConnectorController_blobAPI = new WeakMap());
        var _FontController_editorAPI,
            FontController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            FontController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            FontController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class FontController {
            constructor(editorAPI) {
                _FontController_editorAPI.set(this, void 0),
                    (this.addFontFamily = (connectorId, fontFamily) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .addFontFamily(connectorId, JSON.stringify(fontFamily))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.removeFontFamily = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .removeFontFamily(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.addFontStyle = (connectorId, fontStyle) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .addFontStyle(connectorId, JSON.stringify(fontStyle))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.removeFontStyle = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .removeFontStyle(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getFontFamilies = () =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .getFontFamilies()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getFontStyles = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .getFontStyles(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getFontFamilyById = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .getFontFamilyById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getFontStyleById = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .getFontStyleById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getDefaultFontStyle = () =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .getDefaultFontStyle()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.isFontFamilyUsed = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .isFontFamilyUsed(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.isFontStyleUsed = (id) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .isFontStyleUsed(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.moveFontFamilies = (order, ids) =>
                        FontController_awaiter(this, void 0, void 0, function* () {
                            return (yield FontController_classPrivateFieldGet(this, _FontController_editorAPI, 'f'))
                                .moveFontFamilies(order, ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    FontController_classPrivateFieldSet(this, _FontController_editorAPI, editorAPI, 'f');
            }
        }
        _FontController_editorAPI = new WeakMap();
        var _ShapeController_editorAPI,
            ShapeController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ShapeController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ShapeController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ShapeController {
            constructor(editorAPI) {
                _ShapeController_editorAPI.set(this, void 0),
                    (this.setShapeProperties = (id, properties) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            return (yield ShapeController_classPrivateFieldGet(this, _ShapeController_editorAPI, 'f'))
                                .setShapeProperties(id, JSON.stringify(properties))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setEnableFill = (id, enableFill) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const properties = { enableFill };
                            return this.setShapeProperties(id, properties);
                        })),
                    (this.setFillColor = (id, fillColor) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const properties = { fillColor };
                            return this.setShapeProperties(id, properties);
                        })),
                    (this.setEnableStroke = (id, enableStroke) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const properties = { enableStroke };
                            return this.setShapeProperties(id, properties);
                        })),
                    (this.setStrokeColor = (id, strokeColor) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const properties = { strokeColor };
                            return this.setShapeProperties(id, properties);
                        })),
                    (this.setStrokeWeight = (id, strokeWeight) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const properties = { strokeWeight };
                            return this.setShapeProperties(id, properties);
                        })),
                    (this.setFlagAllCornersSame = (id, allCornersSame) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const properties = { allCornersSame };
                            return this.setShapeProperties(id, properties);
                        })),
                    (this.setShapeCorners = (id, radius) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            return (yield ShapeController_classPrivateFieldGet(this, _ShapeController_editorAPI, 'f'))
                                .setShapeCorners(id, JSON.stringify(radius))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setRadiusAll = (id, radius) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const cornerRadius = { radiusAll: radius };
                            return this.setShapeCorners(id, cornerRadius);
                        })),
                    (this.setRadiusTopLeft = (id, radius) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const cornerRadius = { topLeft: radius };
                            return this.setShapeCorners(id, cornerRadius);
                        })),
                    (this.setRadiusBottomLeft = (id, radius) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const cornerRadius = { bottomLeft: radius };
                            return this.setShapeCorners(id, cornerRadius);
                        })),
                    (this.setRadiusTopRight = (id, radius) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const cornerRadius = { topRight: radius };
                            return this.setShapeCorners(id, cornerRadius);
                        })),
                    (this.setRadiusBottomRight = (id, radius) =>
                        ShapeController_awaiter(this, void 0, void 0, function* () {
                            const cornerRadius = { bottomRight: radius };
                            return this.setShapeCorners(id, cornerRadius);
                        })),
                    ShapeController_classPrivateFieldSet(this, _ShapeController_editorAPI, editorAPI, 'f');
            }
        }
        _ShapeController_editorAPI = new WeakMap();
        var _FrameController_editorAPI,
            FrameController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            FrameController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            FrameController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class FrameController {
            constructor(editorAPI) {
                _FrameController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFrames()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getSelected = () =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getSelectedFrames()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getAllByPageId = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFramesByPageId(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getByName = (name) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFrameByName(name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFrameById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getPropertiesOnSelectedLayout = () =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFramePropertiesOnSelectedLayout()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getLayoutProperties = (id, layoutId) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFramePropertiesByFrameId(id, layoutId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getAllLayoutProperties = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .getFramesProperties(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetSize = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrameSize(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.select = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .selectFrames([id])
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.selectMultiple = (ids) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .selectFrames(ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.reorderFrames = (order, ids) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .reorderFrames(order, ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setZIndex = (id, method) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameZIndex(id, method)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setHeight = (id, height) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameHeight(id, height)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setRotation = (id, rotation) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameRotation(id, rotation)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setWidth = (id, width) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameWidth(id, width)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setX = (id, XValue) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameX(id, XValue)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setY = (id, YValue) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameY(id, YValue)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (id, name) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .renameFrame(id, name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.reset = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrame(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetX = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrameX(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetY = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrameY(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetRotation = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrameRotation(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetWidth = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrameWidth(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetHeight = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetFrameHeight(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetImageFrameFitMode = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetImageFrameFitMode(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setVisibility = (id, value) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameIsVisible(id, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setIsVisible = (id, value) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameIsVisible(id, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .removeFrame(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = (type, x, y, width, height) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .addFrame(type, x, y, width, height)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.createShapeFrame = (type, x, y, width, height) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .addFrame(type, x, y, width, height)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.updateImageSource = (imageFrameId, src) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            const res = yield FrameController_classPrivateFieldGet(
                                    this,
                                    _FrameController_editorAPI,
                                    'f',
                                ),
                                srcJson = null !== src ? JSON.stringify(src) : null;
                            return res
                                .setImageSource(imageFrameId, srcJson)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.removeImageSource = (imageFrameId) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return this.updateImageSource(imageFrameId, null);
                        })),
                    (this.setImageFromConnector = (imageFrameId, connectorId, assetId) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            const src = { id: connectorId, assetId, type: ImageSourceTypeEnum.connector };
                            return this.updateImageSource(imageFrameId, src);
                        })),
                    (this.setImageFromUrl = (imageFrameId, url) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            const source = { url, type: ImageSourceTypeEnum.url };
                            return this.updateImageSource(imageFrameId, source);
                        })),
                    (this.setImageFrameFitMode = (imageFrameId, fitMode) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setImageFrameFitMode(imageFrameId, fitMode)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setFrameConstrainProportions = (id, constrainProportions) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameConstrainProportions(id, constrainProportions)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setVerticalAlign = (id, verticalAlign) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setVerticalAlignment(id, verticalAlign)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setMinCopyfitting = (id, value) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setMinCopyfitting(id, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setMaxCopyfitting = (id, value) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setMaxCopyfitting(id, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setEnableCopyfitting = (id, value) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setEnableCopyfitting(id, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetMinCopyfitting = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetMinCopyfitting(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetMaxCopyfitting = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetMaxCopyfitting(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetEnableCopyfitting = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetEnableCopyfitting(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setShapeFrameEnableFill = (shapeFrameId, enableFill) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return this.shapeController.setEnableFill(shapeFrameId, enableFill);
                        })),
                    (this.setShapeFrameFillColor = (shapeFrameId, fillColor) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return this.shapeController.setFillColor(shapeFrameId, fillColor);
                        })),
                    (this.setShapeFrameEnableStroke = (shapeFrameId, enableStroke) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return this.shapeController.setEnableStroke(shapeFrameId, enableStroke);
                        })),
                    (this.setShapeFrameStrokeColor = (shapeFrameId, strokeColor) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return this.shapeController.setStrokeColor(shapeFrameId, strokeColor);
                        })),
                    (this.setShapeFrameStrokeWeight = (shapeFrameId, strokeWeight) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return this.shapeController.setStrokeWeight(shapeFrameId, strokeWeight);
                        })),
                    (this.setBlendMode = (id, blendMode) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .setFrameBlendMode(id, blendMode)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.enterCropMode = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .enterCropMode(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.applyCropMode = () =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .applyCropMode()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetCropMode = (id) =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .resetCropMode(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.exitCropMode = () =>
                        FrameController_awaiter(this, void 0, void 0, function* () {
                            return (yield FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'))
                                .cancelCropMode()
                                .then((result) => getEditorResponseData(result));
                        })),
                    FrameController_classPrivateFieldSet(this, _FrameController_editorAPI, editorAPI, 'f'),
                    (this.shapeController = new ShapeController(
                        FrameController_classPrivateFieldGet(this, _FrameController_editorAPI, 'f'),
                    ));
            }
        }
        _FrameController_editorAPI = new WeakMap();
        var _LayoutController_editorAPI,
            _LayoutController_blobAPI,
            LayoutController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            LayoutController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            LayoutController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class LayoutController {
            constructor(editorAPI) {
                _LayoutController_editorAPI.set(this, void 0),
                    _LayoutController_blobAPI.set(this, void 0),
                    (this.getAll = () =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .getLayouts()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .getLayoutById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getByName = (name) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .getLayoutByName(name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getSelected = () =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .getSelectedLayout()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .removeLayout(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = (parentId) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .addLayout(parentId)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (id, name) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .renameLayout(id, name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.select = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .selectLayout(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.duplicate = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .duplicateLayout(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.reset = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .resetLayout(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setHeight = (id, height) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .setLayoutHeight(id, height)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setWidth = (id, width) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .setLayoutWidth(id, width)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetHeight = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .resetLayoutHeight(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.resetWidth = (id) =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_editorAPI, 'f'))
                                .resetLayoutWidth(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getSelectedSnapshot = () =>
                        LayoutController_awaiter(this, void 0, void 0, function* () {
                            return (yield LayoutController_classPrivateFieldGet(this, _LayoutController_blobAPI, 'f'))
                                .getPageSnapshot()
                                .then((result) => {
                                    var _a;
                                    return null !== (_a = result) && void 0 !== _a ? _a : result;
                                });
                        })),
                    LayoutController_classPrivateFieldSet(this, _LayoutController_editorAPI, editorAPI, 'f'),
                    LayoutController_classPrivateFieldSet(this, _LayoutController_blobAPI, editorAPI, 'f');
            }
        }
        (_LayoutController_editorAPI = new WeakMap()), (_LayoutController_blobAPI = new WeakMap());
        var _MediaConnectorController_editorAPI,
            _MediaConnectorController_blobAPI,
            MediaConnectorController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            MediaConnectorController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            MediaConnectorController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class MediaConnectorController {
            constructor(editorAPI) {
                _MediaConnectorController_editorAPI.set(this, void 0),
                    _MediaConnectorController_blobAPI.set(this, void 0),
                    (this.query = (id, queryOptions, context = {}) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorQuery(id, JSON.stringify(queryOptions), JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.detail = (id, mediaId, context = {}) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorDetail(id, mediaId, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.download = (id, mediaId, downloadType, context = {}) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_blobAPI,
                                'f',
                            ))
                                .mediaConnectorDownload(id, mediaId, downloadType, JSON.stringify(context))
                                .then((result) => {
                                    var _a;
                                    return null !== (_a = result) && void 0 !== _a ? _a : result;
                                });
                        })),
                    (this.upload = (id, mediaId, blob, context = {}) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorUpload(id, mediaId, blob, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (id, mediaId, context = {}) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorRemove(id, mediaId, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.copy = (id, mediaId, newName, context = {}) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorCopy(id, mediaId, newName, JSON.stringify(context))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getConfigurationOptions = (id) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorGetConfigurationOptions(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getCapabilities = (id) =>
                        MediaConnectorController_awaiter(this, void 0, void 0, function* () {
                            return (yield MediaConnectorController_classPrivateFieldGet(
                                this,
                                _MediaConnectorController_editorAPI,
                                'f',
                            ))
                                .mediaConnectorGetCapabilities(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.parseDeprecatedMediaType = (deprecatedType) =>
                        deprecatedType === DeprecatedMediaType.file
                            ? MediaType.file
                            : deprecatedType === DeprecatedMediaType.collection
                            ? MediaType.collection
                            : void 0),
                    MediaConnectorController_classPrivateFieldSet(
                        this,
                        _MediaConnectorController_editorAPI,
                        editorAPI,
                        'f',
                    ),
                    MediaConnectorController_classPrivateFieldSet(
                        this,
                        _MediaConnectorController_blobAPI,
                        editorAPI,
                        'f',
                    );
            }
        }
        (_MediaConnectorController_editorAPI = new WeakMap()), (_MediaConnectorController_blobAPI = new WeakMap());
        var _PageController_editorAPI,
            PageController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            PageController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            PageController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class PageController {
            constructor(editorAPI) {
                _PageController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        PageController_awaiter(this, void 0, void 0, function* () {
                            return (yield PageController_classPrivateFieldGet(this, _PageController_editorAPI, 'f'))
                                .getPages()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        PageController_awaiter(this, void 0, void 0, function* () {
                            return (yield PageController_classPrivateFieldGet(this, _PageController_editorAPI, 'f'))
                                .getPageById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setWidth = (id, width) =>
                        PageController_awaiter(this, void 0, void 0, function* () {
                            return (yield PageController_classPrivateFieldGet(this, _PageController_editorAPI, 'f'))
                                .setPageWidth(id, width)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setHeight = (id, height) =>
                        PageController_awaiter(this, void 0, void 0, function* () {
                            return (yield PageController_classPrivateFieldGet(this, _PageController_editorAPI, 'f'))
                                .setPageHeight(id, height)
                                .then((result) => getEditorResponseData(result));
                        })),
                    PageController_classPrivateFieldSet(this, _PageController_editorAPI, editorAPI, 'f');
            }
        }
        _PageController_editorAPI = new WeakMap();
        var _ParagraphStyleController_editorAPI,
            ParagraphStyleController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ParagraphStyleController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ParagraphStyleController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ParagraphStyleController {
            constructor(editorAPI) {
                _ParagraphStyleController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .getParagraphStyles()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .getParagraphStyleById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = () =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .createParagraphStyle()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.duplicate = (id) =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .duplicateParagraphStyle(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.update = (id, properties) =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .updateParagraphStyle(id, JSON.stringify(properties))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (id, name) =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .renameParagraphStyle(id, name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (id) =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .removeParagraphStyle(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.move = (order, ids) =>
                        ParagraphStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield ParagraphStyleController_classPrivateFieldGet(
                                this,
                                _ParagraphStyleController_editorAPI,
                                'f',
                            ))
                                .moveParagraphStyles(order, ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    ParagraphStyleController_classPrivateFieldSet(
                        this,
                        _ParagraphStyleController_editorAPI,
                        editorAPI,
                        'f',
                    );
            }
        }
        _ParagraphStyleController_editorAPI = new WeakMap();
        class SubscriberController {
            constructor(config) {
                (this.onActionsChanged = (actions) => {
                    const callBack = this.config.onActionsChanged;
                    callBack && callBack(JSON.parse(actions));
                }),
                    (this.onAnimationChanged = (animation) => {
                        const callBack = this.config.onFrameAnimationsChanged;
                        callBack && callBack(JSON.parse(animation));
                    }),
                    (this.onAnimationPlaybackChanged = (animationPlaybackState) => {
                        const callBack = this.config.onScrubberPositionChanged;
                        callBack && callBack(JSON.parse(animationPlaybackState));
                    }),
                    (this.onSelectedLayoutPropertiesChanged = (layoutProperties) => {
                        const callBack = this.config.onSelectedLayoutPropertiesChanged;
                        callBack && callBack(JSON.parse(layoutProperties));
                    }),
                    (this.onSelectedFrameLayoutChanged = (frameLayout) => {
                        const callBack = this.config.onSelectedFrameLayoutChanged;
                        callBack && callBack(JSON.parse(frameLayout));
                    }),
                    (this.onSelectedFrameContentChanged = (frameContent) => {
                        const callBack = this.config.onSelectedFrameContentChanged;
                        callBack && callBack(JSON.parse(frameContent));
                    }),
                    (this.onStateChanged = () => {
                        const callBack = this.config.onStateChanged;
                        callBack && callBack();
                    }),
                    (this.onDocumentLoaded = () => {
                        const callBack = this.config.onDocumentLoaded;
                        callBack && callBack();
                    }),
                    (this.onPageSelectionChanged = () => {
                        const callBack = this.config.onPageSelectionChanged;
                        callBack && callBack();
                    }),
                    (this.onVariableListChanged = (variablesJson) => {
                        const callBack = this.config.onVariableListChanged;
                        callBack && callBack(JSON.parse(variablesJson));
                    }),
                    (this.onSelectedToolChanged = (tool) => {
                        const callBack = this.config.onSelectedToolChanged;
                        callBack && callBack(tool);
                    }),
                    (this.onUndoStateChanged = (undoState) => {
                        const callBack = this.config.onUndoStackStateChanged;
                        callBack && callBack(JSON.parse(undoState));
                    }),
                    (this.onSelectedLayoutFramesChanged = (layoutFrames) => {
                        const callBack = this.config.onSelectedLayoutFramesChanged;
                        callBack && callBack(JSON.parse(layoutFrames));
                    }),
                    (this.onSelectedTextStyleChanged = (styles) => {
                        const callBack = this.config.onSelectedTextStyleChanged;
                        callBack && callBack(JSON.parse(styles));
                    }),
                    (this.onColorsChanged = (colors) => {
                        const callBack = this.config.onColorsChanged;
                        callBack && callBack(JSON.parse(colors));
                    }),
                    (this.onParagraphStylesChanged = (paragraphStyles) => {
                        const callBack = this.config.onParagraphStylesChanged;
                        callBack && callBack(JSON.parse(paragraphStyles));
                    }),
                    (this.onCharacterStylesChanged = (characterStyles) => {
                        const callBack = this.config.onCharacterStylesChanged;
                        callBack && callBack(JSON.parse(characterStyles));
                    }),
                    (this.onFontFamiliesChanged = (fonts) => {
                        const callBack = this.config.onFontFamiliesChanged;
                        callBack && callBack(JSON.parse(fonts));
                    }),
                    (this.onSelectedLayoutIdChanged = (id) => {
                        const callBack = this.config.onSelectedLayoutIdChanged;
                        callBack && callBack(id);
                    }),
                    (this.onLayoutsChanged = (layouts) => {
                        const callBack = this.config.onLayoutsChanged;
                        callBack && callBack(JSON.parse(layouts));
                    }),
                    (this.onZoomChanged = (zoom) => {
                        const callBack = this.config.onZoomChanged;
                        callBack && callBack(JSON.parse(zoom));
                    }),
                    (this.onConnectorEvent = (connectorEvent) => {
                        const callBack = this.config.onConnectorEvent;
                        callBack && callBack(JSON.parse(connectorEvent));
                    }),
                    (this.onPageSizeChanged = (pageSize) => {
                        const callBack = this.config.onPageSizeChanged;
                        callBack && callBack(JSON.parse(pageSize));
                    }),
                    (this.onShapeCornerRadiusChanged = (cornerRadius) => {
                        const callBack = this.config.onShapeCornerRadiusChanged;
                        callBack && callBack(JSON.parse(cornerRadius));
                    }),
                    (this.onCropActiveFrameIdChanged = (id) => {
                        const callBack = this.config.onCropActiveFrameIdChanged;
                        callBack && callBack(id);
                    }),
                    (this.onAsyncError = (asyncError) => {
                        const callBack = this.config.onAsyncError;
                        callBack && callBack(JSON.parse(asyncError));
                    }),
                    (this.config = config);
            }
        }
        var _TextStyleController_editorAPI,
            FramePropertyNames,
            LayoutPropertyNames,
            ToolType,
            DownloadFormats,
            EnvironmentType,
            TextStyleController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            TextStyleController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            TextStyleController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class TextStyleController {
            constructor(editorAPI) {
                _TextStyleController_editorAPI.set(this, void 0),
                    (this.set = (style) =>
                        TextStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield TextStyleController_classPrivateFieldGet(
                                this,
                                _TextStyleController_editorAPI,
                                'f',
                            ))
                                .selectedTextStyleDeltaUpdate(JSON.stringify(style))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.removeSelected = () =>
                        TextStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield TextStyleController_classPrivateFieldGet(
                                this,
                                _TextStyleController_editorAPI,
                                'f',
                            ))
                                .selectedTextStyleClean()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getSelected = () =>
                        TextStyleController_awaiter(this, void 0, void 0, function* () {
                            return (yield TextStyleController_classPrivateFieldGet(
                                this,
                                _TextStyleController_editorAPI,
                                'f',
                            ))
                                .getSelectedTextStyle()
                                .then((result) => getEditorResponseData(result));
                        })),
                    TextStyleController_classPrivateFieldSet(this, _TextStyleController_editorAPI, editorAPI, 'f');
            }
        }
        (_TextStyleController_editorAPI = new WeakMap()),
            (function (FramePropertyNames) {
                (FramePropertyNames.FRAME_X = 'frameX'),
                    (FramePropertyNames.FRAME_Y = 'frameY'),
                    (FramePropertyNames.WIDTH = 'width'),
                    (FramePropertyNames.HEIGHT = 'height'),
                    (FramePropertyNames.FRAME_ROTATION = 'frameRotation');
            })(FramePropertyNames || (FramePropertyNames = {})),
            (function (LayoutPropertyNames) {
                (LayoutPropertyNames.LAYOUT_HEIGHT = 'layoutHeight'),
                    (LayoutPropertyNames.LAYOUT_WIDTH = 'layoutWidth');
            })(LayoutPropertyNames || (LayoutPropertyNames = {})),
            (function (ToolType) {
                (ToolType.SELECT = 'select'),
                    (ToolType.ZOOM = 'zoom'),
                    (ToolType.HAND = 'hand'),
                    (ToolType.IMAGE_FRAME = 'imageFrame'),
                    (ToolType.TEXT_FRAME = 'textFrame'),
                    (ToolType.SHAPE_RECT = 'rect'),
                    (ToolType.SHAPE_ELLIPSE = 'ellipse'),
                    (ToolType.SHAPE_POLYGON = 'polygon');
            })(ToolType || (ToolType = {})),
            (function (DownloadFormats) {
                (DownloadFormats.MP4 = 'mp4'),
                    (DownloadFormats.GIF = 'gif'),
                    (DownloadFormats.PNG = 'png'),
                    (DownloadFormats.JPG = 'jpg'),
                    (DownloadFormats.EXPERIMENTAL_PDF = 'pdf');
            })(DownloadFormats || (DownloadFormats = {})),
            (function (EnvironmentType) {
                (EnvironmentType.SANDBOX = 'sandbox'), (EnvironmentType.PRODUCTION = 'online');
            })(EnvironmentType || (EnvironmentType = {}));
        var _ToolController_editorAPI,
            ToolController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            ToolController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            ToolController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class ToolController {
            constructor(editorAPI) {
                _ToolController_editorAPI.set(this, void 0),
                    (this.setTool = (tool) =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return (yield ToolController_classPrivateFieldGet(this, _ToolController_editorAPI, 'f'))
                                .setTool(tool)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getSelected = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return (yield ToolController_classPrivateFieldGet(this, _ToolController_editorAPI, 'f'))
                                .getSelectedTool()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setPointer = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.SELECT);
                        })),
                    (this.setHand = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.HAND);
                        })),
                    (this.setZoom = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            yield this.setTool(ToolType.ZOOM);
                        })),
                    (this.setTextFrame = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.TEXT_FRAME);
                        })),
                    (this.setImageFrame = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.IMAGE_FRAME);
                        })),
                    (this.setShapeRect = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.SHAPE_RECT);
                        })),
                    (this.setShapeEllipse = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.SHAPE_ELLIPSE);
                        })),
                    (this.setShapePolygon = () =>
                        ToolController_awaiter(this, void 0, void 0, function* () {
                            return this.setTool(ToolType.SHAPE_POLYGON);
                        })),
                    ToolController_classPrivateFieldSet(this, _ToolController_editorAPI, editorAPI, 'f');
            }
        }
        _ToolController_editorAPI = new WeakMap();
        var _UndoManagerController_editorAPI,
            _UndoManagerController_advanced,
            _UndoManagerController_sdk,
            _AdvancedUndoManagerController_editorAPI,
            UndoManagerController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            UndoManagerController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            UndoManagerController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class UndoManagerController {
            constructor(children, sdk) {
                _UndoManagerController_editorAPI.set(this, void 0),
                    _UndoManagerController_advanced.set(this, void 0),
                    _UndoManagerController_sdk.set(this, void 0),
                    (this.undo = () =>
                        UndoManagerController_awaiter(this, void 0, void 0, function* () {
                            return (yield UndoManagerController_classPrivateFieldGet(
                                this,
                                _UndoManagerController_editorAPI,
                                'f',
                            ))
                                .undo()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.redo = () =>
                        UndoManagerController_awaiter(this, void 0, void 0, function* () {
                            return (yield UndoManagerController_classPrivateFieldGet(
                                this,
                                _UndoManagerController_editorAPI,
                                'f',
                            ))
                                .redo()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.record = (operationName, undoOperationCallback) =>
                        UndoManagerController_awaiter(this, void 0, void 0, function* () {
                            try {
                                yield UndoManagerController_classPrivateFieldGet(
                                    this,
                                    _UndoManagerController_advanced,
                                    'f',
                                ).begin(operationName),
                                    yield undoOperationCallback(
                                        UndoManagerController_classPrivateFieldGet(
                                            this,
                                            _UndoManagerController_sdk,
                                            'f',
                                        ),
                                    );
                            } catch (error) {
                                throw error;
                            } finally {
                                yield UndoManagerController_classPrivateFieldGet(
                                    this,
                                    _UndoManagerController_advanced,
                                    'f',
                                ).end();
                            }
                        })),
                    UndoManagerController_classPrivateFieldSet(this, _UndoManagerController_editorAPI, children, 'f'),
                    UndoManagerController_classPrivateFieldSet(this, _UndoManagerController_sdk, sdk, 'f'),
                    UndoManagerController_classPrivateFieldSet(
                        this,
                        _UndoManagerController_advanced,
                        new AdvancedUndoManagerController(children),
                        'f',
                    );
            }
        }
        (_UndoManagerController_editorAPI = new WeakMap()),
            (_UndoManagerController_advanced = new WeakMap()),
            (_UndoManagerController_sdk = new WeakMap());
        class AdvancedUndoManagerController {
            constructor(children) {
                _AdvancedUndoManagerController_editorAPI.set(this, void 0),
                    (this.begin = (operationName) =>
                        UndoManagerController_awaiter(this, void 0, void 0, function* () {
                            return (yield UndoManagerController_classPrivateFieldGet(
                                this,
                                _AdvancedUndoManagerController_editorAPI,
                                'f',
                            ))
                                .begin(operationName)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.beginIfNoneActive = (operationName) =>
                        UndoManagerController_awaiter(this, void 0, void 0, function* () {
                            return (yield UndoManagerController_classPrivateFieldGet(
                                this,
                                _AdvancedUndoManagerController_editorAPI,
                                'f',
                            ))
                                .beginIfNoneActive(operationName)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.end = () =>
                        UndoManagerController_awaiter(this, void 0, void 0, function* () {
                            return (yield UndoManagerController_classPrivateFieldGet(
                                this,
                                _AdvancedUndoManagerController_editorAPI,
                                'f',
                            ))
                                .end()
                                .then((result) => getEditorResponseData(result));
                        })),
                    UndoManagerController_classPrivateFieldSet(
                        this,
                        _AdvancedUndoManagerController_editorAPI,
                        children,
                        'f',
                    );
            }
        }
        _AdvancedUndoManagerController_editorAPI = new WeakMap();
        const round = (val, precision = 2) => {
            const hundred = Math.pow(10, precision);
            return Math.round(val * hundred) / hundred;
        };
        class UtilsController {
            constructor() {
                (this.round = (val, precision) =>
                    getEditorResponseData({
                        data: String(round(val, precision)),
                        success: !0,
                        status: 200,
                        parsedData: null,
                    })),
                    (this.createEnvironmentBaseURL = (parameters) => {
                        const {
                            type = EnvironmentType.SANDBOX,
                            environment = 'ft-nostress',
                            version = '1',
                        } = parameters;
                        return `https://${environment}.${
                            type == EnvironmentType.SANDBOX ? 'chili-publish-sandbox' : 'chili-publish'
                        }.online/grafx/api/v${version}/environment/${environment}`;
                    });
            }
        }
        var _VariableController_editorAPI,
            VariableController_awaiter = function (thisArg, _arguments, P, generator) {
                return new (P || (P = Promise))(function (resolve, reject) {
                    function fulfilled(value) {
                        try {
                            step(generator.next(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function rejected(value) {
                        try {
                            step(generator.throw(value));
                        } catch (e) {
                            reject(e);
                        }
                    }
                    function step(result) {
                        var value;
                        result.done
                            ? resolve(result.value)
                            : ((value = result.value),
                              value instanceof P
                                  ? value
                                  : new P(function (resolve) {
                                        resolve(value);
                                    })).then(fulfilled, rejected);
                    }
                    step((generator = generator.apply(thisArg, _arguments || [])).next());
                });
            },
            VariableController_classPrivateFieldSet = function (receiver, state, value, kind, f) {
                if ('m' === kind) throw new TypeError('Private method is not writable');
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a setter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot write private member to an object whose class did not declare it');
                return (
                    'a' === kind ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value
                );
            },
            VariableController_classPrivateFieldGet = function (receiver, state, kind, f) {
                if ('a' === kind && !f) throw new TypeError('Private accessor was defined without a getter');
                if ('function' == typeof state ? receiver !== state || !f : !state.has(receiver))
                    throw new TypeError('Cannot read private member from an object whose class did not declare it');
                return 'm' === kind ? f : 'a' === kind ? f.call(receiver) : f ? f.value : state.get(receiver);
            };
        class VariableController {
            constructor(editorAPI) {
                _VariableController_editorAPI.set(this, void 0),
                    (this.getAll = () =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .getVariables()
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getById = (id) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .getVariableById(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getByName = (name) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .getVariableByName(name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.create = (parentId, type) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .addVariable(parentId, type)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.remove = (ids) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .removeVariables(ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.rename = (id, name) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableName(id, name)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setLabel = (id, label) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableLabel(id, label)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setType = (id, type) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableType(id, type)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setListVariable = (id, items) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setListVariableItems(id, items)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setValue = (id, value) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableValue(id, value)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.duplicate = (id) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .duplicateVariable(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.groupVariables = (name, ids) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .groupVariables(name, ids)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.ungroupVariables = (id) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .ungroupVariable(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.move = (order, id, parentId) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .moveVariable(id, parentId, order)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.moveVariables = (order, ids, parentId) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .moveVariables(ids, parentId, order)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setIsVisible = (id, isVisible) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableIsVisible(id, isVisible)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setIsHidden = (id, isHidden) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableIsVisible(id, !isHidden)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setIsRequired = (id, isRequired) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableIsRequired(id, isRequired)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setIsReadonly = (id, isReadonly) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setVariableIsReadonly(id, isReadonly)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.getImageVariableConnectorId = (id) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .getImageVariableConnectorId(id)
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.setImageVariableConnector = (id, registration) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return (yield VariableController_classPrivateFieldGet(
                                this,
                                _VariableController_editorAPI,
                                'f',
                            ))
                                .setImageVariableConnector(id, JSON.stringify(registration))
                                .then((result) => getEditorResponseData(result));
                        })),
                    (this.removeSource = (id) =>
                        VariableController_awaiter(this, void 0, void 0, function* () {
                            return this.setValue(id, null);
                        })),
                    VariableController_classPrivateFieldSet(this, _VariableController_editorAPI, editorAPI, 'f');
            }
        }
        _VariableController_editorAPI = new WeakMap();
        class InfoController {
            constructor() {
                (this.currentEngineVersion = editor_engine_namespaceObject_V),
                    (this.currentSDKVersion = package_namespaceObject_i8);
            }
        }
        let connection;
        const FIXED_EDITOR_LINK =
            'https://studio-cdn.chiligrafx.com/editor/' + editor_engine_namespaceObject_V + '/web';
        class SDK {
            constructor(config) {
                (this.loadEditor = () => {
                    connector(
                        this.config.editorLink || FIXED_EDITOR_LINK,
                        {
                            onActionsChanged: this.subscriber.onActionsChanged,
                            onStateChanged: this.subscriber.onStateChanged,
                            onDocumentLoaded: this.subscriber.onDocumentLoaded,
                            onSelectedFrameContentChanged: this.subscriber.onSelectedFrameContentChanged,
                            onSelectedFrameLayoutChanged: this.subscriber.onSelectedFrameLayoutChanged,
                            onSelectedLayoutPropertiesChanged: this.subscriber.onSelectedLayoutPropertiesChanged,
                            onPageSelectionChanged: this.subscriber.onPageSelectionChanged,
                            onScrubberPositionChanged: this.subscriber.onAnimationPlaybackChanged,
                            onFrameAnimationsChanged: this.subscriber.onAnimationChanged,
                            onVariableListChanged: this.subscriber.onVariableListChanged,
                            onSelectedToolChanged: this.subscriber.onSelectedToolChanged,
                            onUndoStateChanged: this.subscriber.onUndoStateChanged,
                            onSelectedLayoutFramesChanged: this.subscriber.onSelectedLayoutFramesChanged,
                            onSelectedTextStyleChanged: this.subscriber.onSelectedTextStyleChanged,
                            onColorsChanged: this.subscriber.onColorsChanged,
                            onParagraphStylesChanged: this.subscriber.onParagraphStylesChanged,
                            onCharacterStylesChanged: this.subscriber.onCharacterStylesChanged,
                            onFontFamiliesChanged: this.subscriber.onFontFamiliesChanged,
                            onSelectedLayoutIdChanged: this.subscriber.onSelectedLayoutIdChanged,
                            onLayoutsChanged: this.subscriber.onLayoutsChanged,
                            onConnectorEvent: this.subscriber.onConnectorEvent,
                            onZoomChanged: this.subscriber.onZoomChanged,
                            onPageSizeChanged: this.subscriber.onPageSizeChanged,
                            onShapeCornerRadiusChanged: this.subscriber.onShapeCornerRadiusChanged,
                            onCropActiveFrameIdChanged: this.subscriber.onCropActiveFrameIdChanged,
                            onAsyncError: this.subscriber.onAsyncError,
                        },
                        this.setConnection,
                        this.config.editorId,
                        this.config.studioStyling,
                    ),
                        (this.editorAPI =
                            null == connection ? void 0 : connection.promise.then((editorAPI) => editorAPI)),
                        (this.action = new ActionController(this.editorAPI)),
                        (this.layout = new LayoutController(this.editorAPI)),
                        (this.frame = new FrameController(this.editorAPI)),
                        (this.animation = new AnimationController(this.editorAPI)),
                        (this.document = new DocumentController(this.editorAPI)),
                        (this.configuration = new ConfigurationController(this.editorAPI)),
                        (this.utils = new UtilsController()),
                        (this.tool = new ToolController(this.editorAPI)),
                        (this.page = new PageController(this.editorAPI)),
                        (this.debug = new DebugController(this.editorAPI)),
                        (this.undoManager = new UndoManagerController(this.editorAPI, this)),
                        (this.textSelection = new TextStyleController(this.editorAPI)),
                        (this.colorStyle = new ColorStyleController(this.editorAPI)),
                        (this.paragraphStyle = new ParagraphStyleController(this.editorAPI)),
                        (this.characterStyle = new CharacterStyleController(this.editorAPI)),
                        (this.mediaConnector = new MediaConnectorController(this.editorAPI)),
                        (this.fontConnector = new FontConnectorController(this.editorAPI)),
                        (this.connector = new ConnectorController(this.editorAPI)),
                        (this.variable = new VariableController(this.editorAPI)),
                        (this.font = new FontController(this.editorAPI)),
                        (this.experiment = new ExperimentController(this.editorAPI)),
                        (this.canvas = new CanvasController(this.editorAPI)),
                        (this.shape = new ShapeController(this.editorAPI)),
                        (this.info = new InfoController()),
                        this.configuration.setValue(
                            WellKnownConfigurationKeys.GraFxStudioSdkVersion,
                            package_namespaceObject_i8,
                        ),
                        this.configuration.setValue(
                            WellKnownConfigurationKeys.GraFxStudioDocumentType,
                            this.config.documentType || DocumentType.template,
                        ),
                        this.configuration.updateStudioOptions(this.config.studioOptions || defaultStudioOptions);
                }),
                    (this.setConnection = (newConnection) => {
                        connection = newConnection;
                    }),
                    (this.config = config),
                    (this.connection = connection),
                    (this.editorAPI = null == connection ? void 0 : connection.promise.then((child) => child)),
                    (this.action = new ActionController(this.editorAPI)),
                    (this.layout = new LayoutController(this.editorAPI)),
                    (this.frame = new FrameController(this.editorAPI)),
                    (this.shape = new ShapeController(this.editorAPI)),
                    (this.undoManager = new UndoManagerController(this.editorAPI, this)),
                    (this.connector = new ConnectorController(this.editorAPI)),
                    (this.mediaConnector = new MediaConnectorController(this.editorAPI)),
                    (this.fontConnector = new FontConnectorController(this.editorAPI)),
                    (this.animation = new AnimationController(this.editorAPI)),
                    (this.document = new DocumentController(this.editorAPI)),
                    (this.configuration = new ConfigurationController(this.editorAPI)),
                    (this.variable = new VariableController(this.editorAPI)),
                    (this.utils = new UtilsController()),
                    (this.subscriber = new SubscriberController(this.config)),
                    (this.tool = new ToolController(this.editorAPI)),
                    (this.page = new PageController(this.editorAPI)),
                    (this.debug = new DebugController(this.editorAPI)),
                    (this.textSelection = new TextStyleController(this.editorAPI)),
                    (this.colorStyle = new ColorStyleController(this.editorAPI)),
                    (this.paragraphStyle = new ParagraphStyleController(this.editorAPI)),
                    (this.characterStyle = new CharacterStyleController(this.editorAPI)),
                    (this.font = new FontController(this.editorAPI)),
                    (this.experiment = new ExperimentController(this.editorAPI)),
                    (this.canvas = new CanvasController(this.editorAPI)),
                    (this.colorConversion = new ColorConversionController(this.editorAPI)),
                    (this.info = new InfoController());
            }
        }
        var SlideDirections,
            ShakeDirections,
            EaseTypes,
            TweenTypes,
            BasicAnimationsEmphasisStyles,
            LayoutType,
            MeasurementUnit,
            VariableType,
            FontWeights,
            Alignment,
            TextPosition,
            Case,
            Scripting,
            HorizontalAlign,
            SelectedTextStyleSections,
            SelectedTextStyles,
            ColorType,
            ColorUsageType,
            MediaDownloadType,
            FontPreviewFormat,
            ActionEditorEvent,
            ShapeType,
            CornerRadiusType;
        !(function (SlideDirections) {
            (SlideDirections.top = 'top'),
                (SlideDirections.left = 'left'),
                (SlideDirections.right = 'right'),
                (SlideDirections.bottom = 'bottom'),
                (SlideDirections.topLeft = 'topLeft'),
                (SlideDirections.topRight = 'topRight'),
                (SlideDirections.bottomLeft = 'bottomLeft'),
                (SlideDirections.bottomRight = 'bottomRight');
        })(SlideDirections || (SlideDirections = {})),
            (function (ShakeDirections) {
                (ShakeDirections.horizontal = 'horizontal'), (ShakeDirections.vertical = 'vertical');
            })(ShakeDirections || (ShakeDirections = {})),
            (function (EaseTypes) {
                (EaseTypes.easeIn = 'easeIn'), (EaseTypes.easeOut = 'easeOut'), (EaseTypes.easeInOut = 'easeInOut');
            })(EaseTypes || (EaseTypes = {})),
            (function (TweenTypes) {
                (TweenTypes.quadratic = 'Quadratic'),
                    (TweenTypes.cubic = 'Cubic'),
                    (TweenTypes.quartic = 'Quartic'),
                    (TweenTypes.quintic = 'Quintic'),
                    (TweenTypes.sine = 'Sine'),
                    (TweenTypes.exponential = 'Exponential'),
                    (TweenTypes.circular = 'Circular'),
                    (TweenTypes.elastic = 'Elastic'),
                    (TweenTypes.bounce = 'Bounce'),
                    (TweenTypes.back = 'Back');
            })(TweenTypes || (TweenTypes = {})),
            (function (BasicAnimationsEmphasisStyles) {
                (BasicAnimationsEmphasisStyles.bounce = 'bounce'),
                    (BasicAnimationsEmphasisStyles.flash = 'flash'),
                    (BasicAnimationsEmphasisStyles.headshake = 'headShake'),
                    (BasicAnimationsEmphasisStyles.heartbeat = 'heartbeat'),
                    (BasicAnimationsEmphasisStyles.pulse = 'pulse'),
                    (BasicAnimationsEmphasisStyles.rubberBand = 'rubberBand'),
                    (BasicAnimationsEmphasisStyles.vertical = 'vertical'),
                    (BasicAnimationsEmphasisStyles.horizontal = 'horizontal'),
                    (BasicAnimationsEmphasisStyles.swing = 'swing'),
                    (BasicAnimationsEmphasisStyles.tada = 'tada');
            })(BasicAnimationsEmphasisStyles || (BasicAnimationsEmphasisStyles = {})),
            (function (LayoutType) {
                (LayoutType.top = 'top'), (LayoutType.child = 'child');
            })(LayoutType || (LayoutType = {})),
            (function (MeasurementUnit) {
                (MeasurementUnit.px = 'px'),
                    (MeasurementUnit.mm = 'mm'),
                    (MeasurementUnit.cm = 'cm'),
                    (MeasurementUnit.inch = 'inch'),
                    (MeasurementUnit.pt = 'pt');
            })(MeasurementUnit || (MeasurementUnit = {})),
            (function (VariableType) {
                (VariableType.shortText = 'shortText'),
                    (VariableType.longText = 'longText'),
                    (VariableType.image = 'image'),
                    (VariableType.list = 'list'),
                    (VariableType.boolean = 'boolean'),
                    (VariableType.group = 'group');
            })(VariableType || (VariableType = {})),
            (function (FontWeights) {
                (FontWeights.BOLD = 'Bold'), (FontWeights.ITALIC = 'Italic'), (FontWeights.REGULAR = 'Regular');
            })(FontWeights || (FontWeights = {})),
            (function (Alignment) {
                (Alignment.LEFT = 'left'),
                    (Alignment.CENTER = 'center'),
                    (Alignment.RIGHT = 'right'),
                    (Alignment.JUSTIFY = 'justify');
            })(Alignment || (Alignment = {})),
            (function (TextPosition) {
                (TextPosition.TOP = 'top'), (TextPosition.CENTER = 'center'), (TextPosition.BOTTOM = 'bottom');
            })(TextPosition || (TextPosition = {})),
            (function (Case) {
                (Case.TO_LOWER_CASE = 'lowercase'), (Case.TO_UPPER_CASE = 'uppercase'), (Case.NORMAL = 'normal');
            })(Case || (Case = {})),
            (function (Scripting) {
                (Scripting.SUPERSCRIPT = 'superscript'),
                    (Scripting.SUBSCRIPT = 'subscript'),
                    (Scripting.NORMAL = 'normal');
            })(Scripting || (Scripting = {})),
            (function (HorizontalAlign) {
                (HorizontalAlign.left = 'left'),
                    (HorizontalAlign.center = 'center'),
                    (HorizontalAlign.right = 'right'),
                    (HorizontalAlign.justify = 'justify');
            })(HorizontalAlign || (HorizontalAlign = {})),
            (function (SelectedTextStyleSections) {
                (SelectedTextStyleSections.STYLE = 'textStyle'),
                    (SelectedTextStyleSections.PROPERTIES = 'textProperties'),
                    (SelectedTextStyleSections.APPEARANCE = 'appearance');
            })(SelectedTextStyleSections || (SelectedTextStyleSections = {})),
            (function (SelectedTextStyles) {
                (SelectedTextStyles.PARAGRAPH = 'paragraphStyleId'),
                    (SelectedTextStyles.CHARACTER = 'characterStyleId'),
                    (SelectedTextStyles.FONT_FAMILY = 'fontKey'),
                    (SelectedTextStyles.FONT_STYLE = 'fontStyle'),
                    (SelectedTextStyles.FONT_SIZE = 'fontSize'),
                    (SelectedTextStyles.LETTER_SPACING = 'letterSpacing'),
                    (SelectedTextStyles.LINE_HEIGHT = 'lineHeight'),
                    (SelectedTextStyles.TEXT_ALIGN = 'textAlign'),
                    (SelectedTextStyles.VERTICAL_ALIGN = 'verticalAlign'),
                    (SelectedTextStyles.TYPOGRAPHIC_CASE = 'typographicCase'),
                    (SelectedTextStyles.SUB_SUPER_SCRIPT = 'subSuperScript'),
                    (SelectedTextStyles.UNDERLINE = 'underline'),
                    (SelectedTextStyles.LINE_THROUGH = 'lineThrough'),
                    (SelectedTextStyles.FILL_COLOR = 'fillColor'),
                    (SelectedTextStyles.COLOR = 'color'),
                    (SelectedTextStyles.FILL_COLOR_APPLIED = 'fillColorApplied'),
                    (SelectedTextStyles.STROKE_COLOR = 'strokeColor'),
                    (SelectedTextStyles.DROP_SHADOW_COLOR = 'dropShadowColor'),
                    (SelectedTextStyles.BLEND_MODE = 'blendMode'),
                    (SelectedTextStyles.OPACITY = 'opacity');
            })(SelectedTextStyles || (SelectedTextStyles = {})),
            (function (ColorType) {
                (ColorType.rgb = 'rgb'),
                    (ColorType.hex = 'hex'),
                    (ColorType.cmyk = 'cmyk'),
                    (ColorType.gray = 'gray'),
                    (ColorType.hsl = 'hsl'),
                    (ColorType.spot = 'spot');
            })(ColorType || (ColorType = {})),
            (function (ColorUsageType) {
                (ColorUsageType.local = 'local'), (ColorUsageType.stylekit = 'stylekit');
            })(ColorUsageType || (ColorUsageType = {})),
            (function (MediaDownloadType) {
                (MediaDownloadType.LowResolutionWeb = 'lowresWeb'),
                    (MediaDownloadType.HighResolutionWeb = 'highresWeb');
            })(MediaDownloadType || (MediaDownloadType = {})),
            (function (FontPreviewFormat) {
                (FontPreviewFormat.Square = 'square'), (FontPreviewFormat.Line = 'line');
            })(FontPreviewFormat || (FontPreviewFormat = {})),
            (function (ActionEditorEvent) {
                (ActionEditorEvent.selectedLayoutChanged = 'selectedLayoutChanged'),
                    (ActionEditorEvent.frameMoved = 'frameMoved'),
                    (ActionEditorEvent.pageSizeChanged = 'pageSizeChanged'),
                    (ActionEditorEvent.documentLoaded = 'documentLoaded'),
                    (ActionEditorEvent.variableValueChanged = 'variableValueChanged');
            })(ActionEditorEvent || (ActionEditorEvent = {})),
            (function (ShapeType) {
                (ShapeType.ellipse = 'ellipse'), (ShapeType.rectangle = 'rectangle'), (ShapeType.polygon = 'polygon');
            })(ShapeType || (ShapeType = {})),
            (function (CornerRadiusType) {
                (CornerRadiusType.all = 'all'), (CornerRadiusType.only = 'only'), (CornerRadiusType.none = 'none');
            })(CornerRadiusType || (CornerRadiusType = {}));
        const src = SDK;
        return __webpack_exports__;
    })(),
);
//# sourceMappingURL=main.js.map
