import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export async function register(req, res) {
  try {
    const { name, email, password, role, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const safeRole = ["Employer", "Job Seeker"].includes(role) ? role : "Job Seeker";
    const user = await User.create({ name, email, password: hashed, role: safeRole, phone });
    res.status(201).json({ token: signToken(user._id), user: user.toJSON() });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.blocked) return res.status(403).json({ message: "Account blocked" });
    res.json({ token: signToken(user._id), user: user.toJSON() });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function me(req, res) {
  res.json({ user: req.user.toJSON() });
}
