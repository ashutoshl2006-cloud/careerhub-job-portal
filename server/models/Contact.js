import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  feedback: String
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
