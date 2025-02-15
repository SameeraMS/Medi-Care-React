import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import DoctorCard from '../components/DoctorCard';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import { Doctor } from '../types';

// List of medical specialties (categories)
export const specialties = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Ophthalmology",
    "Dermatology",
    "Oncology",
    "Gynecology",
    "Urology",
    "Psychiatry",
    "Endocrinology",
    "Gastroenterology"
];

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/doctors'); // Fetch doctors from API
                setDoctors(response.data);
            } catch (err) {
                setError('Failed to load doctors. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    // Group doctors by specialty
    const doctorsBySpecialty = specialties.map((specialty) => ({
        name: specialty,
        doctors: doctors.filter((doctor) => doctor.specialty === specialty)
    }));

    const handleCategoryClick = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleDoctorSelect = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Our Medical Specialists</h1>

                <div className="space-y-4">
                    {doctorsBySpecialty.map((category) => (
                        category.doctors.length > 0 && (
                            <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <button
                                    onClick={() => handleCategoryClick(category.name)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="flex items-center space-x-4">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {category.name}
                                        </h2>
                                        <span className="text-sm font-normal text-gray-500">
                                            ({category.doctors.length} Specialists)
                                        </span>
                                    </div>
                                    {expandedCategory === category.name ? (
                                        <ChevronUp className="w-6 h-6 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6 text-gray-500" />
                                    )}
                                </button>

                                {expandedCategory === category.name && (
                                    <div className="p-6 border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {category.doctors.map((doctor) => (
                                                <DoctorCard
                                                    key={doctor._id}
                                                    doctor={doctor}
                                                    onSelect={handleDoctorSelect}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>

            {selectedDoctor && (
                <BookingModal
                    doctor={selectedDoctor}
                    onClose={() => setSelectedDoctor(null)}
                />
            )}

            <Footer />
        </div>
    );
}
