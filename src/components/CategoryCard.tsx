import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, Brain, Baby, Bone, Eye,
  Stethoscope, Microscope, Syringe, Activity
} from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const iconMap = {
  'heart-pulse': HeartPulse,
  'brain': Brain,
  'baby': Baby,
  'bone': Bone,
  'eye': Eye,
  'eye1': Eye,
  'stethoscope': Stethoscope,
  'microscope': Microscope,
  'syringe': Syringe,
  'activity': Activity
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap];

  if (!Icon) {
    return null;
  }

  return (
    <Link to={`/category/${category.id}`}>
      <div className="bg-white rounded-full p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center aspect-square">
        <Icon className="w-12 h-12 text-blue-600 mb-3" />
        <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
        <p className="text-xs text-gray-600 text-center mt-1">{category.description}</p>
      </div>
    </Link>
  );
}