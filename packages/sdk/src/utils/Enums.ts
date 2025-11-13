export enum FramePropertyNames {
    FRAME_X = 'frameX',
    FRAME_Y = 'frameY',
    WIDTH = 'width',
    HEIGHT = 'height',
    FRAME_ROTATION = 'frameRotation',
}
export enum LayoutPropertyNames {
    LAYOUT_HEIGHT = 'layoutHeight',
    LAYOUT_WIDTH = 'layoutWidth',
    BLEED_TOP = 'bleedTop',
    BLEED_BOTTOM = 'bleedBottom',
    BLEED_LEFT = 'bleedLeft',
    BLEED_RIGHT = 'bleedRight',
    BLEED_VALUES_COMBINED = 'areBleedValuesCombined',
}

export enum ToolType {
    SELECT = 'select',
    ZOOM = 'zoom',
    HAND = 'hand',
    IMAGE_FRAME = 'imageFrame',
    TEXT_FRAME = 'textFrame',
    SHAPE_RECT = 'rect',
    SHAPE_ELLIPSE = 'ellipse',
    SHAPE_POLYGON = 'polygon',
}
export enum DownloadFormats {
    MP4 = 'mp4',
    GIF = 'gif',
    PNG = 'png',
    JPG = 'jpg',
    PDF = 'pdf',
    /**
     * @experimental This download format is experimental.
     */
    HTML = 'html',
}

export enum EnvironmentType {
    SANDBOX = 'sandbox',
    PRODUCTION = 'online',
}
