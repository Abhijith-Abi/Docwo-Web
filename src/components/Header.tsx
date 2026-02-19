import Image from "next/image";
import { Button } from "./ui/button";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

function Header() {
    return (
        <>
            <header className="flex items-center justify-between px-4 md:px-12 lg:px-32 py-2 border-b border-gray-200">
                <h1>
                    <Link href="/">
                        <Image
                            src="/images/logo.svg"
                            alt="Logo"
                            width={50}
                            height={50}
                        />
                    </Link>
                </h1>
                <ul className="flex items-center gap-2">
                    <li>
                        <Button variant="outline" className="cursor-pointer">
                            <Link
                                href="/auth/login"
                                className="flex items-center"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button className="cursor-pointer">
                            <Link
                                href="/auth/register"
                                className="flex items-center"
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Register
                            </Link>
                        </Button>
                    </li>
                </ul>
            </header>
        </>
    );
}

export default Header;
