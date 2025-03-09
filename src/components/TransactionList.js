"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // ✅ Import Button
import { Trash2 } from "lucide-react"; // ✅ Import Trash Icon

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then(setTransactions);
  }, []);

  // ✅ Function to Delete a Transaction
  const deleteTransaction = async (id) => {
    const res = await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setTransactions(transactions.filter((tx) => tx._id !== id)); // ✅ Remove from UI
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div key={tx._id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm">
            <div>
              <span className="font-medium">{tx.description}</span> - 
              <span className="text-gray-500 text-sm ml-2">{format(new Date(tx.date), "dd/MM/yyyy")}</span> 
              - <span className="font-semibold">${tx.amount}</span>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              className="ml-2"
              onClick={() => deleteTransaction(tx._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
