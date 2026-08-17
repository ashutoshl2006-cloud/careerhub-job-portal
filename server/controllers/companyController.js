import Company from "../models/Company.js";

export async function getMyCompany(req, res) {
  const company = await Company.findOne({ owner: req.user._id });
  res.json(company);
}

export async function upsertCompany(req, res) {
  const data = { ...req.body, owner: req.user._id };
  if (req.file) data.logo = `/uploads/companies/${req.file.filename}`;
  const company = await Company.findOneAndUpdate({ owner: req.user._id }, data, { new: true, upsert: true });
  res.json(company);
}
