import multer from "multer";
import path from "path";
import fs from "fs";

const resumeDir = path.resolve("uploads/resumes");
const companyDir = path.resolve("uploads/companies");
fs.mkdirSync(resumeDir, { recursive: true });
fs.mkdirSync(companyDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isResume = file.fieldname === "resume";
    cb(null, isResume ? resumeDir : companyDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "resume" && file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF resumes are allowed"));
    }
    cb(null, true);
  }
});
