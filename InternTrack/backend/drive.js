// backend/drive.js
import fs from "fs";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "drive.json", // your credentials file
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const driveService = google.drive({ version: "v3", auth });

export default driveService;
