
// Function to calculate standard deviation
export const getStandardDeviation = (prices) => {
    const n = prices.length;


    if (n === 0) return 0;

    // Calculate the mean
    const mean = prices.reduce((sum, price) => sum + price, 0) / n;

    // Calculate the variance
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / n;

    // Return the standard deviation
    return Math.sqrt(variance);
};