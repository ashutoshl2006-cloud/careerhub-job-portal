import { Router } from "express";
import { apply, applicants, myApplications, updateStatus } from "../controllers/applicationController.js";
import { protect, roles } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/", protect, roles("Job Seeker"), apply);
router.get("/my", protect, roles("Job Seeker"), myApplications);
router.get("/job/:jobId", protect, roles("Employer"), applicants);
router.put("/:id/status", protect, roles("Employer"), updateStatus);
export default router;
