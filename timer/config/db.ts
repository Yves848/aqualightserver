import mongoose from 'npm:mongoose';
import { config } from "https://deno.land/x/dotenv/mod.ts";

const env = config();
mongoose.connect(env.MONGO_URL)
.then(()=>{console.log('connected to MongoDB Aqualight')})
.catch((err)=>{console.log(err)});