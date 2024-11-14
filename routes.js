const express = require('express');
const router = express.Router();
const combinedController = require('./controller');
const multer = require('multer');

// Route to get all customers and policies in a single response
router.get('/all-data', combinedController.getAllData);



const upload = multer();

// Route to upload an image for a customer
router.post('/customers/:id/upload', upload.single('file'), combinedController.uploadImage);

// Route to retrieve a customer image by customer ID
router.get('/customers/:id/image', combinedController.getImage);
  

module.exports = router