import PatientHeader from "./_components/patientHeader";
import PatientNavBar from "./_components/PatientNavBar";
import { PatientHeroCarousel } from "./_components/PatientHeroCarousel";

export default function PatientPortalPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <PatientHeader />
            <PatientNavBar />
            <PatientHeroCarousel />
        </div>
    );
}
