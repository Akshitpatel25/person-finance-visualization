import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true, enum: ["Food", "Transport", "Shopping", "Bills", "Other"] },
  budget: { type: Number, required: true },
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
