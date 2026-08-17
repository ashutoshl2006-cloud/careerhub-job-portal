import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export async function dashboard(req, res) {
  const [users, employers, seekers, jobs, applications] = await Promise.all([
    User.countDocuments(), User.countDocuments({ role: "Employer" }),
    User.countDocuments({ role: "Job Seeker" }), Job.countDocuments(), Application.countDocuments()
  ]);
  res.json({ users, employers, seekers, jobs, applications });
}

export async function users(req, res) {
  res.json(await User.find().select("-password").sort({ createdAt: -1 }));
}

export async function toggleBlock(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.blocked = !user.blocked;
  await user.save();
  res.json(user);
}

export async function allJobs(req, res) {
  res.json(await Job.find().populate("postedBy", "name email").populate("company", "companyName"));
}

export async function removeJob(req, res) {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job removed" });
}

export async function allApplications(req, res) {
  res.json(await Application.find().populate("applicantId", "name email").populate("jobId", "title"));
}
