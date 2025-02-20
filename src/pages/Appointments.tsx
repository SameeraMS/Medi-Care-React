import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Calendar, Clock, DollarSign, Building2 } from 'lucide-react';

interface Appointment {
    _id: string;
    date: string;
    time: string;
    fee: number;
    docId: {
        _id: string;
        name: string;
        specialty: string;
        image: string;
        experience: number;
        rating: number;
    };
    hospitalId: {
        _id: string;
        name: string;
        location: string;
        image: string;
        rating: number;
    };
}

export default function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userId = localStorage.getItem('userId'); // Replace with dynamic user ID if needed

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`/appointments/user/${userId}`);
                setAppointments(response.data);
            } catch (err) {
                setError('Failed to load appointments. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    // Categorize appointments as Today, Upcoming, or Past
    const getStatus = (dateString: string) => {
        const appointmentDate = new Date(dateString).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (appointmentDate === today) return 'Today';
        if (appointmentDate < today) return 'Past';
        return 'Upcoming';
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h1 className="text-3xl font-bold mb-8">My Appointments</h1>

            {loading && <p className="text-center text-gray-600">Loading appointments...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {!loading && appointments.length === 0 ? (
                <div className="text-center py-12">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900">No appointments yet</h3>
                    <p className="text-gray-500 mt-2">Book your first appointment with one of our specialists.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {appointments.map((appointment) => (
                        <div key={appointment._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold">{appointment.docId.name}</h2>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        getStatus(appointment.date) === 'Today'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : getStatus(appointment.date) === 'Past'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-green-100 text-green-800'
                                    }`}
                                >
                  {getStatus(appointment.date)}
                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <span>{appointment.time}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <DollarSign className="w-5 h-5 text-gray-500" />
                                    <span className="text-green-600">LKR {appointment.fee}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center space-x-4">
                                <img
                                    src={appointment.docId.image}
                                    alt={appointment.docId.name}
                                    className="w-12 h-12 rounded-full border"
                                />
                                <div>
                                    <p className="text-sm font-medium">{appointment.docId.specialty}</p>
                                    <p className="text-xs text-gray-500">Experience: {appointment.docId.experience} years</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
