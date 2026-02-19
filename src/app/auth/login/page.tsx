import Header from "@/components/Header";
import LoginForm from "@/components/auth/LoginForm";

export default function page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div
                className="flex flex-col flex-1 bg-background relative overflow-hidden "
                style={{
                    backgroundImage: "url('/images/background.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <main className="flex flex-col items-center justify-center flex-1 w-full px-4 relative z-10 py-12">
                    <LoginForm />
                </main>
            </div>
        </div>
    );
}
