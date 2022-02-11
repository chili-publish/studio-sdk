export const mockAddLayout = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockRemoveLayout = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetLayoutName = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSelectLayout = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockDuplicateLayout = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetLayout = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSelectFrames = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameHeight = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameWidth = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameRotation = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameVisibility = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameX = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameY = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetFrameX = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetFrameY = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetFrameWidth = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetFrameHeight = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetFrameRotation = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetFrameAniation = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockTogglePlaybackAnimation = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetFrameSize = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mocksetLayoutHeight = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mocksetLayoutWidth = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetLayoutHeight = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockResetLayoutWidth = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockGetCurrentDocumentState = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockLoadDocument = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockAddVariable = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockRemoveVariable = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockGroupVariables = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableName = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableLabel = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableType = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetDefaultVariableValue = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableValue = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockMoveVariable = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableIsHidden = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableIsRequired = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetVariableIsReadonly = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockUngroupVariable = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockDuplicateVariable = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockGetVariableList = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockGetVariable = jest.fn().mockResolvedValue({ success: true, status: 0 });
export const mockSetTool = jest.fn().mockResolvedValue({ success: true, status: 0 });

const mockChild = {
    addLayout: mockAddLayout,
    removeLayout: mockRemoveLayout,
    renameLayout: mockSetLayoutName,
    selectLayout: mockSelectLayout,
    duplicateLayout: mockDuplicateLayout,
    resetLayout: mockResetLayout,
    selectFrames: mockSelectFrames,
    setFrameHeight: mockSetFrameHeight,
    setFrameWidth: mockSetFrameWidth,
    setFrameVisibility: mockSetFrameVisibility,
    setFrameX: mockSetFrameX,
    setFrameY: mockSetFrameY,
    setFrameRotation: mockSetFrameRotation,
    resetFrameX: mockResetFrameX,
    resetFrameY: mockResetFrameY,
    resetFrameWidth: mockResetFrameWidth,
    resetFrameHeight: mockResetFrameHeight,
    resetFrameRotation: mockResetFrameRotation,
    setFrameAnimation: mockSetFrameAniation,
    togglePlaybackAnimation: mockTogglePlaybackAnimation,
    resetFrameSize: mockResetFrameSize,
    setLayoutHeight: mocksetLayoutHeight,
    setLayoutWidth: mocksetLayoutWidth,
    resetLayoutHeight: mockResetLayoutHeight,
    resetLayoutWidth: mockResetLayoutWidth,
    getCurrentDocumentState: mockGetCurrentDocumentState,
    loadDocument: mockLoadDocument,
    getVariableList: mockGetVariableList,
    getVariable: mockGetVariable,
    addVariable: mockAddVariable,
    removeVariable: mockRemoveVariable,
    groupVariables: mockGroupVariables,
    setVariableName: mockSetVariableName,
    setVariableLabel: mockSetVariableLabel,
    setVariableType: mockSetVariableType,
    setDefaultVariableValue: mockSetDefaultVariableValue,
    setVariableValue: mockSetVariableValue,
    duplicateVariable: mockDuplicateVariable,
    moveVariable: mockMoveVariable,
    setVariableIsHidden: mockSetVariableIsHidden,
    setVariableIsRequired: mockSetVariableIsRequired,
    setVariableIsReadonly: mockSetVariableIsReadonly,
    ungroupVariable: mockUngroupVariable,
    setTool: mockSetTool,
};

export default mockChild;

export const mockSelectFrame = {
    frameId: 300,
    layoutId: 1,
    x: { value: 100, isOverride: false },
    y: { value: 20, isOverride: true },
    width: { value: 220, isOverride: false },
    height: { value: 343, isOverride: false },
    rotationDegrees: { value: 22, isOverride: false },
    scaleX: { value: 322, isOverride: false },
    scaleY: { value: 873, isOverride: false },
    included: { value: false, isOverride: false },
};

export const mockSelectPage = {
    frameId: 300,
    layoutId: 1,
    width: { value: 100, isOverride: false },
    height: { value: 20, isOverride: true },
};
