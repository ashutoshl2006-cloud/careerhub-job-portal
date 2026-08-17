import Application from "../models/Application.js";
import Job from "../models/Job.js";

export async function apply(req, res) {
  try {
    const { jobId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const exists = await Application.findOne({ jobId, applicantId: req.user._id });
    if (exists) return res.status(409).json({ message: "Already applied to this job" });

    const app = await Application.create({
      jobId, applicantId: req.user._id,
      resume: req.user.resume || "",
      coverLetter
    });
    res.status(201).json(app);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function myApplications(req, res) {
  const apps = await Application.find({ applicantId: req.user._id }).populate({
    path: "jobId", populate: { path: "company", select: "companyName logo" }
  }).sort({ createdAt: -1 });
  res.json(apps);
}

export async function applicants(req, res) {
  const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found" });
  const apps = await Application.find({ jobId: job._id }).populate("applicantId", "name email phone resume");
  res.json(apps);
}

export async function updateStatus(req, res) {
  const app = await Application.findById(req.params.id).populate("jobId");
  if (!app || String(app.jobId.postedBy) !== String(req.user._id)) return res.status(404).json({ message: "Application not found" });
  app.status = req.body.status;
  await app.save();
  res.json(app);
}
