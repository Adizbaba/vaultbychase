
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit3 } from "lucide-react";
import { format } from 'date-fns'; // Import date-fns

export default function ProfilePage() {
  // Mock user data
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    memberSince: "2022-01-15",
    avatarUrl: "https://placehold.co/150x150.png",
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">View and update your personal information.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-primary shadow-md">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} data-ai-hint="person user" />
              <AvatarFallback>{user.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-background hover:bg-muted">
              <Camera className="h-5 w-5" />
              <span className="sr-only">Change_Avatar</span>
            </Button>
          </div>
          <CardTitle className="text-2xl text-secondary mt-4">{user.fullName}</CardTitle>
          <CardDescription>Member since {format(new Date(user.memberSince), 'MMMM yyyy')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">Full Name</Label>
              <Input id="fullName" defaultValue={user.fullName} className="mt-1 text-lg" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} className="mt-1 text-lg" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={user.phone} className="mt-1 text-lg" />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-muted-foreground">Mailing Address</Label>
              <Input id="address" defaultValue={user.address} className="mt-1 text-lg" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button className="ml-auto">
            <Edit3 className="mr-2 h-4 w-4" /> Update Profile
          </Button>
        </CardFooter>
      </Card>

      {/* Placeholder for other profile sections like linked accounts, activity log etc. */}
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl text-secondary">Account Activity</CardTitle>
            <CardDescription>Recent login activity and security events.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Last login: July 28, 2024, 10:30 AM from Anytown, USA (IP: 192.168.1.100)</p>
            <p className="text-muted-foreground mt-2">Password changed: July 15, 2024</p>
            <Button variant="link" className="p-0 h-auto mt-2">View full activity log</Button>
        </CardContent>
      </Card>
    </div>
  );
}
