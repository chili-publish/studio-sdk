export enum WellKnownConfigurationKeys {
    GraFxStudioEnvironmentApiUrl = 'ENVIRONMENT_API',
    GraFxStudioSdkVersion = 'SDK_VERSION',
    GraFxStudioDocumentType = 'DOCUMENT_TYPE',
    GraFxStudioTemplateId = 'TEMPLATE_ID',
    GraFxStudioAuthToken = 'GRAFX_AUTH_TOKEN',
    QueryCallCacheEnabled = 'ENABLE_QUERY_CALL_CACHE',
}

export enum FrameEditingMode {
    /** Default (Designer) mode
     * No constraints
     */
    full,

    /** End user mode
     * Limits the existing tools to the given constraints
     */
    followConstraints,
}

export type StudioStyling = {
    uiBackgroundColorHex?: string;
};

/**
 * Studio Options that can be updated.
 */
export type StudioOptionsDeltaUpdate = {
    /** Options for the different studio engine shortcuts */
    shortcutOptions?: ShortcutOptionsDeltaUpdate;
    /** Options for the different frame editing modes */
    frameEditingMode?: FrameEditingMode;
};

/**
 * Shortcut Options that can be updated.
 */
export type ShortcutOptionsDeltaUpdate = {
    /** The debug panel shortcut. */
    debugPanel?: ShortcutOption;

    /** The ellipse shape shortcut. */
    ellipse?: ShortcutOption;

    /** The hand shortcut. */
    hand?: ShortcutOption;

    /** The image frame shortcut. */
    image?: ShortcutOption;

    /** The polygon shape shortcut. */
    polygon?: ShortcutOption;

    /** The rectangle shape shortcut. */
    rectangle?: ShortcutOption;

    /** The select shortcut. */
    select?: ShortcutOption;

    /** The text frame shortcut. */
    text?: ShortcutOption;

    /** The zoom shortcut. */
    zoom?: ShortcutOption;

    /** The copy/cut/paste/duplicate shortcut. */
    copyPaste?: ShortcutOption;

    /** The view mode shortcut. */
    viewMode?: ShortcutOption;
};

/**
 * Specific shortcut options
 */
export type ShortcutOption = {
    /** Whether the shortcut is enabled. */
    enabled: boolean;
};

/**
 * Default studio options with all shortcuts disabled.
 */
export const defaultStudioOptions: StudioOptionsDeltaUpdate = {
    shortcutOptions: {
        debugPanel: { enabled: false },
        ellipse: { enabled: false },
        hand: { enabled: false },
        image: { enabled: false },
        polygon: { enabled: false },
        rectangle: { enabled: false },
        select: { enabled: false },
        text: { enabled: false },
        zoom: { enabled: false },
        copyPaste: { enabled: false },
        viewMode: { enabled: false },
    },
    frameEditingMode: FrameEditingMode.full,
};
