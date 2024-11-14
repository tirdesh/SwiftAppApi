// models/InsurancePolicyPlan.js
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const insurancePolicyPlanSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  customerId: {
    type: Number,
    required: true,
  },
  policyType: {
    type: String,
    required: true,
  },
  premiumAmount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "InsurancePolicyPlan",
  insurancePolicyPlanSchema
);
