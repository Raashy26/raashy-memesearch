const axios = require('axios');

const KLIPY_API_KEY = process.env.KLIPY_API_KEY;

module.exports.searchKlipy = async (query) => {
    try {
        const url = `https://api.klipy.com/v1/search`;

        const res = await axios.get(url, {
            params: {
                q: query,
                api_key: KLIPY_API_KEY,
                limit: 10
            }
        });

        if (!res.data || !res.data.results) return [];

        // Normalizar para formato universal
        return res.data.results.map(item => ({
            source: "klipy",
            type: item.type || "gif",
            title: item.title || query,
            thumb: item.thumbnail || item.url,
            url: item.url,
        }));

    } catch (err) {
        console.error("KLIPY API error:", err.response?.data || err.message);
        return [];
    }
};
