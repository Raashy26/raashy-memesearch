require('dotenv').config();
const express = require('express');
const cors = require('cors');

const searchRouter = require('./routes/search');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/search', searchRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🔥 MemeSearch backend a correr na porta ${PORT}`);
});
