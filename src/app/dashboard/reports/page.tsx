"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import { ReportFilters } from "@/components/dashboard/report-filters";

// Mock data for chart
const spendingData = [
  { name: "Groceries", total: 400 },
  { name: "Utilities", total: 200 },
  { name: "Dining", total: 300 },
  { name: "Transport", total: 150 },
  { name: "Shopping", total: 250 },
  { name: "Healthcare", total: 100 },
];

const incomeData = [
  { name: "Salary", total: 5000 },
  { name: "Freelance", total: 1200 },
  { name: "Investment", total: 300 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
        <p className="text-muted-foreground">Analyze your income, spending, and financial trends.</p>
      </div>

      <ReportFilters />

      {/* Spending Analysis Example */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Spending by Category (Last 30 Days)</CardTitle>
          <CardDescription>Overview of your expenses across different categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] bg-muted rounded-md flex items-center justify-center">
            <BarChart3 className="h-24 w-24 text-muted-foreground" />
            <p className="text-muted-foreground ml-4">Spending Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Income Summary Example */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Income Sources (Last 30 Days)</CardTitle>
          <CardDescription>Breakdown of your income by source.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] bg-muted rounded-md flex items-center justify-center">
            <TrendingUp className="h-24 w-24 text-muted-foreground" />
            <p className="text-muted-foreground ml-4">Income Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
