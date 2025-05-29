import { AccountSummaryCard } from "@/components/dashboard/account-summary-card";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { Button } from "@/components/ui/button";
import { DollarSign, Briefcase, TrendingUp, CreditCard as CreditCardIcon, PlusCircle, Download } from "lucide-react";
import Link from "next/link";

// Mock data - could be fetched or passed as props
const userAccounts = [
  { 
    id: "checking123",
    accountType: "Primary Checking", 
    balance: 5250.75, 
    accountNumberSuffix: "1234", 
    icon: DollarSign, 
    detailsLink: "/dashboard/accounts/checking123",
    transactions: [
      { id: "ctxn1", date: "2024-07-28", description: "Paycheck Deposit", amount: 2200.00, type: "credit", status: "completed" },
      { id: "ctxn2", date: "2024-07-27", description: "Rent Payment", amount: -1500.00, type: "debit", status: "completed" },
    ] 
  },
  { 
    id: "savings456",
    accountType: "High-Yield Savings", 
    balance: 12870.20, 
    accountNumberSuffix: "5678", 
    icon: Briefcase, 
    detailsLink: "/dashboard/accounts/savings456",
    transactions: [
      { id: "stxn1", date: "2024-07-20", description: "Interest Earned", amount: 15.30, type: "credit", status: "completed" },
      { id: "stxn2", date: "2024-07-15", description: "Transfer from Checking", amount: 500.00, type: "credit", status: "completed" },
    ]
  },
];

export default function AccountsPage() {
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

      {userAccounts.map(account => (
        <div key={account.id} className="space-y-6 p-0 md:p-0"> {/* Removed Card wrapper to use AccountSummaryCard as main card */}
          <AccountSummaryCard
            accountType={account.accountType}
            balance={account.balance}
            accountNumberSuffix={account.accountNumberSuffix}
            icon={account.icon}
            detailsLink={account.detailsLink} // This link might lead to a more detailed page for THIS account.
          />
          <div className="pl-0 md:pl-0"> {/* Removed padding to align with card style */}
            <TransactionHistory 
              title={`Recent Activity for ${account.accountType}`}
              transactions={account.transactions}
              defaultItemsToShow={3}
              showFilters={true} // Full filters for individual account views
            />
          </div>
        </div>
      ))}

      {/* Placeholder for other account types like Investments, Credit Cards if not covered above */}
    </div>
  );
}
