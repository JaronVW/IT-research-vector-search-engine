import express from 'express';

import cors from 'cors';
import sqlite3 from 'sqlite3';
import { MilvusClient } from '@zilliz/milvus2-sdk-node';


const PORT = process.env.PORT || 3333;
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
    res.send(await getVectorData(req.query.searchQuery));
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


async function getVectorData(searchQuery) {

    if (searchQuery == null) return {};

    await milvusClient.loadCollection({ collection_name: "data" });
    const vectorResult = await milvusClient.query({
        collection_name: "data",
        expr: `word =="${searchQuery}"`,
        output_fields: ["vector"],
    })
    if (vectorResult.data.length == 0) return {};

    const relatedResult = await milvusClient.search({
        collection_name: "data",
        expr: "",
        vectors: [vectorResult.data[0].vector],
        vector_type: 101,
        search_params: {
            anns_field: "vector",
            topk: "2",
            metric_type: "L2",
            params: JSON.stringify({ nprobe: 10 }),
        }
    });
    return {
        ...relatedResult.results
    };
}

async function getRelData(searchQuery) {
    const statement = `SELECT * FROM data WHERE word = "${searchQuery} join related_data on data.id = related_data.id"`;
    return new Promise((resolve, reject) => {
        db.all(statement, [], (err, rows) => {
            if (err) reject([]);
            resolve(rows);
        });
    });
}