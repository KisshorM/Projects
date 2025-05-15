import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  registerNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  title: String,
  mobileNumber: String,
  section: String,
  obtainedInternship: {
    type: String, // "Yes" or "No"
    enum: ["Yes", "No"],
  },
  period: Number, // in months
  startDate: Date,
  endDate: Date,
  companyName: String,
  placementSource: {
    type: String,
    enum: ["CDC", "External"],
    required: function() {
      return this.obtainedInternship === "Yes";
    }
  },
  internshipType: {
    type: String,
    enum: ["Abroad", "India"],
    required: function() {
      return this.obtainedInternship === "Yes";
    }
  },
  stipend: Number,
  // PDF Documents (all optional)
  offerLetter: String,                // Google Drive URL
  signedPermissionLetter: String,     // Google Drive URL
  completionCertificate: String,      // Google Drive URL
  internshipReport: String,           // Google Drive URL
  studentFeedback: String,           // Google Drive URL
  employerFeedback: String           // Google Drive URL
  
}, { timestamps: true });

const Student = mongoose.model("Student", userSchema);

export default Student;