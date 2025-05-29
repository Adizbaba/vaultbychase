
"use client"; 

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard as CreditCardIconLucide, Lock, Award, PlusCircle, TrendingUp, AlertCircle, Eye } from "lucide-react";
import Link from "next/link";
import { format, addDays, subDays, formatISO } from 'date-fns';
import type { AccountDetail, CreditCardAccountDetails } from "@/types/accounts";
import { AccountDetailsModal } from "@/components/dashboard/account-details-modal";

const generateRandomFourDigitString = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const initialUserCreditCards: CreditCardAccountDetails[] = [
  {
    id: "cc1",
    userId: "userTest1",
    accountName: "VaultbyChase Rewards Visa",
    accountType: "credit_card",
    accountNumberSuffix: "3456", // Placeholder
    balance: -850.00, 
    creditLimit: 5000.00,
    availableCredit: 4150.00,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 365*2)),
    icon: CreditCardIconLucide,
    currentStatementBalance: 780.00,
    minimumPaymentDue: 35.00,
    paymentDueDate: formatISO(addDays(new Date(), 15)),
    lastStatementDate: formatISO(subDays(new Date(), 15)),
    nextClosingDate: formatISO(addDays(new Date(), 10)),
    interestRateAPR: { purchase: 0.1999, cashAdvance: 0.2499, balanceTransfer: 0.0 },
    rewardsBalance: { points: 12500, type: "points", description: "Travel Rewards Points" },
    lastPaymentAmount: 150.00,
    lastPaymentDate: formatISO(subDays(new Date(), 10)),
    cashAdvanceLimit: 1000.00,
    cashAdvanceAPR: 0.2599,
    isTravelCard: true,
    foreignTransactionFeeRate: 0, 
    annualFee: 95.00,
  },
  {
    id: "cc2",
    userId: "userTest1",
    accountName: "VaultbyChase Cashback Mastercard",
    accountType: "credit_card",
    accountNumberSuffix: "7890", // Placeholder
    balance: -250.75,
    creditLimit: 10000.00,
    availableCredit: 9749.25,
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 500)),
    icon: CreditCardIconLucide,
    currentStatementBalance: 200.00,
    minimumPaymentDue: 25.00,
    paymentDueDate: formatISO(addDays(new Date(), 20)),
    interestRateAPR: { purchase: 0.2150 },
    rewardsBalance: { cashback: 52.75, type: "cashback", description: "Cashback Rewards" },
    lastPaymentAmount: 50.00,
    lastPaymentDate: formatISO(subDays(new Date(), 5)),
    annualFee: 0,
  },
];

export default function CreditCardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetail | null>(null);
  const [displayedUserCreditCards, setDisplayedUserCreditCards] = useState<CreditCardAccountDetails[]>(initialUserCreditCards);

  useEffect(() => {
    // Randomize account suffixes on client-side
    setDisplayedUserCreditCards(prevCards => 
      prevCards.map(card => ({
        ...card,
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
          <h1 className="text-3xl font-bold text-foreground">Credit Card Management</h1>
          <p className="text-muted-foreground">View balances, make payments, and manage your credit cards.</p>
        </div>
         <Button asChild>
          <Link href="/dashboard/cards/apply">
            <PlusCircle className="mr-2 h-5 w-5" /> Apply for a New Card
          </Link>
        </Button>
      </div>

      {displayedUserCreditCards.map(card => (
        <Card key={card.id} className="shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{card.accountName}</CardTitle>
              <CreditCardIconLucide className="h-8 w-8" />
            </div>
            <CardDescription className="text-primary-foreground/80">•••• •••• •••• {card.accountNumberSuffix}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-bold text-primary">${Math.abs(card.balance).toFixed(2)}</p>
              <Progress value={(Math.abs(card.balance) / card.creditLimit) * 100} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Credit Limit: ${card.creditLimit.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Due</p>
              <p className="text-xl font-semibold text-secondary">{format(new Date(card.paymentDueDate), 'MM/dd/yyyy')}</p>
              <p className="text-sm text-muted-foreground">Minimum Payment: ${card.minimumPaymentDue.toFixed(2)}</p>
              
              <p className="text-sm text-muted-foreground mt-4">Rewards</p>
              <p className="text-xl font-semibold text-secondary flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500"/> 
                {card.rewardsBalance?.type === 'points' ? `${(card.rewardsBalance.points || 0).toLocaleString()} Points` : ''}
                {card.rewardsBalance?.type === 'cashback' ? `$${(card.rewardsBalance.cashback || 0).toFixed(2)} Cashback` : ''}
                {card.rewardsBalance?.type === 'miles' ? `${(card.rewardsBalance.miles || 0).toLocaleString()} Miles` : ''}
                {card.rewardsBalance?.type === 'none' || !card.rewardsBalance ? 'N/A' : ''}
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => handleViewDetails(card)}>
              <Eye className="mr-2 h-4 w-4"/> View Details
            </Button>
            <Button variant="outline" size="sm"><Lock className="mr-2 h-4 w-4"/> Lock Card</Button>
            <Button variant="outline" size="sm"><AlertCircle className="mr-2 h-4 w-4"/>Report Lost/Stolen</Button>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/transactions?accountId=${card.id}`}>
                <TrendingUp className="mr-2 h-4 w-4"/>View Transactions
              </Link>
            </Button>
            <Button size="sm">Make Payment</Button>
          </CardFooter>
        </Card>
      ))}
      
      {displayedUserCreditCards.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            You don&apos;t have any credit cards linked to your account.
          </CardContent>
        </Card>
      )}
      <AccountDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} account={selectedAccount} />
    </div>
  );
}
