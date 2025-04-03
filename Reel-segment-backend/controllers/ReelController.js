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
};
