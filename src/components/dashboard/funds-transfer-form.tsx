"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast"; // Ensure useToast is available

const transferSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account to transfer from."),
  toAccount: z.string().min(1, "Please select an account to transfer to."),
  amount: z.coerce.number().positive("Amount must be positive."),
  memo: z.string().optional(),
}).refine(data => data.fromAccount !== data.toAccount, {
  message: "Cannot transfer to the same account.",
  path: ["toAccount"],
});

type TransferFormValues = z.infer<typeof transferSchema>;

// Mock user accounts
const userAccounts = [
  { id: "checking123", name: "Primary Checking (•••• 1234)", balance: 5250.75 },
  { id: "savings5678", name: "High-Yield Savings (•••• 5678)", balance: 12870.20 },
  { id: "investment9012", name: "Investment Portfolio (•••• 9012)", balance: 75300.50 },
];

export function FundsTransferForm() {
  const { toast } = useToast();
  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccount: "",
      toAccount: "",
      amount: 0,
      memo: "",
    },
  });

  const onSubmit = (data: TransferFormValues) => {
    console.log("Transfer data:", data);
    // TODO: Implement actual transfer logic
    toast({
      title: "Transfer Successful",
      description: `$${data.amount.toFixed(2)} transferred from ${userAccounts.find(acc => acc.id === data.fromAccount)?.name} to ${userAccounts.find(acc => acc.id === data.toAccount)?.name}.`,
      variant: "default", 
    });
    form.reset();
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Transfer Funds</CardTitle>
        <CardDescription>Move money securely between your VaultbyChase accounts.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="fromAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account to transfer from" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userAccounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} - Balance: ${acc.balance.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="toAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account to transfer to" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userAccounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} - Balance: ${acc.balance.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">$</span>
                      <Input type="number" placeholder="0.00" {...field} className="pl-7" step="0.01" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="memo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memo (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="E.g., Monthly savings contribution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">Review Transfer</Button>
            <p className="text-xs text-muted-foreground text-center">
              Transfers between your accounts are typically instant. Review all details before confirming.
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
