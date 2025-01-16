import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '../data';
import DoctorCard from '../components/DoctorCard';
import BookingModal from '../components/BookingModal';
import { Doctor } from '../types';

export default function CategoryPage() {
  const { id } = useParams();
  const category = categories.find(c => c.id === Number(id));
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category.name} Specialists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.doctors.map(doctor => (
          <DoctorCard 
            key={doctor.id} 
            doctor={doctor} 
            onSelect={handleDoctorSelect}
          />
        ))}
      </div>
      
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}