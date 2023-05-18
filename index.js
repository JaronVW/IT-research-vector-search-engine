import express from 'express';

import cors from 'cors';
import sqlite3 from 'sqlite3';
import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { DataType } from "@zilliz/milvus2-sdk-node";


const PORT = process.env.PORT || 3000;
const address = "localhost:19530" || process.env.MILVUS_ADDRESS;
const username = "root" || process.env.MILVUS_USERNAME;
const password = "Milvus" || process.env.MILVUS_PASSWORD;
const ssl = false;

const milvusClient = new MilvusClient(address, ssl, username, password);
milvusClient.connect();
const db = new sqlite3.Database('./sqlite/db.sqlite3');


const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/milvus', async (req, res) => {
    milvusClient.showCollections().then((collections) => {
        res.send({ collections });
    });
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});