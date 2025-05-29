import { FundsTransferForm } from "@/components/dashboard/funds-transfer-form";

export default function TransferPage() {
  return (
    <div className="space-y-6">
      {/* Page title and description can be handled by DashboardHeader or here */}
      {/* <h1 className="text-3xl font-bold text-foreground">Money Transfer</h1>
      <p className="text-muted-foreground">Securely transfer funds between your accounts or to external recipients.</p> */}
      
      <FundsTransferForm />

      {/* Placeholder for external transfers or transfer history */}
      {/* 
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-secondary mb-4">External Transfers</h2>
        <p className="text-muted-foreground">Functionality for external transfers (e.g., Zelle, ACH) would go here.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-secondary mb-4">Recent Transfers</h2>
        <p className="text-muted-foreground">A list or table of recent transfer activity.</p>
      </div> 
      */}
    </div>
  );
}
