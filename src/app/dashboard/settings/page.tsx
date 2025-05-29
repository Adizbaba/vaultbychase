import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { UserCircle, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings, profile, and preferences.</p>
      </div>

      {/* Profile Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCircle className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl text-secondary">Profile Information</CardTitle>
          </div>
          <CardDescription>Update your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="John Doe" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue="john.doe@example.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl text-secondary">Security</CardTitle>
          </div>
          <CardDescription>Manage your password and security preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline">Change Password</Button>
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div>
              <Label htmlFor="2fa" className="font-medium">Two-Factor Authentication (2FA)</Label>
              <p className="text-xs text-muted-foreground">Enhance your account security.</p>
            </div>
            <Switch id="2fa" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl text-secondary">Notifications</CardTitle>
          </div>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications">Email Notifications</Label>
            <Switch id="emailNotifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="smsNotifications">SMS Notifications</Label>
            <Switch id="smsNotifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="pushNotifications">Push Notifications (Mobile App)</Label>
            <Switch id="pushNotifications" defaultChecked />
          </div>
          <Separator />
          <p className="text-sm font-medium">Notification Types:</p>
          <div className="flex items-center justify-between">
            <Label htmlFor="transactionAlerts">Transaction Alerts</Label>
            <Switch id="transactionAlerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="securityAlerts">Security Alerts</Label>
            <Switch id="securityAlerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="promotionalOffers">Promotional Offers</Label>
            <Switch id="promotionalOffers" />
          </div>
          <Button>Save Notification Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
}
