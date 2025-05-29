import { AccountSummaryCard } from "@/components/dashboard/account-summary-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard as CreditCardIcon, Briefcase, TrendingUp, ArrowRightLeft, Send, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { TransactionHistory } from "@/components/dashboard/transaction-history";

// Mock data
const accounts = [
  { accountType: "Checking Account", balance: 5250.75, accountNumberSuffix: "1234", icon: DollarSign, detailsLink: "/dashboard/accounts/checking" },
  { accountType: "Savings Account", balance: 12870.20, accountNumberSuffix: "5678", icon: Briefcase, detailsLink: "/dashboard/accounts/savings" },
  { accountType: "Investment Portfolio", balance: 75300.50, accountNumberSuffix: "9012", icon: TrendingUp, detailsLink: "/dashboard/accounts/investments" },
  { accountType: "Primary Credit Card", balance: -850.00, accountNumberSuffix: "3456", icon: CreditCardIcon, detailsLink: "/dashboard/cards/primary" },
];

const quickActions = [
  { label: "Transfer Funds", href: "/dashboard/transfer", icon: ArrowRightLeft },
  { label: "Pay Bills", href: "/dashboard/bills", icon: Send },
  { label: "View Statements", href: "/dashboard/statements", icon: FileText },
  { label: "Manage Alerts", href: "/dashboard/settings/alerts", icon: Settings },
];

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Welcome Back, User!</h2>
        <p className="text-muted-foreground">Here&apos;s a quick overview of your finances.</p>
      </div>

      {/* Account Summaries */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {accounts.map(acc => (
          <AccountSummaryCard 
            key={acc.accountType}
            accountType={acc.accountType}
            balance={acc.balance}
            accountNumberSuffix={acc.accountNumberSuffix}
            icon={acc.icon}
            detailsLink={acc.detailsLink}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <TransactionHistory title="Recent Activity" defaultItemsToShow={5} showFilters={false} />
        </div>

        {/* Quick Actions */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Quick Actions</CardTitle>
            <CardDescription>Access common tasks quickly.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {quickActions.map(action => (
              <Button variant="outline" asChild key={action.label} className="justify-start">
                <Link href={action.href}>
                  <action.icon className="mr-2 h-5 w-5 text-primary" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
