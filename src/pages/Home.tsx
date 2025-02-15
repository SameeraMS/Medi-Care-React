import React from 'react';
import { categories } from '../data';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import { Award, Clock, Users, Activity } from 'lucide-react';
import FloatingChatBot from "../components/FloatingChatBot.tsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Hero Section */}
      <div 
        className="bg-cover bg-center h-[500px] relative"
        style={{
          // backgroundImage: "url('https://img.freepik.com/free-vector/health-care-background-banner-with-medical-electrocardiogram_1017-20049.jpg?t=st=1737038461~exp=1737042061~hmac=fe05cf3562fa18b19928fd8ebc5918bd591de9209ff6519cdafbf28feb3706c5&w=1800')"
          backgroundImage: "url('../src/assets/images/home.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Your Health, Our Priority</h1>
            <p className="text-xl mb-8">Book appointments with the best doctors in your city</p>
          </div>
        </div>
      </div>

      {/* Hospital Info Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MediCare</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With state-of-the-art facilities and a team of experienced healthcare professionals,
              we provide comprehensive medical care focused on your well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Doctors</h3>
              <p className="text-gray-600">Highly qualified and experienced medical professionals</p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Service</h3>
              <p className="text-gray-600">Round-the-clock emergency medical services</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Dedicated healthcare professionals at your service</p>
            </div>
            <div className="text-center p-6">
              <Activity className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Equipment</h3>
              <p className="text-gray-600">Latest medical technology and facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-blue-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-blue-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Emergency Care</div>
            </div>
          </div>
        </div>
      </div>

      <FloatingChatBot />

      <Footer />
    </div>
  );
}