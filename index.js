const express = require('express');
const PORT = 3000 || process.env.PORT;
const app = express();



app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});