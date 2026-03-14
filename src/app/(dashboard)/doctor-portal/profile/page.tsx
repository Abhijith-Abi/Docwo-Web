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
    GraduationCap,
    Clock,
    Star,
    Quote,
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

    const doctorProfile = displayUser.doctor_profile || {};

    return (
        <div className="w-full max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0F5B46]">
                        Medical Profile
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your professional presence and account credentials.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1">
                        Active Profile
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Profile Summary Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-xl overflow-hidden">
                        <div className="h-32 bg-linear-to-br from-[#0F5B46] to-[#1a8b6b] relative">
                             <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                                    <AvatarImage
                                        src={doctorProfile.image}
                                        alt={`${displayUser.first_name} ${displayUser.last_name}`}
                                    />
                                    <AvatarFallback className="text-4xl bg-[#0F5B46] text-white font-medium">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                {doctorProfile.average_rating && (
                                    <div className="absolute bottom-1 right-1 bg-white shadow-lg rounded-full px-2 py-1 flex items-center gap-1 border border-emerald-50">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold text-[#0F5B46]">
                                            {doctorProfile.average_rating}
                                        </span>
                                    </div>
                                )}
                             </div>
                        </div>
                        
                        <CardContent className="pt-20 pb-8 flex flex-col items-center text-center">
                            <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
                                Dr. {displayUser.first_name} {displayUser.last_name}
                            </CardTitle>
                            
                            {doctorProfile.qualification && (
                                <p className="text-[#0F5B46] font-semibold text-sm uppercase tracking-wider mb-4">
                                    {doctorProfile.qualification}
                                </p>
                            )}

                            <div className="flex flex-wrap justify-center gap-2 mb-8">
                                {displayUser.roles?.map((role: string) => (
                                    <Badge
                                        key={role}
                                        className="capitalize px-3 py-1 bg-emerald-50 text-[#0F5B46] border-emerald-100 hover:bg-emerald-100 font-medium"
                                    >
                                        {role.replace("_", " ")}
                                    </Badge>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 w-full gap-2 px-4">
                                <div className="bg-gray-50/80 rounded-2xl p-4 flex flex-col items-center border border-gray-100/50">
                                    <Clock className="h-5 w-5 text-[#0F5B46] mb-2" />
                                    <span className="text-xl font-bold text-gray-900">
                                        {doctorProfile.experience_years || 0}
                                    </span>
                                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                        Experience
                                    </span>
                                </div>
                                <div className="bg-gray-50/80 rounded-2xl p-4 flex flex-col items-center border border-gray-100/50">
                                    <Star className="h-5 w-5 text-[#0F5B46] mb-2" />
                                    <span className="text-xl font-bold text-gray-900">
                                        {doctorProfile.total_reviews || 0}
                                    </span>
                                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                        Reviews
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-lg bg-[#0F5B46] text-white overflow-hidden">
                        <CardHeader className="pb-2">
                             <CardTitle className="text-lg flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" />
                                Account IDs
                             </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-2">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-white/60">Doctor Identifier</label>
                                <p className="font-mono text-sm bg-black/10 p-2 rounded-md border border-white/5 break-all">
                                    {doctorProfile.doctor_id}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase font-bold text-white/60">User Account ID</label>
                                <p className="font-mono text-sm bg-black/10 p-2 rounded-md border border-white/5 break-all">
                                    {displayUser.user_id}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Information & Clinics */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Professional Info Section */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-lg bg-white overflow-hidden">
                            <CardHeader className="border-b border-gray-50 pb-4">
                                <div className="flex items-center gap-2">
                                    <Quote className="h-5 w-5 text-[#0F5B46]" />
                                    <CardTitle>Professional Biography</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="text-gray-600 leading-relaxed text-lg italic bg-emerald-50/30 p-6 rounded-2xl border-l-4 border-[#0F5B46]">
                                    "{doctorProfile.bio || "Full professional biography not provided yet. Please update your profile in settings."}"
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg bg-white overflow-hidden">
                            <CardHeader className="border-b border-gray-50 pb-4">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-5 w-5 text-[#0F5B46]" />
                                    <CardTitle>Contact Information</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-widest">
                                            Email Address
                                        </label>
                                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-emerald-200 transition-all duration-300">
                                            <Mail className="h-5 w-5 text-[#0F5B46]" />
                                            <span className="font-medium text-gray-900">{displayUser.email}</span>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-xs font-bold text-gray-400 uppercase mb-2 block tracking-widest">
                                            Phone Number
                                        </label>
                                        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:bg-white group-hover:border-emerald-200 transition-all duration-300">
                                            <Phone className="h-5 w-5 text-[#0F5B46]" />
                                            <span className="font-medium text-gray-900">{displayUser.phone_number || "+00 0000000000"}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Associated Clinics Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-[#0F5B46]" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Associated Clinics
                                </h2>
                            </div>
                            <Badge variant="outline" className="text-xs font-bold uppercase tracking-tighter">
                                {displayUser.doctor_clinics?.length || 0} Clinics
                            </Badge>
                        </div>

                        {displayUser.doctor_clinics &&
                        displayUser.doctor_clinics.length > 0 ? (
                            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                                {displayUser.doctor_clinics.map((clinic: any) => {
                                    const clinicLogo =
                                        clinic.images?.find(
                                            (img: any) => img.image_type === "logo",
                                        )?.url || clinic.images?.[0]?.url;

                                    return (
                                        <Card
                                            key={clinic.clinic_id}
                                            className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white group hover:-translate-y-1"
                                        >
                                            <div className="h-1.5 w-full bg-gray-100 group-hover:bg-[#0F5B46] transition-colors duration-300"></div>
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="h-14 w-14 border border-gray-100 bg-gray-50 p-1.5 rounded-2xl shadow-sm">
                                                        <AvatarImage
                                                            src={clinicLogo}
                                                            className="object-contain"
                                                        />
                                                        <AvatarFallback className="bg-emerald-50 text-[#0F5B46] font-black text-xl">
                                                            {clinic.name?.[0] || "C"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 
                                                            className="font-bold text-gray-900 text-lg truncate mb-1 group-hover:text-[#0F5B46] transition-colors"
                                                            title={clinic.name}
                                                        >
                                                            {clinic.name}
                                                        </h3>
                                                        <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                                                            {clinic.city || "Primary Center"}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-6 pt-4 border-t border-gray-50 flex flex-col gap-2">
                                                    {clinic.email && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Mail className="h-3 w-3 text-emerald-600" />
                                                            <span className="truncate">{clinic.email}</span>
                                                        </div>
                                                    )}
                                                    {clinic.phone_number && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Phone className="h-3 w-3 text-emerald-600" />
                                                            <span>{clinic.phone_number}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <Card className="border-dashed bg-emerald-50/20">
                                <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                    <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                                        <Building2 className="h-8 w-8 text-[#0F5B46]/60" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        No Practice Locations
                                    </h3>
                                    <p className="text-sm text-gray-500 max-w-sm">
                                        Your profile isn't currently linked to any clinical facilities. 
                                        Please contact administration for assignment updates.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
