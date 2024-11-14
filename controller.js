const mongoose = require("mongoose");
const Customer = require("./userModel");
const InsurancePolicyPlan = require("./policyModel");

exports.getAllData = async (req, res) => {
  try {
    const [customers, policies] = await Promise.all([
      Customer.find().lean(),
      InsurancePolicyPlan.find().lean(),
    ]);

    res.json({
      customers: customers,
      Policies: policies,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const customer = await Customer.findOne({ id: customerId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.imageData = req.file.buffer;
    await customer.save();

    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
