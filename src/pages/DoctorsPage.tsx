import React, { useState } from 'react';
import { categories } from '../data';
import DoctorCard from '../components/DoctorCard';
import Footer from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import { Doctor } from '../types';

export default function DoctorsPage() {
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const handleCategoryClick = (categoryId: number) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleDoctorSelect = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Our Medical Specialists</h1>

                <div className="space-y-4">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <button
                                onClick={() => handleCategoryClick(category.id)}
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
                                {expandedCategory === category.id ? (
                                    <ChevronUp className="w-6 h-6 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-500" />
                                )}
                            </button>

                            {expandedCategory === category.id && (
                                <div className="p-6 border-t border-gray-100">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {category.doctors.map((doctor) => (
                                            <DoctorCard
                                                key={doctor.id}
                                                doctor={doctor}
                                                onSelect={handleDoctorSelect}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
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