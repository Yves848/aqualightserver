import mongoose from 'npm:mongoose';
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
mongoose.connect(env.MONGO_URL);

const db = mongoose.connection;

db.on("error", (error) => console.error("Error in MongoDb connection: ", error));

db.once("open", () => { console.log("Connected to MongoDB!") });