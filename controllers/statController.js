import CryptoStats from "../models/statsModel.js";
import { getStandardDeviation } from "../utils/calucalteDeviation.js";
const validCoins = [
    'bitcoin', 'matic-network', 'ethereum'
]

export const statsController = async (req, res) => {
    // Extract the coin parameter from the query
    const { coin } = req.query;

    // Check if the coin is valid
    if (!validCoins.includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin specified. Valid options are: bitcoin, matic-network, ethereum.' });
    }

    try {
        // Fetch the latest data for the requested coin
        const latestData = await CryptoStats.findOne({ id: coin }).sort({ createdAt: -1 }); // Sort by createdAt to get the latest entry

        // Check if data exists for the requested coin
        if (!latestData) {
            return res.status(404).json({ error: `No data found for coin: ${coin}.` });
        }

        // Send the fetched data as a response
        return res.status(200).json(latestData);
    } catch (error) {
        console.error(`Error fetching stats for ${coin}:`, error.message);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};


export const deviationController = async (req, res) => {
    const { coin } = req.query;

    if (!validCoins.includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin specified. Valid options are: bitcoin, matic-network, ethereum.' });
    }

    try {
        // Fetch the last 100 records for the requested coin
        const records = await CryptoStats.find({ id: coin }).sort({ createdAt: -1 }).limit(100);

        // Check if we have records
        if (records.length === 0) {
            return res.status(404).json({ error: `No records found for coin: ${coin}.` });
        }

        // Extract prices from the records
        const prices = records.map(record => record.currentPriceUsd);

        // Calculate the standard deviation
        const deviation = getStandardDeviation(prices);

        // Send the response
        return res.status(200).json({ deviation: deviation.toFixed(2) }); // Format to 2 decimal places
    } catch (error) {
        console.error(`Error fetching deviation for ${coin}:`, error.message);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
};