import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard as CreditCardIcon, Lock, Award, PlusCircle, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";

// Mock data for credit cards
const userCreditCards = [
  {
    id: "cc1",
    name: "VaultbyChase Rewards Visa",
    last4: "3456",
    balance: 850.00,
    creditLimit: 5000.00,
    dueDate: "2024-08-15",
    minPayment: 35.00,
    rewardsPoints: 12500,
  },
  {
    id: "cc2",
    name: "VaultbyChase Travel Mastercard",
    last4: "7890",
    balance: 250.75,
    creditLimit: 10000.00,
    dueDate: "2024-08-20",
    minPayment: 25.00,
    rewardsPoints: 5200,
  },
];

export default function CreditCardPage() {
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

      {userCreditCards.map(card => (
        <Card key={card.id} className="shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{card.name}</CardTitle>
              <CreditCardIcon className="h-8 w-8" />
            </div>
            <CardDescription className="text-primary-foreground/80">•••• •••• •••• {card.last4}</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-bold text-primary">${card.balance.toFixed(2)}</p>
              <Progress value={(card.balance / card.creditLimit) * 100} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Credit Limit: ${card.creditLimit.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Due</p>
              <p className="text-xl font-semibold text-secondary">{new Date(card.dueDate).toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground">Minimum Payment: ${card.minPayment.toFixed(2)}</p>
              
              <p className="text-sm text-muted-foreground mt-4">Rewards</p>
              <p className="text-xl font-semibold text-secondary flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500"/> {card.rewardsPoints.toLocaleString()} Points
              </p>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm"><Lock className="mr-2 h-4 w-4"/> Lock Card</Button>
            <Button variant="outline" size="sm"><AlertCircle className="mr-2 h-4 w-4"/>Report Lost/Stolen</Button>
            <Button variant="outline" size="sm"><TrendingUp className="mr-2 h-4 w-4"/>View Transactions</Button>
            <Button size="sm">Make Payment</Button>
          </CardFooter>
        </Card>
      ))}
      
      {userCreditCards.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            You don&apos;t have any credit cards linked to your account.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
