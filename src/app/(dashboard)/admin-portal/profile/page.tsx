"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useGetProfile } from "@/hooks/api/useGetProfile";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    Mail,
    Phone,
    ShieldCheck,
    User as UserIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
    const { user } = useAuthStore();
    const { data: profileData, isLoading } = useGetProfile();

    // Use profileData if available to ensure fresh data, fallback to auth store user
    const displayUser = profileData || user;

    if (isLoading || !displayUser) {
        return (
            <div className="w-full max-w-5xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0F5B46]">
                        Profile
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your account information
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-[250px] w-full rounded-xl" />
                    <Skeleton className="h-[250px] w-full rounded-xl" />
                </div>
                <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
        );
    }

    const initials =
        `${displayUser.first_name?.[0] || ""}${displayUser.last_name?.[0] || ""}`.toUpperCase();

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0F5B46]">
                    Profile
                </h1>
                <p className="text-muted-foreground mt-2">
                    View and manage your account details and clinic assignments.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Profile Summary Card */}
                <Card className="md:col-span-1 border-none shadow-sm bg-white/60 backdrop-blur-xl">
                    <CardHeader className="text-center pb-2 pt-8">
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-28 w-28 border-4 border-[#0F5B46]/10">
                                <AvatarImage
                                    src=""
                                    alt={`${displayUser.first_name} ${displayUser.last_name}`}
                                />
                                <AvatarFallback className="text-4xl bg-[#0F5B46] text-white font-medium">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            {displayUser.first_name} {displayUser.last_name}
                        </CardTitle>
                        <div className="flex flex-wrap justify-center gap-2 mt-3 text-sm text-muted-foreground">
                            {displayUser.roles?.map((role: string) => (
                                <Badge
                                    key={role}
                                    variant="secondary"
                                    className="capitalize px-3 py-1 bg-[#0F5B46]/5 text-[#0F5B46] hover:bg-[#0F5B46]/10 border-none font-medium"
                                >
                                    {role.replace("_", " ")}
                                </Badge>
                            ))}
                        </div>
                    </CardHeader>
                </Card>

                {/* Contact Information Card */}
                <Card className="md:col-span-2 border-none shadow-sm bg-white/60 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                            <UserIcon className="h-5 w-5 text-[#0F5B46]" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Email Address
                                </label>
                                <p className="font-medium text-gray-900 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                                    {displayUser.email}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> Phone Number
                                </label>
                                <p className="font-medium text-gray-900 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
                                    {displayUser.phone_number || "N/A"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4" /> User ID
                                </label>
                                <p className="font-medium text-gray-900 bg-gray-50/50 p-3 rounded-lg border border-gray-100 font-mono text-sm">
                                    {displayUser.user_id}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Clinic Assignments */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-6 w-6 text-[#0F5B46]" />
                    <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                        Clinic Assignments
                    </h2>
                </div>

                {displayUser.clinic_assignments &&
                displayUser.clinic_assignments.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {displayUser.clinic_assignments.map(
                            (assignment: any) => (
                                <Card
                                    key={assignment.assignment_id}
                                    className="border-none shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group"
                                >
                                    <div className="h-2 w-full bg-[#0F5B46]/20 group-hover:bg-[#0F5B46] transition-colors duration-300"></div>
                                    <CardHeader className="pb-3">
                                        <CardTitle
                                            className="text-lg text-gray-800 line-clamp-1"
                                            title={assignment.clinic_name}
                                        >
                                            {assignment.clinic_name}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant="outline"
                                                className="text-xs font-normal border-[#0F5B46]/20 text-[#0F5B46]"
                                            >
                                                {assignment.role}
                                            </Badge>
                                            {assignment.is_admin && (
                                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none text-xs px-2">
                                                    Admin
                                                </Badge>
                                            )}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-xs text-muted-foreground flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                            <span>Assigned on:</span>
                                            <span className="font-medium text-gray-700">
                                                {new Date(
                                                    assignment.created_at,
                                                ).toLocaleDateString(
                                                    undefined,
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    },
                                                )}
                                            </span>
                                        </p>
                                    </CardContent>
                                </Card>
                            ),
                        )}
                    </div>
                ) : (
                    <Card className="border-dashed bg-gray-50/50">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="h-12 w-12 rounded-full bg-[#0F5B46]/10 flex items-center justify-center mb-4">
                                <Building2 className="h-6 w-6 text-[#0F5B46]/60" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                No Clinic Assignments
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                You are not currently assigned to any clinics.
                                Contact your administrator if you believe this
                                is an error.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
