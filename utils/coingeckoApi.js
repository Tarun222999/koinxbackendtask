import axios from 'axios';

const API_URL = "https://api.coingecko.com/api/v3/coins"
export async function getCoinData(coinId) {
    try {
        // Dynamically construct the URL using the provided coinId
        const url = `${API_URL}/${coinId}`;

        // Make the GET request
        const response = await axios.get(url);



        // Optionally return the response data
        const {
            id,
            name,
            market_data: {
                current_price: {
                    usd: currentPriceUsd // Alias the current price in USD
                },
                market_cap: {
                    usd: marketCapUsd // Alias the market cap in USD
                },
                price_change_24h,
                price_change_24h_in_currency: {
                    usd: priceChange24hinUSD
                }
            }
        } = response.data;
        const requiredData = {
            id,
            name,
            currentPriceUsd,
            marketCapUsd,
            priceChange24h: price_change_24h,
            priceChange24hinUSD
        };

        // Return the aliased object
        return requiredData;
    } catch (error) {
        // Handle errors, such as network issues or invalid coinId
        console.error(`Error fetching data for coin ${coinId}:`, error.message);
    }
}

