
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Edit3 } from "lucide-react";
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_AVATAR_KEY = 'userUploadedAvatarUrl';

export default function ProfilePage() {
  const { toast } = useToast();
  // Mock user data - in a real app, this would come from auth state or API
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    memberSince: "2022-01-15",
    // avatarUrl will be managed by dedicated state now
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedAvatar = localStorage.getItem(LOCAL_STORAGE_AVATAR_KEY);
    if (storedAvatar) {
      setAvatarPreview(storedAvatar);
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Max 2MB
        toast({
          title: "Image Too Large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive",
        });
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please select a JPG, PNG, GIF, or WEBP image.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setAvatarPreview(dataUrl);
        try {
          localStorage.setItem(LOCAL_STORAGE_AVATAR_KEY, dataUrl);
          // Dispatch a storage event so other tabs/components can react if needed
          window.dispatchEvent(new StorageEvent('storage', { key: LOCAL_STORAGE_AVATAR_KEY }));
           toast({
            title: "Avatar Updated",
            description: "Your profile picture preview has been updated.",
          });
        } catch (error) {
          console.error("Error saving avatar to localStorage:", error);
          toast({
            title: "Storage Error",
            description: "Could not save avatar. Your browser storage might be full.",
            variant: "destructive",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  // Handle form field changes (basic example)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [id]: value }));
  };

  const handleProfileUpdate = () => {
    // In a real app, you'd send user data (and potentially avatarFile) to your backend
    console.log("Profile updated:", user);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved (locally for this demo).",
    });
     // If avatarPreview exists and is different from localStorage, it means it was just changed
    // but not necessarily "saved" to a backend. localStorage saving is handled by handleAvatarChange.
    // This function could trigger an actual backend upload if `avatarFile` was stored in state.
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
              <AvatarImage 
                src={avatarPreview || "https://placehold.co/150x150.png"} 
                alt={user.fullName}
                data-ai-hint={!avatarPreview ? "person user" : undefined} // Only add hint if it's a placeholder
              />
              <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/png, image/jpeg, image/gif, image/webp"
              style={{ display: 'none' }}
            />
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute bottom-0 right-0 rounded-full bg-background hover:bg-muted"
              onClick={handleCameraClick}
              aria-label="Change Avatar"
            >
              <Camera className="h-5 w-5" />
            </Button>
          </div>
          <CardTitle className="text-2xl text-secondary mt-4">{user.fullName}</CardTitle>
          <CardDescription>Member since {format(new Date(user.memberSince), 'MMMM yyyy')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium text-muted-foreground">Full Name</Label>
              <Input id="fullName" value={user.fullName} onChange={handleInputChange} className="mt-1 text-lg" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</Label>
              <Input id="email" type="email" value={user.email} onChange={handleInputChange} className="mt-1 text-lg" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-muted-foreground">Phone Number</Label>
              <Input id="phone" type="tel" value={user.phone} onChange={handleInputChange} className="mt-1 text-lg" />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium text-muted-foreground">Mailing Address</Label>
              <Input id="address" value={user.address} onChange={handleInputChange} className="mt-1 text-lg" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button className="ml-auto" onClick={handleProfileUpdate}>
            <Edit3 className="mr-2 h-4 w-4" /> Update Profile
          </Button>
        </CardFooter>
      </Card>

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
