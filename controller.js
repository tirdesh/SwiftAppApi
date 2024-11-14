// controller.js
const mongoose = require("mongoose");
const Customer = require("./userModel");
const InsurancePolicyPlan = require("./policyModel");

exports.getAllData = async (req, res) => {
  try {
    const [customers, policies] = await Promise.all([
      Customer.find().select("-imageData").lean(),
      InsurancePolicyPlan.find().lean(),
    ]);

    res.json({
      success: true,
      data: {
        customers,
        policies,
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const customerId = parseInt(req.params.id, 10);
    const customer = await Customer.findOne({ id: customerId });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    customer.imageData = req.file.buffer;
    await customer.save();

    res.json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getImage = async (req, res) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const customer = await Customer.findOne({ id: customerId });

    if (!customer || !customer.imageData) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    res.set("Content-Type", "image/jpeg");
    res.send(customer.imageData);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
