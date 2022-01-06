import { ConfigType } from '../../types/CommonTypes';

class SubscriberController {
    config: ConfigType;

    constructor(config: ConfigType) {
        this.config = config;
    }

    onAnimationChanged = (animation: string) => {
        const callBack = this.config.onFrameAnimationsChanged;
        callBack(animation);
    };

    onAnimationPlaybackChanged = (animationPlaybackState: string) => {
        const callBack = this.config.onScrubberPositionChanged;
        callBack(animationPlaybackState);
    };

    onSelectedLayoutPropertiesChanged = (document: string) => {
        const callBack = this.config.onSelectedLayoutPropertiesChanged;
        callBack(document);
    };
    onSelectedFrameLayoutChanged = (document: string) => {
        const callBack = this.config.onSelectedFrameLayoutChanged;
        callBack(document);
    };

    onSelectedFrameContentChanged = (document: string) => {
        const callBack = this.config.onSelectedFrameContentChanged;
        callBack(document);
    };

    onPageSelectionChanged = () => {
        const callBack = this.config.onPageSelectionChanged;
        callBack();
    };
}

export default SubscriberController;
