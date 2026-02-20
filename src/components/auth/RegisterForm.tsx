"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef } from "react";
import {
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    Building2,
    ChevronRight,
    ChevronLeft,
    Send,
    Calendar as CalendarIcon,
    Users,
    Droplets,
    Globe,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import useCreateMutation from "@/hooks/api/useCreateMutation";

const registerSchema = z.object({
    // Step 1: Personal Info
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),

    // Step 2: Account Details
    email: z.string().email("Invalid email address"),
    gender: z.string().min(1, "Gender is required"),
    blood_group: z.string().min(1, "Blood group is required"),
    date_of_birth: z.string().min(1, "Date of birth is required"),

    // Step 3: Address Info
    address_line1: z.string().min(1, "Address Line 1 is required"),
    address_line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().min(6, "Pincode must be 6 digits"),
    country: z.string().min(1, "Country is required"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const [step, setStep] = useState(1);
    const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const router = useRouter();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone_number: "",
            password: "",
            email: "",
            gender: "",
            blood_group: "",
            date_of_birth: "",
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
        },
        mode: "onChange",
    });

    const { mutate: handleRegister, isPending } = useCreateMutation({
        method: "post",
        endpoint: API_ENDPOINTS.REGISTER,
        submitData: form.getValues() as any,
        redirectPath: "/auth/login",
        isToast: true,
    });

    const nextStep = async () => {
        let fieldsToValidate: (keyof RegisterFormValues)[] = [];
        if (step === 1) {
            fieldsToValidate = [
                "first_name",
                "last_name",
                "phone_number",
                "password",
            ];
        } else if (step === 2) {
            fieldsToValidate = [
                "email",
                "gender",
                "blood_group",
                "date_of_birth",
            ];
        }

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setStep((s) => s + 1);
        }
    };

    const prevStep = () => {
        setStep((s) => s - 1);
    };

    const onSubmit = (values: RegisterFormValues) => {
        handleRegister(values);
    };

    const renderStepIndicators = () => (
        <div className="flex justify-center gap-2 mb-2">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={`h-1.5 w-12 rounded-full transition-all duration-300 ${
                        step >= i ? "bg-emerald-600" : "bg-muted/30"
                    }`}
                />
            ))}
        </div>
    );

    return (
        <Card className="w-full max-w-lg border-none shadow-2xl bg-white/90 backdrop-blur-md rounded-2xl mx-auto overflow-hidden">
            <CardHeader className="space-y-0.5 text-center pb-1 pt-3 sm:pt-4">
                <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
                    Create an Account
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                    Join us today to get started.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 py-1">
                {renderStepIndicators()}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2.5"
                    >
                        {step === 1 && (
                            <div className="grid gap-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    First Name
                                                </FormLabel>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            placeholder="John"
                                                            className="pl-10 h-9 text-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    Last Name
                                                </FormLabel>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Doe"
                                                            className="pl-10 h-9 text-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="phone_number"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 relative pb-3.5">
                                            <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                Mobile Number
                                            </FormLabel>
                                            <div className="flex gap-2">
                                                <div className="flex items-center px-2 bg-muted/20 border rounded-md text-xs font-medium h-9">
                                                    +91
                                                </div>
                                                <div className="relative flex-1">
                                                    <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Mobile number"
                                                            className="pl-10 h-9 text-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <FormMessage className="text-[10px] absolute bottom-0 left-12" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 relative pb-3.5">
                                            <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                Password
                                            </FormLabel>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        className="pl-10 h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full h-10 bg-emerald-700 hover:bg-emerald-800 transition-colors mt-1 text-sm"
                                >
                                    Next{" "}
                                    <ChevronRight className="ml-2 h-3.5 w-3.5" />
                                </Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 relative pb-3.5">
                                            <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                Email
                                            </FormLabel>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                <FormControl>
                                                    <Input
                                                        placeholder="m@example.com"
                                                        className="pl-10 h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    Gender
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full h-9 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                                                <SelectValue placeholder="Select gender" />
                                                            </div>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent
                                                        position="popper"
                                                        className="w-[var(--radix-select-trigger-width)]"
                                                    >
                                                        <SelectItem value="male">
                                                            Male
                                                        </SelectItem>
                                                        <SelectItem value="female">
                                                            Female
                                                        </SelectItem>
                                                        <SelectItem value="other">
                                                            Other
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="blood_group"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    Blood Group
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full h-9 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Droplets className="h-3.5 w-3.5 text-muted-foreground" />
                                                                <SelectValue placeholder="Select group" />
                                                            </div>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent
                                                        position="popper"
                                                        className="w-[var(--radix-select-trigger-width)]"
                                                    >
                                                        <SelectItem value="A+">
                                                            A+
                                                        </SelectItem>
                                                        <SelectItem value="A-">
                                                            A-
                                                        </SelectItem>
                                                        <SelectItem value="B+">
                                                            B+
                                                        </SelectItem>
                                                        <SelectItem value="B-">
                                                            B-
                                                        </SelectItem>
                                                        <SelectItem value="AB+">
                                                            AB+
                                                        </SelectItem>
                                                        <SelectItem value="AB-">
                                                            AB-
                                                        </SelectItem>
                                                        <SelectItem value="O+">
                                                            O+
                                                        </SelectItem>
                                                        <SelectItem value="O-">
                                                            O-
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="date_of_birth"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 relative pb-3.5">
                                            <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                Date of Birth
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full h-9 pl-3 text-left font-normal text-sm",
                                                                !field.value &&
                                                                    "text-muted-foreground",
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                                                            {field.value ? (
                                                                format(
                                                                    new Date(
                                                                        field.value,
                                                                    ),
                                                                    "PPP",
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        captionLayout="dropdown"
                                                        fromYear={1900}
                                                        toYear={new Date().getFullYear()}
                                                        selected={
                                                            field.value
                                                                ? new Date(
                                                                      field.value,
                                                                  )
                                                                : undefined
                                                        }
                                                        onSelect={(date) => {
                                                            if (date) {
                                                                field.onChange(
                                                                    format(
                                                                        date,
                                                                        "yyyy-MM-dd",
                                                                    ),
                                                                );
                                                            }
                                                        }}
                                                        disabled={(date) =>
                                                            date > new Date() ||
                                                            date <
                                                                new Date(
                                                                    "1900-01-01",
                                                                )
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        className="flex-1 h-9 text-sm"
                                    >
                                        <ChevronLeft className="mr-2 h-3.5 w-3.5" />{" "}
                                        Back
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-1 h-9 bg-emerald-700 hover:bg-emerald-800 transition-colors text-sm"
                                    >
                                        Next{" "}
                                        <ChevronRight className="ml-2 h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="address_line1"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 relative pb-3.5">
                                            <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                Address Line 1
                                            </FormLabel>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Street, building, etc."
                                                        className="pl-10 h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address_line2"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1 relative pb-3.5">
                                            <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                Address Line 2
                                            </FormLabel>
                                            <div className="relative">
                                                <Building2 className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                <FormControl>
                                                    <Input
                                                        placeholder="Apartment, suite, etc."
                                                        className="pl-10 h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    City
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. Mumbai"
                                                        className="h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    State / Province
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. Maharashtra"
                                                        className="h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <FormField
                                        control={form.control}
                                        name="pincode"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    Pincode
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. 400001"
                                                        className="h-9 text-sm"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 relative pb-3.5">
                                                <FormLabel className="font-semibold text-xs data-[error=true]:text-foreground">
                                                    Country
                                                </FormLabel>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                                    <FormControl>
                                                        <Input
                                                            placeholder="India"
                                                            className="pl-10 h-9 text-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage className="text-[10px] absolute bottom-0 left-0" />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        className="flex-1 h-9 text-sm"
                                    >
                                        <ChevronLeft className="mr-2 h-3.5 w-3.5" />{" "}
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 h-9 bg-emerald-700 hover:bg-emerald-800 transition-colors text-sm"
                                    >
                                        {isPending ? (
                                            "Submitting..."
                                        ) : (
                                            <>
                                                Send OTP{" "}
                                                <Send className="ml-2 h-3.5 w-3.5" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </Form>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-muted-foreground/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white/80 px-2 text-muted-foreground">
                            Or
                        </span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full h-10 border-muted-foreground/20 hover:bg-muted/30 hover:text-foreground transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 text-sm"
                    type="button"
                >
                    <Image
                        src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp"
                        alt="Google logo"
                        width={18}
                        height={18}
                    />
                    Continue with Google
                </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center pb-4 pt-1">
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-emerald-600 hover:text-emerald-500 hover:underline transition-all"
                    >
                        Login now
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
