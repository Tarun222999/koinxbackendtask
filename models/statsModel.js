import mongoose from 'mongoose';

const cryptoStatsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    currentPriceUsd: {
        type: Number,
        required: true,
    },
    marketCapUsd: {
        type: Number,
        required: true,
    },
    priceChange24h: {
        type: Number,
        required: true,
    },
    priceChange24hinUSD: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create a model from the schema
const CryptoStats = mongoose.model('CryptoStats', cryptoStatsSchema);

export default CryptoStats;