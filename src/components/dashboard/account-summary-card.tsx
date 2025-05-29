
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { Eye } from "lucide-react"; // Changed from ArrowRight to Eye for "View Details"
import type { AccountDetail } from "@/types/accounts";

interface AccountSummaryCardProps {
  account: AccountDetail; // Use the full AccountDetail type
  onViewDetails: (account: AccountDetail) => void;
}

export function AccountSummaryCard({ 
  account,
  onViewDetails 
}: AccountSummaryCardProps) {
  const { accountName, balance, accountNumberSuffix, icon: Icon, currency } = account;

  const displayBalance = account.accountType === 'credit_card' && balance <= 0 
    ? Math.abs(balance) 
    : balance;

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-secondary">{accountName}</CardTitle>
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardDescription>Account ending in •••• {accountNumberSuffix}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-3xl font-bold text-primary">
          {account.accountType === 'credit_card' && balance <= 0 ? '-' : ''}
          ${displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-xl font-medium text-muted-foreground ml-1">{currency}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {account.accountType === 'credit_card' ? 'Current Balance' : 'Available Balance'}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => onViewDetails(account)} className="w-full">
          View Details <Eye className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
