"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

export function ReportFilters() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-secondary">Generate Report</CardTitle>
        <CardDescription>Select criteria to generate your financial report.</CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="reportType">Report Type</Label>
          <Select defaultValue="spending">
            <SelectTrigger id="reportType">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spending">Spending Analysis</SelectItem>
              <SelectItem value="income">Income Summary</SelectItem>
              <SelectItem value="networth">Net Worth Trend</SelectItem>
              <SelectItem value="cashflow">Cash Flow Statement</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dateRange">Date Range</Label>
          <Select defaultValue="last30">
            <SelectTrigger id="dateRange">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 Days</SelectItem>
              <SelectItem value="last30">Last 30 Days</SelectItem>
              <SelectItem value="last90">Last 90 Days</SelectItem>
              <SelectItem value="monthtodate">Month to Date</SelectItem>
              <SelectItem value="yeartodate">Year to Date</SelectItem>
              <SelectItem value="custom">Custom Range...</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="md:self-end">
          <Button className="w-full md:w-auto">
            <Download className="mr-2 h-4 w-4"/> Generate & Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 