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
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Set Budget</h2>
      <form onSubmit={handleSubmit}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>
        <Input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget Amount" />
        <Button type="submit">Set Budget</Button>
      </form>

      <h3 className="text-lg font-semibold mt-4">Current Budgets</h3>
      <ul>
        {budgets.map((b) => (
          <li key={b._id}>{b.category}: ${b.budget}</li>
        ))}
      </ul>
    </div>
  );
}
