import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Doctor, TimeSlot } from '../types';
import axios from '../utils/axios';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00 AM', isAvailable: true },
  { id: '2', time: '10:00 AM', isAvailable: true },
  { id: '3', time: '11:00 AM', isAvailable: true },
  { id: '4', time: '02:00 PM', isAvailable: true },
  { id: '5', time: '03:00 PM', isAvailable: true },
];

export default function BookingModal({ doctor, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!selectedTimeSlot) {
      setError('Please select a time slot.');
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        userId: localStorage.getItem('userId'), // Replace with actual user ID from authentication
        docId: doctor.id,
        hospitalId: localStorage.getItem('hospitalId'),
        date: selectedDate,
        time: selectedTimeSlot,
        fee: doctor.consultationFee,
        patientName,
        patientEmail,
        patientPhone
      };

      const response = await axios.post('/appointments', payload);

      if (response.status === 201) {
        alert(`Appointment booked successfully with ${doctor.name}!`);
        onClose();
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
          <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Book Appointment with {doctor.name}</h2>

          {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {timeSlots.map((slot) => (
                    <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-2 text-sm rounded-md ${
                            selectedTimeSlot === slot.time
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {slot.time}
                    </button>
                ))}
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
              />
            </div>

            {/* Patient Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
              />
            </div>

            {/* Patient Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                  pattern="[0-9]{10}"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Book Appointment - $${doctor.consultationFee}`}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
