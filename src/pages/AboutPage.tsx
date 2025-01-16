import React from 'react';
import { Award, Heart, Shield, Users } from 'lucide-react';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20" style={{
        backgroundImage: "url('src/assets/images/about.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About MediCare</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Providing exceptional healthcare services with compassion and expertise since 2005
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, high-quality healthcare services to our community,
              ensuring every patient receives personalized care with dignity and respect.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading healthcare provider, recognized for excellence in patient care,
              medical innovation, and community wellness.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Heart className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-gray-600">Treating every patient with kindness and empathy</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">Maintaining the highest standards in healthcare</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">Upholding ethical practices in all our services</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Teamwork</h3>
              <p className="text-gray-600">Collaborating to provide the best patient care</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}