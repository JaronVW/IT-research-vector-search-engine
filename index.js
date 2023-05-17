import express from 'express';
const post = 3000 || process.env.PORT;
const app = express();

// express basic setup

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost://${PORT}`);
});