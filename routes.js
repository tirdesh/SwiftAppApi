// routes.js
const express = require("express");
const router = express.Router();
const combinedController = require("./controller");
const multer = require("multer");

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Routes
router.get("/all-data", combinedController.getAllData);
router.post(
  "/customers/:id/upload",
  upload.single("file"),
  combinedController.uploadImage
);
router.get("/customers/:id/image", combinedController.getImage);

module.exports = router;
