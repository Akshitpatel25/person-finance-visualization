import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ["Food", "Transport", "Shopping", "Bills", "Other"] },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
