import User from "../models/User.js";

export async function profile(req, res) {
  res.json(req.user);
}

export async function updateProfile(req, res) {
  const data = { ...req.body };
  delete data.password;
  const user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
  res.json(user);
}

export async function uploadResume(req, res) {
  if (!req.file) return res.status(400).json({ message: "PDF resume is required" });
  const resumePath = `/uploads/resumes/${req.file.filename}`;
  const user = await User.findByIdAndUpdate(req.user._id, { resume: resumePath }, { new: true });
  res.json({ message: "Resume uploaded", resume: user.resume });
}

export async function toggleSavedJob(req, res) {
  const user = await User.findById(req.user._id);
  const id = req.params.jobId;
  const exists = user.savedJobs.some(x => String(x) === id);
  user.savedJobs = exists ? user.savedJobs.filter(x => String(x) !== id) : [...user.savedJobs, id];
  await user.save();
  res.json({ saved: !exists, savedJobs: user.savedJobs });
}
