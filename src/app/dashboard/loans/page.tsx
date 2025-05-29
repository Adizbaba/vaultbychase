import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Landmark as LoanIcon, FileText, PlusCircle, CalendarDays, DollarSign } from "lucide-react";
import Link from "next/link";

// Mock data for loans
const userLoans = [
  {
    id: "loan1",
    type: "Mortgage",
    loanNumberSuffix: "7890",
    principalBalance: 250000.00,
    nextPaymentAmount: 1850.00,
    nextPaymentDate: "2024-08-01",
    interestRate: 3.75,
    loanTermMonths: 360,
    paymentsMade: 60,
  },
  {
    id: "loan2",
    type: "Auto Loan",
    loanNumberSuffix: "4321",
    principalBalance: 15000.00,
    nextPaymentAmount: 350.00,
    nextPaymentDate: "2024-08-10",
    interestRate: 4.50,
    loanTermMonths: 60,
    paymentsMade: 12,
  },
];

export default function LoanManagementPage() {
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
              <CardTitle className="text-2xl text-secondary">{loan.type}</CardTitle>
              <LoanIcon className="h-8 w-8 text-primary" />
            </div>
            <CardDescription>Loan ending in •••• {loan.loanNumberSuffix}</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Principal Balance</p>
              <p className="text-3xl font-bold text-primary">${loan.principalBalance.toFixed(2)}</p>
              
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
                    <p className="text-lg font-semibold text-foreground">{new Date(loan.nextPaymentDate).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Interest Rate: {loan.interestRate.toFixed(2)}%</p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">
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
    </div>
  );
}
