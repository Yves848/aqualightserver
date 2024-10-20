import mongoose from "npm:mongoose";

const planningSchema = new mongoose.Schema({
  joursemaine: { type: Number, required: true },
  heure: { type: String, required: true },
  modeeclairage: { type: Number, required: true }
});

export default mongoose.model("Planning",planningSchema)