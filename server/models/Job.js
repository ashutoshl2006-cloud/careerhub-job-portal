import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  location: { type: String, required: true },
  salary: String,
  experience: String,
  jobType: { type: String, default: "Full Time" },
  category: String,
  skills: [String],
  description: { type: String, required: true },
  deadline: Date,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Active", "Closed"], default: "Active" }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
