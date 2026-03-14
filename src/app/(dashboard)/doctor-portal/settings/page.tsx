"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Bell,
    Lock,
    Settings as SettingsIcon,
    Shield,
    Smartphone,
    KeyRound,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function SettingsPage() {
    const { user } = useAuthStore();

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0F5B46]">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account preferences, security, and
                    notifications.
                </p>
            </div>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3 bg-[#0F5B46]/5 p-1">
                    <TabsTrigger
                        value="account"
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0F5B46] data-[state=active]:shadow-sm"
                    >
                        <SettingsIcon className="w-4 h-4 mr-2" />
                        Account
                    </TabsTrigger>
                    <TabsTrigger
                        value="security"
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0F5B46] data-[state=active]:shadow-sm"
                    >
                        <Shield className="w-4 h-4 mr-2" />
                        Security
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0F5B46] data-[state=active]:shadow-sm"
                    >
                        <Bell className="w-4 h-4 mr-2" />
                        Alerts
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    {/* ACCOUNT SETTINGS */}
                    <TabsContent value="account" className="space-y-6">
                        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    Profile Preferences
                                </CardTitle>
                                <CardDescription>
                                    Update how your profile appears to others.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        defaultValue={user?.first_name}
                                        className="bg-gray-50/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        defaultValue={user?.last_name}
                                        className="bg-gray-50/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue={user?.email}
                                        disabled
                                        className="bg-gray-100 text-muted-foreground cursor-not-allowed"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50/50 border-t px-6 py-4">
                                <Button className="bg-[#0F5B46] hover:bg-[#0F5B46]/90 ml-auto transition-colors">
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* SECURITY SETTINGS */}
                    <TabsContent value="security" className="space-y-6">
                        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <KeyRound className="w-5 h-5 text-[#0F5B46]" />
                                    Change Password
                                </CardTitle>
                                <CardDescription>
                                    Ensure your account is using a long, random
                                    password to stay secure.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="current-password">
                                        Current password
                                    </Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">
                                        New password
                                    </Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">
                                        Confirm new password
                                    </Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50/50"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50/50 border-t px-6 py-4">
                                <Button className="bg-[#0F5B46] hover:bg-[#0F5B46]/90 ml-auto transition-colors">
                                    Update Password
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Smartphone className="w-5 h-5 text-[#0F5B46]" />
                                    Two-Factor Authentication
                                </CardTitle>
                                <CardDescription>
                                    Add an extra layer of security to your
                                    account.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
                                    <div className="space-y-0.5">
                                        <h4 className="text-sm font-medium text-gray-900">
                                            Authenticator App
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Use an app like Google Authenticator
                                            or Authy.
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* NOTIFICATIONS SETTINGS */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card className="border-none shadow-sm bg-white/60 backdrop-blur-xl">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Bell className="w-5 h-5 text-[#0F5B46]" />
                                    Communication Preferences
                                </CardTitle>
                                <CardDescription>
                                    Choose what you want to be notified about.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                        Email Notifications
                                    </h4>

                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                        <div className="space-y-0.5">
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Appointment Updates
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                Receive emails when appointments
                                                are scheduled, changed, or
                                                canceled.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>

                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                        <div className="space-y-0.5">
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Clinic Announcements
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                News and updates from your
                                                assigned clinics.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t">
                                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                        Push Notifications
                                    </h4>

                                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                        <div className="space-y-0.5">
                                            <h4 className="text-sm font-medium text-gray-900">
                                                Direct Messages
                                            </h4>
                                            <p className="text-xs text-muted-foreground">
                                                When someone sends you a direct
                                                message in the portal.
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
