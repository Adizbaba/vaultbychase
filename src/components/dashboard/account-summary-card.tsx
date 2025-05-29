import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface AccountSummaryCardProps {
  accountType: string;
  balance: number;
  accountNumberSuffix: string;
  icon: LucideIcon;
  detailsLink: string;
}

export function AccountSummaryCard({ 
  accountType, 
  balance, 
  accountNumberSuffix,
  icon: Icon,
  detailsLink 
}: AccountSummaryCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-secondary">{accountType}</CardTitle>
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardDescription>Account ending in •••• {accountNumberSuffix}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-3xl font-bold text-primary">
          ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-muted-foreground mt-1">Available Balance</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild className="w-full">
          <Link href={detailsLink}>View Details <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
