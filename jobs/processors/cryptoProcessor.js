import CryptoStats from "../../models/statsModel.js";
import { getCoinData } from "../../utils/coingeckoApi.js";

export const cryptoProcessor = async (coinId) => {
    try {
        const coinData = await getCoinData(coinId);
        if (coinData) {
            const { id, name, currentPriceUsd, marketCapUsd, priceChange24h, priceChange24hinUSD } = coinData;

            // Create a new document in the database
            const newCryptoStat = new CryptoStats({
                id,
                name,
                currentPriceUsd,
                marketCapUsd,
                priceChange24h,
                priceChange24hinUSD,
            });

            await newCryptoStat.save(); // Save the new document

            console.log(`New data for ${name} saved in the database.`);
        }
    } catch (error) {
        console.error(`Error fetching or saving data for ${coinId}:`, error.message);
    }
};
