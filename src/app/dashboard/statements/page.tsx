
"use client"; // Make this a client component

import React, { useState, useEffect } from "react"; // Added React, useState, useEffect
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from 'date-fns';

const generateRandomFourDigitString = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

interface Statement {
  id: string;
  accountName: string;
  period: string;
  dateGenerated: string;
  link: string;
}

// Initial mock data for statements
const initialStatements: Statement[] = [
  { id: "stmt1", accountName: "Primary Checking (•••• 1234)", period: "July 2024", dateGenerated: "2024-08-01", link: "#" },
  { id: "stmt2", accountName: "Primary Checking (•••• 1234)", period: "June 2024", dateGenerated: "2024-07-01", link: "#" },
  { id: "stmt3", accountName: "High-Yield Savings (•••• 5678)", period: "July 2024", dateGenerated: "2024-08-01", link: "#" },
  { id: "stmt4", accountName: "VaultbyChase Rewards Visa (•••• 3456)", period: "July 2024", dateGenerated: "2024-07-20", link: "#" },
  { id: "stmt5", accountName: "Primary Checking (•••• 1234)", period: "May 2024", dateGenerated: "2024-06-01", link: "#" },
];

export default function StatementsPage() {
  const [displayedStatements, setDisplayedStatements] = useState<Statement[]>(initialStatements);

  useEffect(() => {
    // Randomize account suffixes in accountName on client-side
    setDisplayedStatements(prevStatements =>
      prevStatements.map(stmt => ({
        ...stmt,
        accountName: stmt.accountName.replace(/\(•••• \d{4}\)/, `(•••• ${generateRandomFourDigitString()})`),
      }))
    );
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Account Statements</h1>
        <p className="text-muted-foreground">Access and download your monthly or periodic account statements.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Filter Statements</CardTitle>
          <div className="grid md:grid-cols-3 gap-4 mt-2">
            <Select defaultValue="all">
              <SelectTrigger id="accountFilter">
                <SelectValue placeholder="Filter by Account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {/* Note: These filter options are static and won't reflect randomized suffixes unless also made dynamic */}
                <SelectItem value="checking123">Primary Checking (•••• 1234)</SelectItem>
                <SelectItem value="savings5678">High-Yield Savings (•••• 5678)</SelectItem>
                <SelectItem value="cc3456">Rewards Visa (•••• 3456)</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger id="yearFilter">
                <SelectValue placeholder="Filter by Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <InputWithIcon type="text" placeholder="Search statements..." className="md:col-span-1" icon={<Search className="h-4 w-4 text-muted-foreground" />} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Statement Period</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedStatements.map((stmt) => (
                <TableRow key={stmt.id}>
                  <TableCell className="font-medium">{stmt.accountName}</TableCell>
                  <TableCell>{stmt.period}</TableCell>
                  <TableCell>{format(new Date(stmt.dateGenerated), 'MM/dd/yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <a href={stmt.link} download>
                        <Download className="mr-2 h-4 w-4" /> PDF
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {displayedStatements.length === 0 && (
                 <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No statements found for the selected criteria.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More Statements</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}
const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>}
        <Input
          type={type}
          className={`pl-${icon ? '10' : '3'} ${className}`} 
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputWithIcon.displayName = "InputWithIcon";
