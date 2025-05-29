
"use client"; // Required for useState, useEffect, and event handlers

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Landmark as LoanIconLucide, FileText, PlusCircle, CalendarDays, DollarSign, Eye } from "lucide-react";
import Link from "next/link";
import { format, addDays, subDays, formatISO } from 'date-fns';
import type { AccountDetail, LoanAccountDetails } from "@/types/accounts";
import { AccountDetailsModal } from "@/components/dashboard/account-details-modal";


const userLoans: LoanAccountDetails[] = [
  {
    id: "loan1",
    userId: "userTest1",
    accountName: "Home Mortgage",
    accountType: "loan",
    loanType: "mortgage",
    accountNumberSuffix: "7890",
    balance: 245000.00, // Current principal balance
    originalPrincipal: 250000.00,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 365 * 5)), // 5 years ago
    icon: LoanIconLucide,
    interestRate: 0.0375,
    loanTermMonths: 360, // 30 years
    paymentsMade: 60,
    remainingPayments: 300,
    nextPaymentAmount: 1850.00,
    nextPaymentDate: formatISO(addDays(new Date(), 5)), // Due in 5 days
    lastPaymentAmount: 1850.00,
    lastPaymentDate: formatISO(subDays(new Date(), 25)),
    escrowBalance: 2500.00,
    propertyAddress: "123 Main St, Anytown, USA 12345",
  },
  {
    id: "loan2",
    userId: "userTest1",
    accountName: "Auto Loan - Toyota Camry",
    accountType: "loan",
    loanType: "auto",
    accountNumberSuffix: "4321",
    balance: 14500.00,
    originalPrincipal: 20000.00,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 365 * 1.5)), // 1.5 years ago
    icon: LoanIconLucide,
    interestRate: 0.0450,
    loanTermMonths: 60, // 5 years
    paymentsMade: 18,
    remainingPayments: 42,
    nextPaymentAmount: 350.00,
    nextPaymentDate: formatISO(addDays(new Date(), 10)),
    collateralDescription: "2022 Toyota Camry VIN: ...",
  },
];

export default function LoanManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetail | null>(null);

  const handleViewDetails = (account: AccountDetail) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Loan Management</h1>
          <p className="text-muted-foreground">View loan details, make payments, and explore loan options.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/loans/apply">
            <PlusCircle className="mr-2 h-5 w-5" /> Apply for a Loan
          </Link>
        </Button>
      </div>

      {userLoans.map(loan => (
        <Card key={loan.id} className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl text-secondary">{loan.accountName}</CardTitle>
              <LoanIconLucide className="h-8 w-8 text-primary" />
            </div>
            <CardDescription>Loan ending in •••• {loan.accountNumberSuffix}</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Principal Balance</p>
              <p className="text-3xl font-bold text-primary">${loan.balance.toFixed(2)}</p>
              
              <p className="text-sm text-muted-foreground mt-4">Progress</p>
              <Progress value={(loan.paymentsMade / loan.loanTermMonths) * 100} className="mt-1 h-2" />
              <p className="text-xs text-muted-foreground mt-1">{loan.paymentsMade} of {loan.loanTermMonths} payments made</p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <div>
                    <p className="text-sm text-muted-foreground">Next Payment Amount</p>
                    <p className="text-lg font-semibold text-foreground">${loan.nextPaymentAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <CalendarDays className="h-5 w-5 text-muted-foreground" />
                <div>
                    <p className="text-sm text-muted-foreground">Next Payment Date</p>
                    <p className="text-lg font-semibold text-foreground">{format(new Date(loan.nextPaymentDate), 'MM/dd/yyyy')}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Interest Rate: {(loan.interestRate * 100).toFixed(2)}%</p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => handleViewDetails(loan)}>
              <Eye className="mr-2 h-4 w-4"/> View Details
            </Button>
            <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" /> View Documents</Button>
            <Button size="sm">Make a Payment</Button>
          </CardFooter>
        </Card>
      ))}
      
      {userLoans.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            You do not have any active loans with VaultbyChase.
          </CardContent>
        </Card>
      )}
      <AccountDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} account={selectedAccount} />
    </div>
  );
}
