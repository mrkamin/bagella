import mongoose from "mongoose";

const connection = { isConnected: null as null | number };

export const connectToDB = async () => {
    try {
        if (connection.isConnected) return;
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in the environment variables.");

        }

        const db = await mongoose.connect(mongoURI);
        connection.isConnected = db.connections[0].readyState;
    } catch (err) {
        console.log("Couldn't connect with the database. error = ", err);
        throw err;
    }
}