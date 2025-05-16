import { Readable } from 'stream';
import driveService from '../drive.js';
import User from '../model/userModel.js';

// Shared PDF upload function
const uploadPDFToDrive = async (fileBuffer, fileName) => {
  const bufferStream = new Readable();
  bufferStream.push(fileBuffer);
  bufferStream.push(null);

  const uploadResponse = await driveService.files.create({
    requestBody: {
      name: fileName,
      mimeType: "application/pdf",
      parents: [process.env.GDRIVE_FOLDER_ID],
    },
    media: {
      mimeType: "application/pdf",
      body: bufferStream,
    },
  });

  await driveService.permissions.create({
    fileId: uploadResponse.data.id,
    requestBody: { role: "reader", type: "anyone" },
  });

  return {
    url: `https://drive.google.com/file/d/${uploadResponse.data.id}/view`,
    driveFileId: uploadResponse.data.id
  };
};

// Delete documents from Google Drive
const deleteFromDrive = async (fileId) => {
  try {
    await driveService.files.delete({ fileId });
  } catch (error) {
    console.error(`Failed to delete file ${fileId}:`, error.message);
    // Continue even if deletion fails to avoid blocking user deletion
  }
};

// Document processing helper
const processDocuments = async (files, registerNumber) => {
  const processed = {};
  const documentTypes = [
    'offerLetter',
    'signedPermissionLetter',
    'completionCertificate',
    'internshipReport',
    'studentFeedback',
    'employerFeedback'
  ];

  for (const type of documentTypes) {
    if (files && files[type]) {
      const { url, driveFileId } = await uploadPDFToDrive(
        files[type][0].buffer,
        `${registerNumber}_${type}.pdf`
      );
      processed[type] = url;
    }
  }
  return processed;
};

// Create user with documents
export const create = async (req, res) => {
  try {
    // Clean the incoming data
    const userData = { 
      ...req.body,
      // Ensure these are single values, not arrays
      placementSource: Array.isArray(req.body.placementSource) 
        ? req.body.placementSource[0] 
        : req.body.placementSource,
      internshipType: Array.isArray(req.body.internshipType) 
        ? req.body.internshipType[0] 
        : req.body.internshipType
    };

    const documents = await processDocuments(req.files, userData.registerNumber);
    
    if (Object.keys(documents).length === 0) {
      return res.status(400).json({ error: "At least one document is required" });
    }

    const newUser = await User.create({
      ...userData,
      ...documents
    });

    res.status(201).json({ 
      success: true, 
      data: newUser
    });

  } catch (error) {
    handleError(res, error, "createUser");
  }
};

// Update user and documents
export const update = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    const updates = { ...req.body };
    const documents = await processDocuments(req.files, registerNumber);

    const updatedUser = await User.findOneAndUpdate(
      { registerNumber },
      { $set: { ...updates, ...documents } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ 
      success: true, 
      data: updatedUser 
    });

  } catch (error) {
    handleError(res, error, "updateUser");
  }
};

// Delete user and their documents
export const deleteUser = async (req, res) => {
  try {
    const { registerNumber } = req.params;

    // Find user first to get document references
    const user = await User.findOne({ registerNumber });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete all associated documents from Drive
    const documentTypes = [
      'offerLetter',
      'signedPermissionLetter',
      'completionCertificate',
      'internshipReport',
      'studentFeedback',
      'employerFeedback'
    ];

    for (const type of documentTypes) {
      if (user[type]) {
        const fileId = extractFileIdFromUrl(user[type]);
        if (fileId) await deleteFromDrive(fileId);
      }
    }

    // Delete user record
    await User.deleteOne({ registerNumber });

    res.json({ 
      success: true,
      message: "User and all associated documents deleted"
    });

  } catch (error) {
    handleError(res, error, "deleteUser");
  }
};

// Helper to extract file ID from Google Drive URL
const extractFileIdFromUrl = (url) => {
  const match = url.match(/\/file\/d\/([^\/]+)/);
  return match ? match[1] : null;
};

// Shared error handler
const handleError = (res, error, context) => {
  console.error(`Error in ${context}:`, error);
  res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? error.message : undefined
  });
};

// Unified filter function
export const filterStudents = async (req, res) => {
  try {
    // Get all fields from form-data (req.body now contains the form fields)
    const { 
      company,
      internshipType, 
      placementSource,
      title,
      domain,
      minDuration,
      maxDuration
    } = req.body;

    // Build the query dynamically
    const query = {};
    
    if (company && company.trim()) query.companyName = new RegExp(company.trim(), 'i');
    if (internshipType && internshipType.trim()) query.internshipType = internshipType.trim();
    if (placementSource && placementSource.trim()) query.placementSource = placementSource.trim();
    if (title && title.trim()) query.title = new RegExp(title.trim(), 'i');
    if (domain && domain.trim()) query.domain = new RegExp(domain.trim(), 'i');
    
    // Handle duration range
    if (minDuration || maxDuration) {
      query.period = {};
      if (minDuration) query.period.$gte = parseInt(minDuration);
      if (maxDuration) query.period.$lte = parseInt(maxDuration);
    }

    const students = await User.find(query, 'registerNumber -_id');
    res.json(students.map(s => s.registerNumber));

  } catch (error) {
    handleError(res, error, "filterStudents");
  }
};

// Add this new function to your controller
export const getStudentByRegNo = async (req, res) => {
  try {
    const { registerNumber } = req.params;
    
    const student = await User.findOne(
      { registerNumber },
      '-_id -__v'  // Exclude MongoDB internal fields
    );

    if (!student) {
      return res.status(404).json({ 
        error: "Student not found",
        details: `No student found with registration number ${registerNumber}`
      });
    }

    res.json({
      success: true,
      data: student
    });

  } catch (error) {
    handleError(res, error, "getStudentByRegNo");
  }
};