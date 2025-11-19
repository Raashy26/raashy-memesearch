const axios = require('axios');

const SHORTS_API_KEY = process.env.SHORTS_API_KEY;

module.exports.searchShorts = async (query) => {
    try {
        const url = `https://api.openwebninja.com/v1/shorts/search`;

        const res = await axios.get(url, {
            params: {
                q: query,
                limit: 10
            },
            headers: {
                "X-API-KEY": SHORTS_API_KEY
            }
        });

        if (!res.data || !res.data.results) return [];

        return res.data.results.map(item => ({
            source: "shorts",
            type: "video",
            title: item.title || query,
            thumb: item.thumbnail,
            url: item.url,  // link para vídeo original (TikTok/Shorts/Reels)
        }));

    } catch (err) {
        console.error("Shorts API error:", err.response?.data || err.message);
        return [];
    }
};
