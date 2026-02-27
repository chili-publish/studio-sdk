export const mockColors = [
    {
        id: 'c09480cd-d662-4460-9aa4-11e7d5a327df',
        name: 'Black',
        color: {
            c: 0,
            m: 0,
            y: 0,
            k: 1,
            type: 'cmyk',
        },
    },
    {
        id: 'bcd05901-f672-42b1-ab55-a6fd77f7e4f1',
        name: 'Cyan',
        color: {
            c: 1,
            m: 0,
            y: 0,
            k: 0,
            type: 'cmyk',
        },
    },
    {
        id: '2a3f8725-7f29-434b-b552-597bef935b5e',
        name: 'FlavorColor',
        color: {
            c: 0,
            m: 0.77,
            y: 0.71,
            k: 0.24,
            type: 'cmyk',
        },
    },
    {
        id: '3c75fc08-87a0-43d2-897b-41fefc1b5b84',
        name: 'Magenta',
        color: {
            c: 0,
            m: 1,
            y: 0,
            k: 0,
            type: 'cmyk',
        },
    },
    {
        id: '645464c1-b1bf-4939-85ba-b279c788021b',
        name: 'Paper',
        color: {
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            type: 'cmyk',
        },
    },
    {
        id: '502efdbe-2756-47d2-9639-9aeaaf1c0232',
        name: 'Registration',
        color: {
            c: 1,
            m: 1,
            y: 1,
            k: 1,
            type: 'cmyk',
        },
    },
    {
        id: '30b256ae-7e78-47a9-ada0-ea58437ec59a',
        name: 'Yellow',
        color: {
            c: 0,
            m: 0,
            y: 1,
            k: 0,
            type: 'cmyk',
        },
    },
    {
        id: '3780e2cc-663a-4f0d-80a8-fc769418eed4',
        name: 'Color',
        color: {
            c: 0,
            m: 0,
            y: 0,
            k: 0,
            type: 'cmyk',
        },
    },
    {
        id: '25e0d0f3-23e5-4c14-9578-2ca4bf3130b5',
        name: 'Color 1',
        color: {
            c: 0,
            m: 0,
            y: 0,
            k: 1,
            type: 'cmyk',
        },
    },
    {
        id: '038c2033-3981-4784-aeab-12db12b287ca',
        name: 'Color 2',
        color: {
            c: 0,
            m: 0,
            y: 0,
            k: 1,
            type: 'cmyk',
        },
    },
    {
        id: '1111-2222-3333-4444-5555',
        name: 'Color 5 - Spot RGB',
        color: {
            r: 224,
            g: 179,
            b: 215,
            a: 1,
            type: 'spotRgb',
        },
    },
];

export const mockGradients = [
    {
        id: '2222-3333-4444-5555-6666',
        name: 'Gradient 1',
        gradient: {
            type: 'linear',
            colors: [],
            stops: [],
        },
    },
];

export const mockFonts = [
    {
        id: '53a6590a-4d1c-4f4b-be01-445f4fdb9be8',
        name: 'DIESELPOWER PERSONAL USE',
        connectorId: '8b1cb222-f4c7-4a1f-b3ef-333a3384c284',
        fontFamilyId: 'f284e5d2-a8fb-4d0d-a72a-67143018232b',
        fontStyles: [
            {
                id: 'f9c851ba-6c00-458e-a084-cca71f22e8a8',
                fontStyleId: 'cf6081ca-c00e-41b5-9ece-a564848d61d2',
                fontFamilyId: 'f284e5d2-a8fb-4d0d-a72a-67143018232b',
                connectorId: '8b1cb222-f4c7-4a1f-b3ef-333a3384c284',
                name: 'Regular 400',
                isDefault: false,
            },
        ],
    },
    {
        id: '614e0cba-37d3-45a7-b9af-ddf2bf76f7db',
        name: 'Minion Pro',
        connectorId: '8b1cb222-f4c7-4a1f-b3ef-333a3384c284',
        fontFamilyId: '62a6c55e-5a53-4efe-8b0f-57ba29e8dcee',
        fontStyles: [
            {
                id: '8a0788ff-cf05-403d-9893-120bc3773603',
                fontStyleId: '8cb18f2f-56a9-4f9e-bbb2-c7687ead7ef8',
                fontFamilyId: '62a6c55e-5a53-4efe-8b0f-57ba29e8dcee',
                connectorId: '8b1cb222-f4c7-4a1f-b3ef-333a3384c284',
                name: 'Regular 400',
                isDefault: false,
            },
        ],
    },
];

