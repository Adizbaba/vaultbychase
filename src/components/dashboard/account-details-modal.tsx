
"use client";

import type { AccountDetail, CheckingAccountDetails, SavingsAccountDetails, InvestmentAccountDetails, CreditCardAccountDetails, LoanAccountDetails, TransactionMini, Holding } from "@/types/accounts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { DollarSign, Percent, CalendarDays, Landmark, CreditCard, TrendingUp, Briefcase, Info, ShieldCheck, ListChecks, Hash, Users } from "lucide-react";

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: AccountDetail | null;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null; icon?: React.ElementType, children?: React.ReactNode }> = ({ label, value, icon: Icon, children }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-muted-foreground flex items-center">
      {Icon && <Icon className="h-4 w-4 mr-2" />}
      {label}
    </dt>
    <dd className="mt-1 text-sm text-foreground sm:mt-0 sm:col-span-2">
      {children ? children : (value !== null && value !== undefined ? String(value) : <span className="italic">N/A</span>)}
    </dd>
  </div>
);

const MiniTransactionTable: React.FC<{ transactions: TransactionMini[] }> = ({ transactions }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead>Description</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions.length > 0 ? transactions.map(tx => (
        <TableRow key={tx.id}>
          <TableCell>{format(new Date(tx.date), "MM/dd/yyyy")}</TableCell>
          <TableCell>{tx.description}</TableCell>
          <TableCell className={`text-right ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
            {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
          </TableCell>
        </TableRow>
      )) : <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No recent transactions.</TableCell></TableRow>}
    </TableBody>
  </Table>
);

const HoldingsTable: React.FC<{ holdings: Holding[] }> = ({ holdings }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Symbol</TableHead>
        <TableHead>Name</TableHead>
        <TableHead className="text-right">Qty</TableHead>
        <TableHead className="text-right">Current Value</TableHead>
        <TableHead className="text-right">Day Change</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {holdings.length > 0 ? holdings.map(h => (
        <TableRow key={h.id}>
          <TableCell className="font-medium">{h.symbol}</TableCell>
          <TableCell>{h.name}</TableCell>
          <TableCell className="text-right">{h.quantity}</TableCell>
          <TableCell className="text-right">${h.currentValue.toFixed(2)}</TableCell>
          <TableCell className={`text-right ${h.dayChange && h.dayChange < 0 ? "text-red-600" : "text-green-600"}`}>
            {h.dayChange ? `${h.dayChange >= 0 ? '+' : ''}${h.dayChange.toFixed(2)} (${h.dayChangePercentage ? (h.dayChangePercentage * 100).toFixed(2) + '%' : 'N/A'})` : 'N/A'}
          </TableCell>
        </TableRow>
      )) : <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground">No holdings information available.</TableCell></TableRow>}
    </TableBody>
  </Table>
);


export function AccountDetailsModal({ isOpen, onClose, account }: AccountDetailsModalProps) {
  if (!account) return null;

  const renderCheckingDetails = (acc: CheckingAccountDetails) => (
    <dl>
      <DetailItem label="Account Name" value={acc.accountName} icon={Briefcase} />
      <DetailItem label="Account Number" value={`•••• ${acc.accountNumberSuffix}`} icon={Hash} />
      <DetailItem label="Current Balance" value={`$${acc.balance.toFixed(2)} ${acc.currency}`} icon={DollarSign} />
      <DetailItem label="Available Balance" value={`$${acc.availableBalance.toFixed(2)} ${acc.currency}`} icon={DollarSign} />
      <DetailItem label="Status" icon={Info}>
        <Badge variant={acc.status === 'active' ? 'default' : 'secondary'} className="capitalize">{acc.status}</Badge>
      </DetailItem>
      <DetailItem label="Date Opened" value={format(new Date(acc.dateOpened), "MMMM d, yyyy")} icon={CalendarDays} />
      <DetailItem label="Overdraft Protection" value={acc.overdraftProtectionEnabled ? "Enabled" : "Disabled"} icon={ShieldCheck} />
      <DetailItem label="Linked Debit Card" value={acc.linkedDebitCardNumberSuffix ? `•••• ${acc.linkedDebitCardNumberSuffix}` : "N/A"} icon={CreditCard} />
      <DetailItem label="Monthly Fee" value={acc.monthlyActivityFee !== null ? `$${acc.monthlyActivityFee.toFixed(2)}` : "None"} icon={DollarSign} />
      <DetailItem label="eStatements" value={acc.eStatementsEnabled ? "Enabled" : "Disabled"} icon={ListChecks} />
      <div className="py-3">
        <dt className="text-sm font-medium text-muted-foreground mb-2 flex items-center"><ListChecks className="h-4 w-4 mr-2" />Recent Transactions</dt>
        <ScrollArea className="h-[200px] rounded-md border">
          <MiniTransactionTable transactions={acc.last5Transactions} />
        </ScrollArea>
      </div>
    </dl>
  );

  const renderSavingsDetails = (acc: SavingsAccountDetails) => (
     <dl>
      <DetailItem label="Account Name" value={acc.accountName} icon={Briefcase} />
      <DetailItem label="Account Number" value={`•••• ${acc.accountNumberSuffix}`} icon={Hash} />
      <DetailItem label="Current Balance" value={`$${acc.balance.toFixed(2)} ${acc.currency}`} icon={DollarSign} />
      <DetailItem label="APY" value={`${(acc.apy * 100).toFixed(2)}%`} icon={Percent} />
      <DetailItem label="Interest Rate" value={`${(acc.interestRate * 100).toFixed(2)}%`} icon={Percent} />
      <DetailItem label="Compounding" value={acc.compoundingFrequency} icon={Info} />
      <DetailItem label="Status" icon={Info}>
        <Badge variant={acc.status === 'active' ? 'default' : 'secondary'} className="capitalize">{acc.status}</Badge>
      </DetailItem>
      <DetailItem label="Date Opened" value={format(new Date(acc.dateOpened), "MMMM d, yyyy")} icon={CalendarDays} />
      <DetailItem label="Minimum Balance" value={acc.minimumBalanceRequired !== null ? `$${acc.minimumBalanceRequired.toFixed(2)}` : "None"} icon={DollarSign} />
      <DetailItem label="Withdrawal Limits" icon={Info}>
        {acc.withdrawalLimits ? `${acc.withdrawalLimits.currentCycleWithdrawals} of ${acc.withdrawalLimits.countPerCycle} per ${acc.withdrawalLimits.cycleType}` : "N/A"}
      </DetailItem>
      <DetailItem label="Interest Earned YTD" value={`$${acc.interestEarnedYTD.toFixed(2)}`} icon={TrendingUp} />
    </dl>
  );

  const renderInvestmentDetails = (acc: InvestmentAccountDetails) => (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="holdings">Holdings ({acc.holdingCount})</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <dl>
          <DetailItem label="Account Name" value={acc.accountName} icon={Briefcase} />
          <DetailItem label="Account Number" value={`•••• ${acc.accountNumberSuffix}`} icon={Hash} />
          <DetailItem label="Portfolio Value" value={`$${acc.portfolioValue.toFixed(2)} ${acc.currency}`} icon={DollarSign} />
          <DetailItem label="Total Investment" value={`$${acc.totalInvestment.toFixed(2)}`} icon={DollarSign} />
          <DetailItem label="Total Gain/Loss" icon={TrendingUp}>
            <span className={acc.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}>
              {acc.totalGainLoss >= 0 ? "+" : ""}${acc.totalGainLoss.toFixed(2)} ({(acc.totalGainLossPercentage * 100).toFixed(2)}%)
            </span>
          </DetailItem>
          <DetailItem label="Status" icon={Info}>
            <Badge variant={acc.status === 'active' ? 'default' : 'secondary'} className="capitalize">{acc.status}</Badge>
          </DetailItem>
          <DetailItem label="Date Opened" value={format(new Date(acc.dateOpened), "MMMM d, yyyy")} icon={CalendarDays} />
          <DetailItem label="Investment Strategy" value={acc.investmentStrategy} icon={Info} />
          <DetailItem label="Risk Level" value={acc.investmentRiskLevel} icon={ShieldCheck} />
          <DetailItem label="Dividend Income YTD" value={acc.dividendIncomeYTD !== undefined ? `$${acc.dividendIncomeYTD.toFixed(2)}` : "N/A"} icon={DollarSign} />
        </dl>
      </TabsContent>
      <TabsContent value="holdings">
        <ScrollArea className="h-[300px] rounded-md border">
          <HoldingsTable holdings={acc.majorHoldings} />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );

  const renderCreditCardDetails = (acc: CreditCardAccountDetails) => (
    <dl>
      <DetailItem label="Card Name" value={acc.accountName} icon={CreditCard} />
      <DetailItem label="Card Number" value={`•••• ${acc.accountNumberSuffix}`} icon={Hash} />
      <DetailItem label="Current Balance" value={`$${acc.balance.toFixed(2)} ${acc.currency}`} icon={DollarSign} />
      <DetailItem label="Credit Limit" value={`$${acc.creditLimit.toFixed(2)}`} icon={Landmark} />
      <DetailItem label="Available Credit" value={`$${acc.availableCredit.toFixed(2)}`} icon={DollarSign} />
       <DetailItem label="Status" icon={Info}>
        <Badge variant={acc.status === 'active' ? 'default' : 'secondary'} className="capitalize">{acc.status}</Badge>
      </DetailItem>
      <DetailItem label="Date Opened" value={format(new Date(acc.dateOpened), "MMMM d, yyyy")} icon={CalendarDays} />
      <Separator className="my-2" />
      <DetailItem label="Statement Balance" value={`$${acc.currentStatementBalance.toFixed(2)}`} icon={ListChecks} />
      <DetailItem label="Minimum Payment" value={`$${acc.minimumPaymentDue.toFixed(2)}`} icon={DollarSign} />
      <DetailItem label="Payment Due Date" value={format(new Date(acc.paymentDueDate), "MMMM d, yyyy")} icon={CalendarDays} />
      <Separator className="my-2" />
      <DetailItem label="Purchase APR" value={`${(acc.interestRateAPR.purchase * 100).toFixed(2)}%`} icon={Percent} />
      {acc.interestRateAPR.cashAdvance && <DetailItem label="Cash Advance APR" value={`${(acc.interestRateAPR.cashAdvance * 100).toFixed(2)}%`} icon={Percent} />}
      <DetailItem label="Rewards" icon={TrendingUp}>
        {acc.rewardsBalance?.type !== 'none' ? 
          `${acc.rewardsBalance?.points || acc.rewardsBalance?.cashback || acc.rewardsBalance?.miles || ''} ${acc.rewardsBalance?.description || acc.rewardsBalance?.type}` 
          : "N/A"}
      </DetailItem>
      <DetailItem label="Last Payment" value={acc.lastPaymentAmount && acc.lastPaymentDate ? `$${acc.lastPaymentAmount.toFixed(2)} on ${format(new Date(acc.lastPaymentDate), "MM/dd/yyyy")}` : "N/A"} icon={DollarSign} />
    </dl>
  );

  const renderLoanDetails = (acc: LoanAccountDetails) => (
    <dl>
      <DetailItem label="Loan Name" value={acc.accountName} icon={Landmark} />
      <DetailItem label="Loan Number" value={`•••• ${acc.accountNumberSuffix}`} icon={Hash} />
      <DetailItem label="Principal Balance" value={`$${acc.balance.toFixed(2)} ${acc.currency}`} icon={DollarSign} />
      <DetailItem label="Original Principal" value={`$${acc.originalPrincipal.toFixed(2)}`} icon={DollarSign} />
      <DetailItem label="Interest Rate" value={`${(acc.interestRate * 100).toFixed(2)}%`} icon={Percent} />
      <DetailItem label="Status" icon={Info}>
         <Badge variant={acc.status === 'active' ? 'default' : 'secondary'} className="capitalize">{acc.status}</Badge>
      </DetailItem>
      <DetailItem label="Date Opened" value={format(new Date(acc.dateOpened), "MMMM d, yyyy")} icon={CalendarDays} />
      <Separator className="my-2" />
      <DetailItem label="Loan Type" value={acc.loanType.charAt(0).toUpperCase() + acc.loanType.slice(1)} icon={Info} />
      <DetailItem label="Term" value={`${acc.loanTermMonths} months (${acc.paymentsMade} paid / ${acc.remainingPayments} left)`} icon={CalendarDays} />
      <DetailItem label="Next Payment" value={`$${acc.nextPaymentAmount.toFixed(2)} on ${format(new Date(acc.nextPaymentDate), "MMMM d, yyyy")}`} icon={DollarSign}/>
      {acc.lastPaymentAmount && acc.lastPaymentDate &&
        <DetailItem label="Last Payment" value={`$${acc.lastPaymentAmount.toFixed(2)} on ${format(new Date(acc.lastPaymentDate), "MM/dd/yyyy")}`} icon={DollarSign} />}
      {acc.escrowBalance !== undefined && acc.escrowBalance !== null && <DetailItem label="Escrow Balance" value={`$${acc.escrowBalance.toFixed(2)}`} icon={DollarSign} />}
      {acc.propertyAddress && <DetailItem label="Property Address" value={acc.propertyAddress} icon={Landmark} />}
    </dl>
  );

  const renderContent = () => {
    switch (account.accountType) {
      case "checking": return renderCheckingDetails(account as CheckingAccountDetails);
      case "savings": return renderSavingsDetails(account as SavingsAccountDetails);
      case "investment": return renderInvestmentDetails(account as InvestmentAccountDetails);
      case "credit_card": return renderCreditCardDetails(account as CreditCardAccountDetails);
      case "loan": return renderLoanDetails(account as LoanAccountDetails);
      default: return <p>Details not available for this account type.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl text-primary">
            {account.icon && <account.icon className="h-7 w-7 mr-3" />}
            {account.accountName} - Details
          </DialogTitle>
          <DialogDescription>
            Detailed information for account ending in •••• {account.accountNumberSuffix}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-200px)] pr-6"> {/* Adjust max-h as needed */}
          <div className="py-4 space-y-4">
            {renderContent()}
          </div>
        </ScrollArea>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
