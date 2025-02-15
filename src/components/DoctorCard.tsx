import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onSelect }: DoctorCardProps) {
  return (
      <div
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
          onClick={() => onSelect(doctor)}
      >
        {/* Doctor Image */}
        <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-48 object-cover"
        />

        {/* Doctor Details */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-gray-600 text-sm">{doctor.specialty}</p>

          {/* Rating & Experience */}
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1">{doctor.rating}</span>
            <Clock className="w-5 h-5 ml-4 text-gray-500" />
            <span className="ml-1">{doctor.experience} years</span>
          </div>

          {/* Consultation Fee & Booking Button */}
          <div className="mt-4 flex items-center justify-between">
            {/*<span className="text-blue-600 font-semibold">LKR {doctor.consultationFee}</span>*/}
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
  );
}
