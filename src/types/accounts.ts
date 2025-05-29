
import type { LucideIcon } from 'lucide-react';

export interface TransactionMini {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  type: 'debit' | 'credit';
}

export interface BaseAccount {
  id: string;
  userId: string; // In a real app, this would link to a user
  accountName: string; // User-friendly name like "Primary Checking" or "My Visa Card"
  accountType: 'checking' | 'savings' | 'investment' | 'credit_card' | 'loan';
  accountNumberSuffix: string;
  balance: number; // Meaning varies by account type (e.g. current balance for checking, loan principal for loan, owed amount for credit card)
  currency: string; // e.g., "USD"
  status: 'active' | 'closed' | 'pending' | 'frozen';
  dateOpened: string; // ISO date string
  icon: LucideIcon; // Icon for display on cards
}

export interface CheckingAccountDetails extends BaseAccount {
  accountType: 'checking';
  overdraftProtectionEnabled: boolean;
  linkedDebitCardNumberSuffix: string | null;
  last5Transactions: TransactionMini[];
  monthlyActivityFee: number | null;
  eStatementsEnabled: boolean;
  availableBalance: number; // Could be different from 'balance' due to holds
  dailyWithdrawalLimit?: number;
  dailyPurchaseLimit?: number;
}

export interface SavingsAccountDetails extends BaseAccount {
  accountType: 'savings';
  interestRate: number; // e.g., 0.05 for 5%
  compoundingFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';
  minimumBalanceRequired: number | null;
  withdrawalLimits: {
    countPerCycle: number;
    cycleType: 'month' | 'statement_period';
    currentCycleWithdrawals: number;
  } | null;
  apy: number; // Annual Percentage Yield, e.g., 0.0512 for 5.12%
  interestEarnedYTD: number;
  interestPaidLastMonth?: number;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice?: number;
  currentPrice: number;
  currentValue: number;
  dayChange?: number; // e.g., +5.20
  dayChangePercentage?: number; // e.g., +0.015 for +1.5%
  assetType?: 'stock' | 'etf' | 'mutual_fund' | 'bond';
}

export interface InvestmentAccountDetails extends BaseAccount {
  accountType: 'investment';
  portfolioValue: number; // current market value of all holdings
  totalInvestment: number; // total amount invested by user
  totalGainLoss: number; // portfolioValue - totalInvestment
  totalGainLossPercentage: number; // (totalGainLoss / totalInvestment)
  holdingCount: number;
  majorHoldings: Holding[];
  investmentStrategy: string; // e.g., "Growth", "Income", "Balanced"
  investmentRiskLevel: 'conservative' | 'moderate' | 'moderately_aggressive' | 'aggressive' | 'speculative';
  lastRebalanceDate?: string | null; // ISO date string
  dividendIncomeYTD?: number;
  performanceYTD?: number; // Percentage
}

export interface CreditCardAccountDetails extends BaseAccount {
  accountType: 'credit_card';
  balance: number; // Typically negative, representing amount owed.
  creditLimit: number;
  availableCredit: number;
  currentStatementBalance: number;
  minimumPaymentDue: number;
  paymentDueDate: string; // ISO date string
  lastStatementDate?: string; // ISO date string
  nextClosingDate?: string; // ISO date string
  interestRateAPR: {
    purchase: number; // e.g., 0.1999 for 19.99%
    cashAdvance?: number;
    balanceTransfer?: number;
  };
  rewardsBalance?: {
    points?: number;
    cashback?: number; // in currency units
    miles?: number;
    type: 'points' | 'cashback' | 'miles' | 'none';
    description?: string; // e.g. "Ultimate Rewards Points"
  };
  lastPaymentAmount: number | null;
  lastPaymentDate: string | null; // ISO date string
  cashAdvanceLimit?: number;
  cashAdvanceAPR?: number;
  isTravelCard?: boolean;
  foreignTransactionFeeRate?: number | null; // null if no fee, or percentage e.g. 0.03 for 3%
  annualFee?: number | null;
}

export interface LoanAccountDetails extends BaseAccount {
    accountType: 'loan';
    originalPrincipal: number;
    interestRate: number; // e.g., 0.0375 for 3.75%
    loanTermMonths: number;
    paymentsMade: number;
    remainingPayments: number;
    nextPaymentAmount: number;
    nextPaymentDate: string; // ISO date string
    lastPaymentAmount?: number | null;
    lastPaymentDate?: string | null;
    loanType: 'mortgage' | 'auto' | 'personal' | 'student' | 'other'; // More specific type
    escrowBalance?: number | null; // For mortgages
    propertyAddress?: string | null; // For mortgages or auto loans (if secured by vehicle)
    collateralDescription?: string | null; // For secured loans
}


export type AccountDetail = 
  | CheckingAccountDetails 
  | SavingsAccountDetails 
  | InvestmentAccountDetails 
  | CreditCardAccountDetails
  | LoanAccountDetails;

// For general use in transaction lists
export interface Transaction {
  id: string;
  accountId: string;
  date: string; // ISO date string
  description: string;
  amount: number; // positive for credit, negative for debit
  type: "debit" | "credit" | "transfer_out" | "transfer_in" | "payment" | "fee" | "interest" | "dividend" | "investment_buy" | "investment_sell";
  category?: string; // e.g., "Groceries", "Salary", "Utilities"
  status: "completed" | "pending" | "failed" | "cancelled";
  runningBalance?: number;
}