export const mockCharacterStyles = [
    {
        id: '410e4ffb-ecd9-4f02-bcaf-7ace11104ab1',
        name: 'New CharacterStyle',
        fontKey: null,
        fontSize: 12,
        typographicCase: 'normal',
        kerningOn: null,
        subSuperScript: 'normal',
        trackingLeft: 0,
        trackingRight: 0,
        baselineShiftValue: '0',
        lineHeight: 120,
        textOverprint: null,
        color: {
            id: 'c09480cd-d662-4460-9aa4-11e7d5a327df',
            opacity: 1,
            type: 'brandKit',
        },
        strokeColor: {
            color: {
                r: 0,
                g: 0,
                b: 0,
                type: 'rgb',
            },
            opacity: 1,
            type: 'local',
        },
        fillColorApplied: true,
        strokeColorApplied: null,
        underline: false,
        lineThrough: false,
        strokeWidth: null,
    },
];
export const mockParagraphStyles = [
    {
        id: '760f651b-2aba-47e8-b99d-61f2619f2714',
        name: 'Basic Paragraph',
        fontKey: '8a0788ff-cf05-403d-9893-120bc3773603',
        fontSize: 12,
        typographicCase: 'normal',
        kerningOn: false,
        subSuperScript: 'normal',
        trackingLeft: 0,
        trackingRight: 0,
        indentStart: '0',
        indentEnd: '0',
        spaceBefore: '0',
        spaceAfter: '0',
        textIndent: '0',
        strokeWidth: 1,
        alignToBaseLine: false,
        baselineShiftValue: '0',
        lineHeight: 120,
        textAlign: 'left',
        textAlignLast: 'left',
        textOverprint: false,
        color: {
            id: 'c09480cd-d662-4460-9aa4-11e7d5a327df',
            opacity: 1,
            type: 'brandKit',
        },
        strokeColor: {
            color: {
                r: 0,
                g: 0,
                b: 0,
                type: 'rgb',
            },
            opacity: 1,
            type: 'local',
        },
        fillColorApplied: true,
        strokeColorApplied: false,
        underline: false,
        lineThrough: false,
    },
    {
        id: '4cfacf95-745a-4ac8-a976-ef7528e9ef49',
        name: 'TagLine',
        fontKey: 'f9c851ba-6c00-458e-a084-cca71f22e8a8',
        fontSize: 38,
        typographicCase: 'normal',
        kerningOn: false,
        subSuperScript: 'normal',
        trackingLeft: 0,
        trackingRight: 0,
        indentStart: '0',
        indentEnd: '0',
        spaceBefore: '0',
        spaceAfter: '0',
        textIndent: '0',
        strokeWidth: 1,
        alignToBaseLine: false,
        baselineShiftValue: '0',
        lineHeight: 120,
        textAlign: 'left',
        textAlignLast: 'left',
        textOverprint: false,
        color: {
            id: '645464c1-b1bf-4939-85ba-b279c788021b',
            opacity: 1,
            type: 'brandKit',
        },
        strokeColor: {
            color: {
                r: 0,
                g: 0,
                b: 0,
                type: 'rgb',
            },
            opacity: 1,
            type: 'local',
        },
        fillColorApplied: true,
        strokeColorApplied: false,
        underline: false,
        lineThrough: false,
    },
];

export const mockMedia = [
    {
        name: 'd0ff2bf4-e9a6-4fff-b378-1d1c554bba56_Final_template story_1080x1920.png',
        remoteConnectorId: 'grafxmedia',
        assetId: 'bb7de06a-0c70-4ca1-97a0-892351ed8444',
    },
    {
        name: 'c9aaa676-a6c0-4a3e-aa67-afdb2f1359f8_bg-hk-25.jpg',
        remoteConnectorId: 'grafxmedia',
        assetId: '62000e62-55e2-4ef7-8486-c722c913aa88',
    },
];

