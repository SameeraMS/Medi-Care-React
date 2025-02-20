import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import DoctorCard from '../components/DoctorCard';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';
import { Doctor, Hospital } from '../types';

export default function HospitalsPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [docHospitals, setDocHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hospitalsRes, docHospitalsRes] = await Promise.all([
                    axios.get('/hospitals'),
                    axios.get('/dochospitals')
                ]);
                setHospitals(hospitalsRes.data);
                setDocHospitals(docHospitalsRes.data);
            } catch (err) {
                setError('Failed to load hospitals and doctors. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleHospitalSelect = (hospital: Hospital) => {
        setSelectedHospital(hospital);
        setExpandedCategory(null);
    };

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
                <h1 className="text-3xl font-bold mb-8">Our Hospitals</h1>

                {!selectedHospital && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hospitals.map((hospital) => (
                            <div
                                key={hospital._id}
                                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                                onClick={() => handleHospitalSelect(hospital)}
                            >
                                <img src={hospital.image} alt={hospital.name} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{hospital.name}</h2>
                                    <div className="flex items-center mb-2">
                                        <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                                        <span className="text-gray-600 text-sm">{hospital.location}</span>
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

                {selectedHospital && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold">{selectedHospital.name}</h2>
                            <button onClick={() => setSelectedHospital(null)} className="text-blue-600 hover:text-blue-800">
                                Change Hospital
                            </button>
                        </div>

                        <div className="space-y-4">
                            {Array.from(new Set(docHospitals.map((d) => d.category))).map((category) => (
                                <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <button
                                        onClick={() => handleCategoryClick(category)}
                                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
                                        {expandedCategory === category ? (
                                            <ChevronUp className="w-6 h-6 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-6 h-6 text-gray-500" />
                                        )}
                                    </button>
                                    {expandedCategory === category && (
                                        <div className="p-6 border-t border-gray-100">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {docHospitals
                                                    .filter((d) => d.category === category && d.hospitalId._id === selectedHospital._id)
                                                    .map((doc) => (
                                                        <DoctorCard
                                                            key={doc.docId._id}
                                                            doctor={{
                                                                id: doc.docId._id,
                                                                name: doc.docId.name,
                                                                image: doc.docId.image,
                                                                specialty: doc.docId.specialty,
                                                                experience: doc.docId.experience,
                                                                rating: doc.docId.rating,
                                                                consultationFee: doc.fee
                                                            }}
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

            {selectedDoctor && <BookingModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />}
            <Footer />
        </div>
    );
}
