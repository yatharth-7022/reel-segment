const ReelModel = require("../models/ReelModel");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const ReelController = {
  uploadReel: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: "video", folder: "reels" },
        async (error, uploadResult) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "Cloudinary upload failed" });
          }
          const newReel = await ReelModel.createReel(
            uploadResult.secure_url,
            req.user.id
          );
          return res
            .status(201)
            .json({ message: "Reel uploaded successfully", reel: newReel });
        }
      );
      result.end(req.file.buffer);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllReels: async (req, res) => {
    try {
      console.log("🔍 [getAllReels] Request received");

      const reels = await ReelModel.getAllReels();

      if (!reels) {
        console.log("⚠️ [getAllReels] No reels found");
        return res.status(404).json({ message: "No reels available" });
      }

      console.log("✅ [getAllReels] Successfully retrieved reels:", reels);
      res.status(201).json(reels);
    } catch (error) {
      console.error("❌ [getAllReels] Error fetching reels:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
};
module.exports = { ReelController, upload };
