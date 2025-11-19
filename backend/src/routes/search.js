const express = require('express');
const router = express.Router();

const { searchKlipy } = require('../services/klipy');
const { searchHumor } = require('../services/humor');
const { searchShorts } = require('../services/shorts');
const cache = require('../utils/cache');

router.get('/', async (req, res) => {
    try {
        const q = req.query.q || '';
        if (!q) return res.json({ results: [] });

        // Verificar cache
        const cached = await cache.get(q);
        if (cached) {
            return res.json({ results: cached, cached: true });
        }

        // Fazer chamadas às APIs (em paralelo)
        const [klipy, humor, shorts] = await Promise.all([
            searchKlipy(q),
            searchHumor(q),
            searchShorts(q)
        ]);

        const results = [...klipy, ...humor, ...shorts];

        // Guardar no cache
        await cache.set(q, results);

        res.json({ results, cached: false });

    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
