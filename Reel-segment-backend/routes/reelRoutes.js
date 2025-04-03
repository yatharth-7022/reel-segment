const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const { ReelController, upload } = require("../controllers/ReelController");

const router = express.Router();

router.post(
  "/upload-reel",
  authMiddleware,
  upload.single("file"),
  ReelController.uploadReel
);
router.get("/get-all-reels", ReelController.getAllReels);

module.exports = router;
