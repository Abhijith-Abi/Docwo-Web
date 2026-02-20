"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useState, useRef } from "react";
import { Eye, EyeOff, Loader2, KeyRound, Mail } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import useCreateMutation from "@/hooks/api/useCreateMutation";

const loginSchema = z.object({
    identifier: z.string().min(1, "Email or phone number is required"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const setAuth = useAuthStore((s) => s.setAuth);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const formData = form.watch();

    const { mutate: handleSubmit, isPending } = useCreateMutation({
        method: "post",
        endpoint: API_ENDPOINTS.LOGIN,
        submitData: formData as Record<string, unknown>,
        redirectPath: "/",
        inputRefs: inputRefs,
        handleSuccess: (response: any) => {
            const { data } = response;
            const user = data?.user ?? {};
            setAuth(data?.accessToken ?? "", data?.refreshToken ?? "", {
                user_id: user?.user_id ?? "",
                first_name: user?.first_name ?? "",
                last_name: user?.last_name ?? "",
                email: user?.email ?? "",
                phone_number: user?.phone_number ?? "",
                roles: user?.roles ?? [],
                patient_id: data?.patient_id ?? "",
            });
        },
        isToast: true,
    });

    const onSubmit = (values: LoginFormValues) => {
        handleSubmit(values as any);
    };

    return (
        <Card className="w-full max-w-md border-none shadow-2xl bg-white/90 backdrop-blur-md rounded-3xl">
            <CardHeader className="space-y-1 text-center pb-4 pt-6">
                <CardTitle className="text-2xl font-bold tracking-tight text-primary">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                    Sign in to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 py-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem className="space-y-1 relative pb-3.5">
                                    <FormLabel className="font-semibold text-xs text-foreground/80 data-[error=true]:text-foreground/80">
                                        Email or Phone Number
                                    </FormLabel>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="absolute left-8 top-2.5 text-muted-foreground/30">
                                            |
                                        </span>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your email or phone number"
                                                className="pl-12 h-9 text-sm bg-muted/20 border-muted-foreground/20 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300"
                                                {...field}
                                                ref={(el) => {
                                                    field.ref(el);
                                                    inputRefs.current[
                                                        "identifier"
                                                    ] = el;
                                                }}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1 relative pb-3.5">
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="font-semibold text-xs text-foreground/80 data-[error=true]:text-foreground/80">
                                            Password
                                        </FormLabel>
                                        <Link
                                            href="/auth/forgot-password"
                                            className="text-[10px] font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="absolute left-8 top-2.5 text-muted-foreground/30">
                                            |
                                        </span>
                                        <FormControl>
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="••••••••"
                                                className="pl-12 pr-10 h-9 text-sm bg-muted/20 border-muted-foreground/20 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300"
                                                {...field}
                                                ref={(el) => {
                                                    field.ref(el);
                                                    inputRefs.current[
                                                        "password"
                                                    ] = el;
                                                }}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-1 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-3.5 w-3.5" />
                                            ) : (
                                                <Eye className="h-3.5 w-3.5" />
                                            )}
                                            <span className="sr-only">
                                                {showPassword
                                                    ? "Hide password"
                                                    : "Show password"}
                                            </span>
                                        </Button>
                                    </div>
                                    <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full h-9 text-sm font-medium shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all duration-300 bg-linear-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 cursor-pointer"
                            disabled={isPending}
                        >
                            {isPending && (
                                <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </form>
                </Form>

                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-muted-foreground/20" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                        <span className="bg-white/90 backdrop-blur-md px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="h-9 text-sm border-muted-foreground/20 hover:bg-muted/30 hover:text-foreground transition-all duration-300 cursor-pointer"
                        type="button"
                    >
                        <Image
                            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp"
                            alt="Google logo"
                            width={16}
                            height={16}
                            className="mr-2 h-4 w-4"
                        />
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        className="h-9 text-sm border-muted-foreground/20 hover:bg-muted/30 hover:text-foreground transition-all duration-300 cursor-pointer"
                        type="button"
                    >
                        Sign in with OTP
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center pb-6 pt-1">
                <p className="px-8 text-center text-xs text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-all"
                    >
                        Register now
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
