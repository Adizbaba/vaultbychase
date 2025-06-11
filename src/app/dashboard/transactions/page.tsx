"use client";

import { useState, useMemo, useEffect } from "react";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { subDays, format } from "date-fns";
import type { Transaction } from "@/types/accounts";

const generateRandomFourDigitString = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Mock accounts for filtering - initial state
const initialFilterableAccounts = [
  { id: "all", name: "All Accounts" },
  { id: "checking123", name: "Primary Checking (•••• 1234)" },
  { id: "savings456", name: "High-Yield Savings (•••• 5678)" },
  { id: "cc1", name: "VaultbyChase Rewards Visa (•••• 3456)" },
  { id: "cc2", name: "VaultbyChase Travel Mastercard (•••• 7890)" }, // This was cc101, cc2 is new in cardspage
  { id: "loan1", name: "Mortgage (•••• 7890)" },
  { id: "loan2", name: "Auto Loan (•••• 4321)" },
  { id: "investment789", name: "Investment Portfolio (•••• 9012)" }, 
];

// Generate ~40 mock transactions
const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const descriptions = [
    "Grocery Store Purchase", "Salary Deposit", "Online Subscription", "Transfer to Savings", "Restaurant Bill",
    "ATM Withdrawal", "Refund from Amazon", "Rent Payment", "Utility Bill", "Coffee Shop", "Book Purchase",
    "Stock Dividend", "Concert Tickets", "Gas Station", "Pharmacy", "Gym Membership", "Freelance Payment",
    "Charity Donation", "Software Purchase", "Hardware Store", "Movie Tickets", "Flight Booking", "Hotel Stay",
    "Car Maintenance", "Insurance Premium", "Loan Payment", "Credit Card Payment", "Interest Earned", "Bank Fee",
    "Birthday Gift Received", "Online Course Fee", "Streaming Service", "Mobile Phone Bill", "Internet Bill",
    "Childcare Expenses", "Investment Purchase", "Investment Sale", "Parking Fee", "Public Transport", "Taxi Ride"
  ];
  const accountIds = initialFilterableAccounts.filter(acc => acc.id !== "all").map(acc => acc.id);
  const types: Array<Transaction["type"]> = ["debit", "credit", "transfer_out", "transfer_in", "payment", "fee", "interest", "dividend", "investment_buy", "investment_sell"];
  const statuses: Array<Transaction["status"]> = ["completed", "pending", "failed", "cancelled"];
  const today = new Date();

  for (let i = 0; i < 40; i++) {
    const accountId = accountIds[Math.floor(Math.random() * accountIds.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    let amount = parseFloat((Math.random() * (type === "credit" || type === "interest" || type === "dividend" || type === "investment_sell" ? 3000 : 500) + 5).toFixed(2));
    if (type === "debit" || type === "transfer_out" || type === "payment" || type === "fee" || type === "investment_buy") {
      amount = -amount;
    }

    transactions.push({
      id: `txn${i + 1}`,
      accountId: accountId,
      date: format(subDays(today, Math.floor(Math.random() * 90)), "yyyy-MM-dd"), 
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      amount: amount,
      type: type,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const allMockTransactions = generateMockTransactions();

export default function AllTransactionsPage() {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("all");
  const [displayedFilterableAccounts, setDisplayedFilterableAccounts] = useState(initialFilterableAccounts);

  useEffect(() => {
    // Randomize account suffixes in filterable account names on client-side
    setDisplayedFilterableAccounts(prevAccounts =>
      prevAccounts.map(acc => ({
        ...acc,
        name: acc.id === "all" ? acc.name : acc.name.replace(/\(•••• \d{4}\)/, `(•••• ${generateRandomFourDigitString()})`),
      }))
    );
  }, []);

  const displayedTransactions = useMemo(() => {
    if (selectedAccountId === "all") {
      return allMockTransactions;
    }
    return allMockTransactions.filter(txn => txn.accountId === selectedAccountId);
  }, [selectedAccountId]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>
        <p className="text-muted-foreground">View and filter all your transaction activity.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Filter by Account</CardTitle>
          <CardDescription>Select an account to view its specific transaction history.</CardDescription>
        </CardHeader>
        <div className="p-6 pt-0">
          <Label htmlFor="account-filter" className="sr-only">Filter by Account</Label>
          <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
            <SelectTrigger id="account-filter" className="w-full md:w-[300px]">
              <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent>
              {displayedFilterableAccounts.map(account => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      <TransactionHistory
        title="Filtered Transactions"
        transactions={displayedTransactions}
        showFilters={true} 
      />
    </div>
  );
}
