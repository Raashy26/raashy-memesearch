const redis = require('redis');

let client;
let fallbackCache = {}; // fallback em caso de falha no Redis

try {
    client = redis.createClient({
        url: process.env.REDIS_URL
    });
    client.connect();
    client.on('error', (err) => {
        console.log("⚠️ Redis indisponível, a usar cache em memória.");
        client = null;
    });
} catch {
    client = null;
}

module.exports = {
    async get(key) {
        if (client) {
            const cached = await client.get(key);
            return cached ? JSON.parse(cached) : null;
        }
        return fallbackCache[key] || null;
    },

    async set(key, value) {
        if (client) {
            await client.setEx(key, 60 * 5, JSON.stringify(value)); // 5 minutos
        } else {
            fallbackCache[key] = value;
            setTimeout(() => delete fallbackCache[key], 1000 * 60 * 5);
        }
    }
};
