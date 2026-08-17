import Job from "../models/Job.js";

export async function listJobs(req, res) {
  try {
    const { search, location, category, minSalary, page = 1, limit = 9 } = req.query;
    const q = { status: "Active" };
    if (search) q.$or = [{ title: { $regex: search, $options: "i" } }, { skills: { $regex: search, $options: "i" } }];
    if (location) q.location = { $regex: location, $options: "i" };
    if (category) q.category = { $regex: category, $options: "i" };
    if (minSalary) q.salary = { $regex: minSalary, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const [jobs, total] = await Promise.all([
      Job.find(q).populate("company", "companyName logo location").populate("postedBy", "name").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Job.countDocuments(q)
    ]);
    res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getJob(req, res) {
  const job = await Job.findById(req.params.id).populate("company").populate("postedBy", "name email");
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
}

export async function createJob(req, res) {
  const job = await Job.create({ ...req.body, postedBy: req.user._id });
  res.status(201).json(job);
}

export async function updateJob(req, res) {
  const job = await Job.findOneAndUpdate({ _id: req.params.id, postedBy: req.user._id }, req.body, { new: true });
  if (!job) return res.status(404).json({ message: "Job not found or not owned by you" });
  res.json(job);
}

export async function deleteJob(req, res) {
  const job = await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user._id });
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json({ message: "Job deleted" });
}
