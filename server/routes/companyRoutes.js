import { Router } from "express";
import { getMyCompany, upsertCompany } from "../controllers/companyController.js";
import { protect, roles } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
const router = Router();
router.get("/me", protect, roles("Employer"), getMyCompany);
router.post("/me", protect, roles("Employer"), upload.single("logo"), upsertCompany);
export default router;
