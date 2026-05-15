const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// Add lead
router.post("/", async (req, res) => {
  const lead = await Lead.create(req.body);
  res.json(lead);
});

// Get all leads
router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});
router.put("/:id", async (req, res) => {
  const updatedLead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedLead);
});
module.exports = router;