import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarPlus, ListChecks, PlusCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

// Mock data for upcoming bills and payees
const upcomingBills = [
  { id: "bill1", payee: "City Utilities", amount: 120.50, dueDate: "2024-08-05", status: "Scheduled" },
  { id: "bill2", payee: "Internet Provider", amount: 79.99, dueDate: "2024-08-10", status: "Due Soon" },
  { id: "bill3", payee: "Mortgage Company", amount: 1850.00, dueDate: "2024-08-01", status: "Paid" },
];

const payees = [
  { id: "payee1", name: "City Utilities" },
  { id: "payee2", name: "Internet Provider" },
  { id: "payee3", name: "Credit Card Co." },
];

export default function BillPaymentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bill Payments</h1>
          <p className="text-muted-foreground">Manage your payees, schedule payments, and view payment history.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/bills/add-payee">
              <PlusCircle className="mr-2 h-5 w-5" /> Add Payee
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/bills/make-payment">
              <CalendarPlus className="mr-2 h-5 w-5" /> Make a Payment
            </Link>
          </Button>
        </div>
      </div>

      {/* Upcoming Payments Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-secondary">Upcoming & Scheduled Payments</CardTitle>
          <CardDescription>Keep track of your upcoming and automated bill payments.</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingBills.length > 0 ? (
            <ul className="space-y-3">
              {upcomingBills.map(bill => (
                <li key={bill.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">{bill.payee}</p>
                    <p className="text-sm text-muted-foreground">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-primary">${bill.amount.toFixed(2)}</p>
                    <p className={`text-xs font-medium ${bill.status === 'Paid' ? 'text-green-600' : bill.status === 'Scheduled' ? 'text-blue-600' : 'text-orange-600'}`}>{bill.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-4">No upcoming payments scheduled.</p>
          )}
        </CardContent>
      </Card>

      {/* Manage Payees & Autopay */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Manage Payees</CardTitle>
            <CardDescription>Add, edit, or remove your bill payees.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for payee management */}
            <ul className="space-y-2">
              {payees.map(p => <li key={p.id} className="text-foreground">{p.name}</li>)}
            </ul>
            <Button variant="link" className="mt-4 p-0 h-auto">View All Payees</Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Autopay Settings</CardTitle>
            <CardDescription>Set up and manage automatic payments for recurring bills.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for autopay setup */}
            <p className="text-muted-foreground">Conveniently automate your regular payments.</p>
            <Button variant="outline" className="mt-4">
              <RotateCcw className="mr-2 h-4 w-4" /> Set Up Autopay
            </Button>
          </CardContent>
        </Card>
      </div>
       <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl text-secondary">Payment History</CardTitle>
            <CardDescription>Review your past bill payments.</CardDescription>
        </CardHeader>
        <CardContent>
             {/* Placeholder for payment history table */}
            <p className="text-muted-foreground text-center py-4">Payment history will be displayed here.</p>
             <Button variant="link" className="mt-4 p-0 h-auto">View Full Payment History</Button>
        </CardContent>
       </Card>
    </div>
  );
}
