export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: number;
  rating: number;
  consultationFee: number;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  doctors: Doctor[];
}

export interface Hospital {
  id: number;
  name: string;
  image: string;
  address: string;
  rating: number;
  categories: Category[];
}

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface Appointment {
  id: string;
  doctorId: number;
  patientName: string;
  patientEmail: string;
  date: string;
  timeSlot: string;
  fee: number;
}