import '@testing-library/jest-dom';

Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: jest.fn(() => 'blob:mock-studio-frame'),
});
Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    value: jest.fn(),
});
