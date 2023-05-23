import express from 'express';

import cors from 'cors';
import sqlite3 from 'sqlite3';
import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import { DataType } from "@zilliz/milvus2-sdk-node";


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
    await milvusClient.loadCollection({ collection_name: "data" });
    const vectors = await milvusClient.query({
        collection_name: "data",
        expr: `data_name =="${req.query.searchQuery}"`,
        output_fields: ["data_vectors"],
    })
    const result = await milvusClient.search({
        collection_name: "data",
        expr: "",
        vectors: [vectors.data[0].data_vectors],
        vector_type: 101,    // DataType.FloatVector
        search_params: {
            anns_field: "data_vectors",
            topk: "2",
            metric_type: "L2",
            params: JSON.stringify({ nprobe: 10 }),
        }
    });
    milvusClient.releaseCollection({ collection_name: "data" });
    res.send(result);
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});