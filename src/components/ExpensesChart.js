"use client";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpensesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((transactions) => {
        const grouped = transactions.reduce((acc, tx) => {
          const month = new Date(tx.date).toLocaleString("default", { month: "short" });
          acc[month] = (acc[month] || 0) + tx.amount;
          return acc;
        }, {});

        setData(
          Object.entries(grouped).map(([month, total]) => ({
            month,
            total: parseFloat(total.toFixed(2)), // Round to 2 decimal places
          }))
        );
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} /> 
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
