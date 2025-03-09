import connectDB from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}


export async function POST(req: NextRequest) {
  await connectDB();
  const { amount, date, description, category } = await req.json();

  const transaction = new Transaction({
    amount,
    date: date ? new Date(date) : new Date(), 
    description,
    category,
  });

  await transaction.save();
  return NextResponse.json(transaction);
}


export async function DELETE(req: NextRequest) {
  await connectDB();
  
  const { id } = await req.json(); // Get the transaction ID

  if (!id) {
    return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
  }

  await Transaction.findByIdAndDelete(id); // Delete from database

  return NextResponse.json({ message: "Transaction deleted successfully" });
}

