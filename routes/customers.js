const express = require("express");
const router = express.Router();
const Customer = require("../models/customers");

// List Customer
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add Customer
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Latest Unprinted
router.get("/latest-unprinted", async (req, res) => {
  try {
    const customer = await Customer.findOne({ printed: false }).sort({
      createdAt: 1,
    });
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send({ message: "No unprinted customer found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get count of printed customers
router.get("/count-printed", async (req, res) => {
  try {
    const count = await Customer.countDocuments({ printed: true });
    console.log({ count });
    res.send({ count });
  } catch (error) {
    console.error("Error counting printed customers:", error);
    res.status(500).send(error);
  }
});
// Get count of unprinted customers
router.get("/count-unprinted", async (req, res) => {
  try {
    const count = await Customer.countDocuments({ printed: false });
    res.send({ count });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Print
router.patch("/:id/print", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { printed: true },
      { new: true }
    );
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get Customer by ID
router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send({ message: "Customer not found" });
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
