import express from 'express';
import cors from 'cors';
import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import Client from "pg"


const MPORT = 3333 || process.env.PORT;
const Maddress = process.env.MILVUS_ADDRESS || "localhost:19530";
const Musername = process.env.MILVUS_USERNAME || "root";
const Mpassword = process.env.MILVUS_PASSWORD || "Milvus";
const mssl = false;

const PGPort = 5432 || process.env.PORT;
const PGusername = process.env.MILVUS_USERNAME || "postgres";
const PGpassword = process.env.MILVUS_PASSWORD || "postgres";
const PGdatabase = process.env.MILVUS_DATABASE || "postgres";
const PGhost = process.env.MILVUS_HOST || "localhost";

const milvusClient = new MilvusClient(Maddress, mssl, Musername, Mpassword);
milvusClient.connect();
const db = new Client.Client({
    username: PGusername,
    password: PGpassword,
    database: PGdatabase,
    host: PGhost,
    port: PGPort
});


const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.get('/milvus', async (req, res) => {
    res.send(await getVectorData(req.query.searchQuery));
});

app.get('/postgres', async (req, res) => {
    const data = await getRelData(req.query.searchQuery)
    res.send(data);
});

app.listen(MPORT, async () => {
    console.log(`Server is running on http://localhost:${MPORT}`);
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
    const res = await db.query("select 1");
    console.log(res.rows);
    return res.rows;
}