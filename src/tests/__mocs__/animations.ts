import { FrameAnimationType } from '../../../types/AnimationTypes';

export const mockSetFrameAnimation = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockTogglePlaybackAnimation = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockGetFrameAnimation = jest.fn().mockResolvedValue({ success: true, status: 0 });

export const mockFrmeAnimation: FrameAnimationType = {
    frameId: 1,
    from: 2,
    to: 3,
    basicAnimations: {},
};
