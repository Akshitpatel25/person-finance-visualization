"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BudgetForm() {
  const [category, setCategory] = useState("Food");
  const [budget, setBudget] = useState("");
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then(setBudgets);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, budget }),
    });
    setBudget("");
    fetch("/api/budgets").then((res) => res.json()).then(setBudgets);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ✅ Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded-md w-full bg-gray-50 text-gray-700"
        >
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Bills">💡 Bills</option>
          <option value="Other">🔹 Other</option>
        </select>

        {/* ✅ Budget Amount Input */}
        <Input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget Amount ($)"
          type="number"
          className="p-3 border rounded-md w-full"
        />
      </div>

      {/* ✅ Submit Button */}
      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-md">
        💾 Save Budget
      </Button>

      {/* ✅ Budget List Display */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold">📊 Current Budgets</h3>
        <ul className="mt-2 space-y-1">
          {budgets.map((b) => (
            <li key={b._id} className="flex justify-between p-2 bg-gray-50 rounded-md">
              <span>{b.category}</span>
              <span className="font-bold">${b.budget}</span>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
