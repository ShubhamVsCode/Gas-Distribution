import mongoose from "mongoose";

const GasSchema = new mongoose.Schema(
  {
    gasSerialNumber: {
      type: String,
      required: true,
    },
    receivingDate: {
      type: Date,
    },  
    sellingDate: {
      type: Date,
    },
    customerName: {
      type: String,
    },
    customerPhone: {
      type: String,
    },
    consumerNumber: {
      type: String,
    },
    customerAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gas || mongoose.model("Gas", GasSchema);
