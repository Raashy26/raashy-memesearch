const axios = require('axios');

const HUMOR_API_KEY = process.env.HUMOR_API_KEY;

module.exports.searchHumor = async (query) => {
    try {
        const url = `https://api.humorapi.com/memes/search`;

        const res = await axios.get(url, {
            params: {
                query,
                media_type: "all",   // imagem + vídeo
                number: 10,
                api_key: HUMOR_API_KEY
            }
        });

        if (!res.data || !res.data.memes) return [];

        return res.data.memes.map(item => ({
            source: "humorapi",
            type: item.type || "image",
            title: item.title || query,
            thumb: item.image || item.video || "",
            url: item.url,
        }));

    } catch (err) {
        console.error("Humor API error:", err.response?.data || err.message);
        return [];
    }
};
