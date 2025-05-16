import { MongoClient } from "mongodb";


const uri = process.env.MONGO_URI!;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalWithMongo = globalThis as typeof globalThis & GlobalWithMongo;


if (!process.env.MONGO_URI) {
    throw new Error("Plese add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;