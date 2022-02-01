import { ConfigType } from '../../types/CommonTypes';

class SubscriberController {
    config: ConfigType;

    constructor(config: ConfigType) {
        this.config = config;
    }

    onAnimationChanged = (animation: string) => {
        const callBack = this.config.onFrameAnimationsChanged;
        callBack(JSON.parse(animation));
    };

    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        const callBack = this.config.onScrubberPositionChanged;
        callBack(JSON.parse(animationPlaybackState));
    };

    onSelectedLayoutPropertiesChanged = (document: string) => {
        const callBack = this.config.onSelectedLayoutPropertiesChanged;
        callBack(JSON.parse(document));
    };
    onSelectedFrameLayoutChanged = (document: string) => {
        const callBack = this.config.onSelectedFrameLayoutChanged;
        callBack(JSON.parse(document));
    };

    onSelectedFrameContentChanged = (document: string) => {
        const callBack = this.config.onSelectedFrameContentChanged;
        callBack(JSON.parse(document));
    };
    onStateChanged = (document: string) => {
        const callBack = this.config.onStateChanged;
        callBack(JSON.parse(document));
    };

    onPageSelectionChanged = () => {
        const callBack = this.config.onPageSelectionChanged;
        callBack();
    };
}

export default SubscriberController;
