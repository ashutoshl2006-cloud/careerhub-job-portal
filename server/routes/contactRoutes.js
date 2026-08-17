import { Router } from "express";
import Contact from "../models/Contact.js";
const router = Router();
router.post("/", async (req, res) => {
  try {
    const item = await Contact.create(req.body);
    res.status(201).json({ message: "Thank you for contacting us", item });
  } catch (e) { res.status(500).json({ message: e.message }); }
});
export default router;
