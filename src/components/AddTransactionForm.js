"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddTransactionForm() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, date, description, category }),
    });

    setAmount("");
    setDate("");
    setDescription("");
    setCategory("Food");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount ($)"
          type="number"
          className="p-3 border rounded-md"
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border rounded-md"
        />
      </div>
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (e.g., Grocery Shopping)"
        className="p-3 border rounded-md"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 border rounded-md w-full"
      >
        <option value="Food">🍔 Food</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Bills">💡 Bills</option>
        <option value="Other">🔹 Other</option>
      </select>
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md">
        ➕ Add Transaction
      </Button>
    </form>
  );
}
