
"use client"; 

import { useState, useEffect } from 'react';
import { AccountSummaryCard } from "@/components/dashboard/account-summary-card";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { Button } from "@/components/ui/button";
import { DollarSign, Briefcase, TrendingUp, CreditCard as CreditCardIconLucide, PlusCircle, Landmark as LoanIcon } from "lucide-react";
import Link from "next/link";
import type { AccountDetail, CheckingAccountDetails, SavingsAccountDetails, InvestmentAccountDetails, CreditCardAccountDetails, LoanAccountDetails, Transaction } from "@/types/accounts";
import { AccountDetailsModal } from "@/components/dashboard/account-details-modal";
import { addDays, subDays, formatISO, format } from 'date-fns';

const generateRandomFourDigitString = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Initial Mock Data for multiple accounts with details
const initialUserAccounts: AccountDetail[] = [
  {
    id: "checking123",
    userId: "userTest1",
    accountName: "Primary Checking",
    accountType: "checking",
    accountNumberSuffix: "1234", // Placeholder
    balance: 5250.75,
    availableBalance: 5200.50,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 365)),
    icon: DollarSign,
    overdraftProtectionEnabled: true,
    linkedDebitCardNumberSuffix: "7890",
    last5Transactions: [
      { id: "ctxn1", date: formatISO(subDays(new Date(), 1)), description: "Paycheck Deposit", amount: 2200.00, type: "credit" },
      { id: "ctxn2", date: formatISO(subDays(new Date(), 2)), description: "Rent Payment", amount: -1500.00, type: "debit" },
    ],
    monthlyActivityFee: null,
    eStatementsEnabled: true,
  },
  {
    id: "savings456",
    userId: "userTest1",
    accountName: "High-Yield Savings",
    accountType: "savings",
    accountNumberSuffix: "5678", // Placeholder
    balance: 12870.20,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 730)),
    icon: Briefcase,
    interestRate: 0.045,
    apy: 0.0458,
    compoundingFrequency: "monthly",
    minimumBalanceRequired: 100.00,
    withdrawalLimits: { countPerCycle: 6, cycleType: "month", currentCycleWithdrawals: 2 },
    interestEarnedYTD: 250.30,
  },
   {
    id: "investment789",
    userId: "userTest1",
    accountName: "Retirement Fund",
    accountType: "investment",
    accountNumberSuffix: "9012", // Placeholder
    balance: 0, 
    portfolioValue: 150500.70,
    totalInvestment: 120000.00,
    totalGainLoss: 30500.70,
    totalGainLossPercentage: (30500.70 / 120000),
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 1000)),
    icon: TrendingUp,
    holdingCount: 2, // Corrected to match majorHoldings length
    majorHoldings: [
      { id: "hinv1", symbol: "VTI", name: "Vanguard Total Stock Market ETF", quantity: 200, currentValue: 50000.00, currentPrice: 250 },
      { id: "hinv2", symbol: "BND", name: "Vanguard Total Bond Market ETF", quantity: 500, currentValue: 37500.00, currentPrice: 75 },
    ],
    investmentStrategy: "Balanced",
    investmentRiskLevel: "moderate",
  },
  {
    id: "cc101",
    userId: "userTest1",
    accountName: "Travel Rewards Card",
    accountType: "credit_card",
    accountNumberSuffix: "1122", // Placeholder
    balance: -1200.50,
    creditLimit: 15000.00,
    availableCredit: 13799.50,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 800)),
    icon: CreditCardIconLucide,
    currentStatementBalance: 1100.00,
    minimumPaymentDue: 50.00,
    paymentDueDate: formatISO(addDays(new Date(), 12)),
    interestRateAPR: { purchase: 0.1899 },
    rewardsBalance: { miles: 55000, type: "miles", description: "Airline Miles" },
    lastPaymentAmount: 200.00,
    lastPaymentDate: formatISO(subDays(new Date(), 18)),
  },
   {
    id: "loan202",
    userId: "userTest1",
    accountName: "Auto Loan - Honda Civic",
    accountType: "loan",
    accountNumberSuffix: "7788", // Placeholder
    balance: 12500.00, 
    originalPrincipal: 22000.00,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 400)),
    icon: LoanIcon,
    interestRate: 0.0399,
    loanTermMonths: 60,
    paymentsMade: 13,
    remainingPayments: 47,
    nextPaymentAmount: 405.50,
    nextPaymentDate: formatISO(addDays(new Date(), 10)),
    loanType: "auto",
  }
];

// Mock transactions for all accounts (simplified for this page)
const mockTransactions: Transaction[] = [
  { id: "txn_chk_1", accountId: "checking123", date: formatISO(subDays(new Date(), 1)), description: "Utility Bill Payment", amount: -120.00, type: "debit", status: "completed" },
  { id: "txn_sav_1", accountId: "savings456", date: formatISO(subDays(new Date(), 5)), description: "Interest Earned", amount: 15.30, type: "credit", status: "completed" },
  { id: "txn_inv_1", accountId: "investment789", date: formatISO(subDays(new Date(), 3)), description: "Dividend - MSFT", amount: 50.25, type: "dividend", status: "completed" },
  { id: "txn_cc_1", accountId: "cc101", date: formatISO(subDays(new Date(), 2)), description: "Restaurant - The Grill", amount: -75.80, type: "payment", status: "completed" },
  { id: "txn_loan_1", accountId: "loan202", date: formatISO(subDays(new Date(), 7)), description: "Loan Payment", amount: -405.50, type: "payment", status: "completed" },
];


export default function AccountsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetail | null>(null);
  const [displayedUserAccounts, setDisplayedUserAccounts] = useState<AccountDetail[]>(initialUserAccounts);

  useEffect(() => {
    // Randomize account suffixes on client-side
    setDisplayedUserAccounts(prevAccounts => 
      prevAccounts.map(account => ({
        ...account,
        accountNumberSuffix: generateRandomFourDigitString(),
      }))
    );
  }, []);

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
          <h1 className="text-3xl font-bold text-foreground">My Accounts</h1>
          <p className="text-muted-foreground">Manage your accounts and view detailed transaction histories.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/accounts/open-new"> 
            <PlusCircle className="mr-2 h-5 w-5" /> Open New Account
          </Link>
        </Button>
      </div>

      {displayedUserAccounts.map(account => (
        <div key={account.id} className="space-y-6">
          <AccountSummaryCard
            account={account}
            onViewDetails={handleViewDetails}
          />
          <div className="pl-0 md:pl-0">
            <TransactionHistory 
              title={`Recent Activity for ${account.accountName}`}
              transactions={mockTransactions.filter(tx => tx.accountId === account.id)}
              defaultItemsToShow={3}
              showFilters={true} 
              accountIdContext={account.id}
            />
          </div>
        </div>
      ))}
      
      <AccountDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} account={selectedAccount} />
    </div>
  );
}
