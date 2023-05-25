import express from 'express';
import cors from 'cors';
import { MilvusClient } from '@zilliz/milvus2-sdk-node';
import Client from "pg"


const EXPRESSPORT = process.env.MPORT || 3333;
const Maddress = process.env.MILVUS_ADDRESS || "localhost:19530";
const Musername = process.env.MILVUS_USERNAME || "root";
const Mpassword = process.env.MILVUS_PASSWORD || "Milvus";
const Mssl = false;

const PGPort = process.env.PGPort || 5433;
const PGusername = process.env.PG_USERNAME || "postgres";
const PGpassword = process.env.PG_PASSWORD || "postgres";
const PGdatabase = process.env.PG_DATABASE || "postgres";
const PGhost = process.env.PG_HOST || "localhost";

const milvusClient = new MilvusClient(Maddress, Mssl, Musername, Mpassword);
milvusClient.connect();
const db = new Client.Client({
    user: PGusername,
    password: PGpassword,
    database: PGdatabase,
    host: PGhost,
    port: PGPort
});


db
    .connect()
    .then(() => console.log('Postgres connected'))
    .catch((err) => console.error('connection error', err.stack))

const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send({ message: 'Test' });
});

app.get('/milvus', async (req, res) => {
    res.send(await getVectorData(req.query.searchQuery));
});

app.get('/postgres', async (req, res) => {
    res.send(await getRelData(req.query.searchQuery));
});

app.listen(EXPRESSPORT, async () => {
    console.log(`Server is running on http://localhost:${EXPRESSPORT}`);
});


async function getVectorData(searchQuery) {

    if (searchQuery == null) return [];

    await milvusClient.loadCollection({ collection_name: "data" });
    const vectorResult = await milvusClient.query({
        collection_name: "data",
        expr: `word =="${searchQuery}"`,
        output_fields: ["vector"],
    })
    if (vectorResult.data.length == 0) return [];

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
    return [
        ...relatedResult.results
    ];
}

async function getRelData(searchQuery) {
    const text = "SELECT * FROM data WHERE word iLIKE $1;"
    const values = [searchQuery];
    try {
        const res = await db.query(text, values)
        return res.rows
    } catch (err) {
        return []
    }
}