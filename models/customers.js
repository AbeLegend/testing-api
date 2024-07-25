const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    salesmanId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
      required: true,
    },
    npwp: {
      type: String,
      required: true,
    },
    customerPriceCategory: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    contactNo: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    kuota: {
      type: Number,
    },
    preferredExpedition: {
      type: String,
      required: true,
    },
    printed: {
      type: Boolean,
      default: false,
    },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

customerSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
