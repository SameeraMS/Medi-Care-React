import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialty}</p>
        <div className="flex items-center mt-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="ml-1 text-gray-600">{doctor.rating}</span>
          <Clock className="w-5 h-5 ml-4 text-gray-500" />
          <span className="ml-1 text-gray-600">{doctor.experience} years</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-blue-600 font-semibold">${doctor.consultationFee}</span>
          <button
            onClick={() => onSelect(doctor)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}