/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect, useState, useRef } from "react";
import AddTransactionForm from "@/components/AddTransactionForm";
import TransactionList from "@/components/TransactionList";
import ExpensesChart from "@/components/ExpensesChart";
import CategoryChart from "@/components/CategoryChart";
import BudgetForm from "@/components/BudgetForm";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle } from "lucide-react"; // Icons


export default function Home() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [overspentCategories, setOverspentCategories] = useState([]);

  // Section Refs
  const dashboardRef = useRef(null);
  const reportsRef = useRef(null);
  const transactionsRef = useRef(null);

  useEffect(() => {
    Promise.all([fetch("/api/transactions").then(res => res.json()), fetch("/api/budgets").then(res => res.json())])
      .then(([transactions, budgets]) => {
        // @ts-ignore
        setTotalExpenses(transactions.reduce((sum, tx) => sum + Number(tx.amount), 0));

        // @ts-ignore
        const spendingByCategory = transactions.reduce((acc, tx) => {
          acc[tx.category] = (acc[tx.category] || 0) + Number(tx.amount);
          return acc;
        }, {});

        const overspent = budgets
            // @ts-ignore
          .filter(b => spendingByCategory[b.category] > b.budget)
          // @ts-ignore
          .map(b => b.category);

        setOverspentCategories(overspent);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* ✅ Main Content */}
      <div className="flex-1 p-6">
        {/* ✅ Header (Top Bar) */}
        <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold">Welcome Back! 👋</h2>
            <p className="text-sm text-gray-500">Your personal finance dashboard</p>
          </div>
          
        </div>

        {/* ✅ Dashboard Section */}
        <div ref={dashboardRef} className="pb-16">
          <h2 className="text-xl font-bold mb-4">🏠 Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 flex items-center justify-between bg-white shadow-lg">
              <div>
                <h2 className="text-lg font-semibold">Total Expenses</h2>
                <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
              </div>
              <ArrowDownCircle className="w-10 h-10 text-red-500" />
            </Card>

            {overspentCategories.length > 0 && (
              <Card className="p-6 bg-red-100 shadow-lg">
                <h2 className="text-lg font-semibold text-red-700">⚠️ Overspent Categories</h2>
                <ul className="mt-2">
                  {overspentCategories.map((cat) => (
                    <li key={cat} className="font-medium">{cat}</li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>

        {/* ✅ Reports Section */}
        <div ref={reportsRef} className="pb-16">
          <Card className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold flex items-center mb-2">
              📊 Financial Reports
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Get a visual breakdown of your spending and financial habits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">💸 Monthly Expenses</h3>
                <ExpensesChart />
              </div>

              <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">📂 Category Breakdown</h3>
                <CategoryChart />
              </div>
            </div>
          </Card>
        </div>


        {/* ✅ Transactions Section */}
        <div ref={transactionsRef} className="pb-16">
          <h2 className="text-xl font-bold mb-4">🔄 Transactions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BudgetComparisonChart />

            {/* ✅ Wrap BudgetForm in a Card for better UI */}
            <Card className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold flex items-center">
                💰 Set Monthly Budget
              </h2>
              <p className="text-gray-500 text-sm mb-4">Allocate budget for each category</p>
              <BudgetForm />
            </Card>
          </div>

          </div>

          <div className="mt-6">
            <Card className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold flex items-center">
                📝 Add a New Transaction
              </h2>
              <p className="text-gray-500 text-sm mb-4">Enter your expense details below</p>
              <AddTransactionForm />
            </Card>
          </div>


          <div className="mt-6">
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
}
