import express from "express";
import { 
  create, 
  update, 
  deleteUser, 
  filterStudents,
  getStudentByRegNo  // Add this import
} from "../controller/userController.js";
import multer from "multer";

const router = express.Router();

// Multer configuration for PDF uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  },
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 6 // Maximum 6 files
  }
});

// Document fields configuration
const documentFields = [
  { name: 'signedPermissionLetter', maxCount: 1 },
  { name: 'offerLetter', maxCount: 1 },
  { name: 'completionCertificate', maxCount: 1 },
  { name: 'internshipReport', maxCount: 1 },
  { name: 'studentFeedback', maxCount: 1 },
  { name: 'employerFeedback', maxCount: 1 }
];

// CREATE - New user with documents
router.post("/create", upload.fields(documentFields), create);

// UPDATE - Existing user (all fields + documents)
router.put("/update/:registerNumber", upload.fields(documentFields), update);

// DELETE - User and their documents
router.delete("/delete/:registerNumber", deleteUser);

// FILTER - Get students with form-data parameters
const formDataParser = multer(); // No storage needed for filter
router.post("/filter", formDataParser.none(), filterStudents);



// GET - Retrieve single student by registration number
router.get("/student/:registerNumber", getStudentByRegNo);

export default router;