export const mockStudioBrandKit = {
    id: 'a5203c84-bb1a-46a2-90ec-6dcc1554f2bb',
    fontConnectorId: 'fontConnectorId',
    brandKit: {
        id: 'a5203c84-bb1a-46a2-90ec-6dcc1554f2bb',
        lastModifiedDate: '2025-06-12T12:10:29.354877',
        name: 'BrandkitTest1',
        dateCreated: '2025-06-12T12:10:29.354877',
        fonts: [
            {
                fontFamilyId: 'af0dc036-8867-4f63-9b03-933944a1a1fa',
                fontFamilyBrandKitGuid: '29d22ca1-ae25-4f04-a1fd-0ca2fd35011d',
            },
            {
                fontFamilyId: '30b500bf-b310-4063-aa6d-66523f180f4f',
                fontFamilyBrandKitGuid: '4564ea03-193a-40df-82b7-e7705e6c19ee',
            },
        ],
        colors: [
            {
                value: 'Color 5 - Spot RGB',
                displayValue: {
                    r: 224,
                    g: 179,
                    b: 215,
                    a: 1,
                    spotName: 'Color 5 - Spot RGB',
                },
                name: 'Color 5',
                type: 'spotRgb',
                guid: '5cc0e9f5-e339-4b94-a550-ad9c45524ed7',
            },
            {
                value: 'Color 4- SPOT cmyk',
                displayValue: {
                    c: 0,
                    m: 0,
                    y: 0,
                    k: 0.19069767441860466,
                    spotName: 'Color 4- SPOT cmyk',
                },
                name: 'Color 4',
                type: 'spotCmyk',
                guid: '88dd8c03-5995-4d1a-bf11-c3b0431fb124',
            },
            {
                value: '#6cb29d',
                displayValue: null,
                name: 'Color 2',
                type: 'hex',
                guid: 'a1900046-8bc3-46b4-8b13-65ab0cdc9b34',
            },
        ],
        characterStyles: [
            {
                name: 'Character style 22',
                brandKitFontFamilyGuid: null,
                fontStyleId: null,
                fillColorApplied: false,
                fontSize: 2,
                subSuperScript: 'superscript',
                brandKitColorGuid: '5cc0e9f5-e339-4b94-a550-ad9c45524ed7',
                lineHeight: null,
            },
        ],
        paragraphStyles: [
            {
                name: 'Paragraph style 1',
                textAlign: 'left',
                brandKitColorGuid: '5cc0e9f5-e339-4b94-a550-ad9c45524ed7',
                brandKitFontFamilyGuid: '29d22ca1-ae25-4f04-a1fd-0ca2fd35011d',
                textStrokeColorGuid: '88dd8c03-5995-4d1a-bf11-c3b0431fb124',
                fontStyleId: '8cb18f2f-56a9-4f9e-bbb2-c7687ead7ef8',
                fontSize: 1,
                lineHeight: 0,
                trackingRight: 0,
                fillColorApplied: true,
                textStrokeColorApplied: true,
                textStrokeWidth: 7,
            },
        ],
        media: [
            {
                name: 'd0ff2bf4-e9a6-4fff-b378-1d1c554bba56_Final_template story_1080x1920.png',
                mediaConnectorId: 'grafxmedia',
                mediaId: 'bb7de06a-0c70-4ca1-97a0-892351ed8444',
            },
            {
                name: 'c9aaa676-a6c0-4a3e-aa67-afdb2f1359f8_bg-hk-25.jpg',
                mediaConnectorId: 'grafxmedia',
                mediaId: '62000e62-55e2-4ef7-8486-c722c913aa88',
            },
            {
                name: '0f0e652c-86da-41b7-b312-e487c3e58fa0_bg-hk-25.jpg',
                mediaConnectorId: 'grafxmedia',
                mediaId: 'f6a50d37-a859-4c07-b915-0bb0f43c6c6b',
            },
        ],
        themes: [],
    },
};
