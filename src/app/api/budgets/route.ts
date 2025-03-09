import connectDB from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { category, budget } = await req.json();

  if (!category || !budget) {
    return NextResponse.json({ error: "Category and budget are required" }, { status: 400 });
  }

  const existingBudget = await Budget.findOne({ category });
  if (existingBudget) {
    existingBudget.budget = budget;
    await existingBudget.save();
    return NextResponse.json(existingBudget);
  }

  const newBudget = new Budget({ category, budget });
  await newBudget.save();
  return NextResponse.json(newBudget);
}
