export const round = (val: number, precision = 2) => {
    const hundred = Math.pow(10, precision);
    return Math.round(val * hundred) / hundred;
};
