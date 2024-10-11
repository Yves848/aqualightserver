import mongoose from "npm:mongoose";


const logSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true},
  status: { type: String, required: true }
});


export default mongoose.model("Log",logSchema);