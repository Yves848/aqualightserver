import mongoose from "npm:mongoose";


const logSchema = new mongoose.Schema({
  timestamp: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true},
  status: { type: String, required: true }
});


export default mongoose.model("Log",logSchema);