const mongoose = require('mongoose')
const Customer = require('./userModel');
const InsurancePolicyPlan = require('./policyModel');

// Retrieve All The Data
exports.getAllData = async (req, res) => {
  try {
    const [customers, policies] = await Promise.all([
      Customer.find(),
      InsurancePolicyPlan.find()
    ]);

    res.json({
      Customers: customers,
      Policies: policies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Upload image and associate it with a customer
exports.uploadImage = async (req, res) => {
    try {
      // Convert req.params.id to an integer if it's passed as a string
      const customerId = parseInt(req.params.id, 10);
        
      // Find customer by custom integer `id` field
      const customer = await Customer.findOne({ id: customerId });
      
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      // Save the GridFS file ID in the customer's document
      customer.imageData = req.file.buffer;
      await customer.save();
  
      res.json({ message: 'Image uploaded successfully', fileId: req.file.id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Retrieve image by customer ID
exports.getImage = async (req, res) => {
try {
    const customer = await Customer.findById(req.params.id);
    if (!customer || !customer.imageData) {
        return res.status(404).json({ message: 'Image not found' });
    }

    res.set('Content-Type', 'image/jpeg'); // Set the content type based on the image format
    res.send(customer.imageData);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};
