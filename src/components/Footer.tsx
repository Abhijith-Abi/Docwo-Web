export default function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-6 flex justify-center items-center">
            <h6 className="text-sm">
                &copy; {new Date().getFullYear()} Docwo. All rights reserved.
            </h6>
        </footer>
    );
}
