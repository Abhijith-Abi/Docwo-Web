import PatientHeader from "./_components/patientHeader";
import PatientNavBar from "./_components/PatientNavBar";
import { PatientHeroCarousel } from "./_components/PatientHeroCarousel";
import { DepartmentScroll } from "./_components/DepartmentScroll";
import { BrowseOptions } from "./_components/BrowseOptions";
import { DoctorScroll } from "./_components/DoctorScroll";
import { BookingSteps } from "./_components/BookingSteps";
import { Testimonials } from "./_components/Testimonials";
import { PatientPortalFooter } from "./_components/PatientPortalFooter";

export default function PatientPortalPage() {
    return (
        <div className="min-h-screen">
            <div className="sticky top-0 z-50 bg-white shadow-sm">
                <PatientHeader />
                <PatientNavBar />
            </div>
            <PatientHeroCarousel />
            <DepartmentScroll />
            <BrowseOptions />
            <DoctorScroll />
            <BookingSteps />
            <Testimonials />
            <PatientPortalFooter />
        </div>
    );
}
