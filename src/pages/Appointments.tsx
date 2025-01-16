import React from 'react';
import { Calendar, Clock, DollarSign, Building2 } from 'lucide-react';
import { Appointment } from '../types';
import { categories } from '../data';

// Mock data - In a real app, this would come from your backend
const appointments: Appointment[] = [
  {
    id: '1',
    doctorId: 101,
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    date: '2024-03-20',
    timeSlot: '10:00 AM',
    status: 'confirmed',
    paymentStatus: 'completed'
  }
];

export default function Appointments() {
  // Find doctor name from categories data
  const findDoctorName = (doctorId: number) => {
    for (const category of categories) {
      const doctor = category.doctors.find(d => d.id === doctorId);
      if (doctor) return doctor.name;
    }
    return 'Unknown Doctor';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Appointments</h1>
      
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900">No appointments yet</h3>
          <p className="text-gray-500 mt-2">Book your first appointment with one of our specialists.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Appointment with {findDoctorName(appointment.doctorId)}
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : appointment.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>{appointment.date}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{appointment.timeSlot}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <span className={`${
                    appointment.paymentStatus === 'completed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}>
                    {appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}