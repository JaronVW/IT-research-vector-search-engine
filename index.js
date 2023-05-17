const express = require('express');
const PORT = 3000 || process.env.PORT;
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite/db.sqlite3');

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});