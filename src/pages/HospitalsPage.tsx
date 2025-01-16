import React, { useState } from 'react';
import { hospitals } from '../data';
import { Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import BookingModal from '../components/BookingModal';
import { Doctor, Hospital } from '../types';
import Footer from '../components/Footer';

export default function HospitalsPage() {
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const handleHospitalSelect = (hospital: Hospital) => {
        setSelectedHospital(hospital);
        setExpandedCategory(null);
    };

    const handleCategoryClick = (categoryId: number) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleDoctorSelect = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-16">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Our Hospitals</h1>

                {/* Hospital Selection */}
                {!selectedHospital && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hospitals.map((hospital) => (
                            <div
                                key={hospital.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                onClick={() => handleHospitalSelect(hospital)}
                            >
                                <img
                                    src={hospital.image}
                                    alt={hospital.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{hospital.name}</h2>
                                    <div className="flex items-center mb-2">
                                        <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                                        <span className="text-gray-600 text-sm">{hospital.address}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                        <span className="text-gray-700">{hospital.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Categories and Doctors */}
                {selectedHospital && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">{selectedHospital.name}</h2>
                            <button
                                onClick={() => setSelectedHospital(null)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Change Hospital
                            </button>
                        </div>

                        <div className="space-y-4">
                            {selectedHospital.categories.map((category) => (
                                <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <button
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {category.name}
                                            </h3>
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
                )}
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