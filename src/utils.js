export const parseETHFormat = (priceStr) => {
    return (Number(priceStr) * 0.000000000000000001).toFixed(4);
}