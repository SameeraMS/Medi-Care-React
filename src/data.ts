import { Category } from './types';
import { Hospital } from './types';


export const categories: Category[] = [
  {
    id: 1,
    name: "Cardiology",
    icon: "heart-pulse",
    description: "Heart and cardiovascular care",
    doctors: [
      {
        id: 101,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 12,
        rating: 4.8,
        consultationFee: 1500
      },
      {
        id: 102,
        name: "Dr. Michael Chen",
        specialty: "Cardiac Surgeon",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 15,
        rating: 4.9,
        consultationFee: 2000
      }
    ]
  },
  {
    id: 2,
    name: "Neurology",
    icon: "brain",
    description: "Brain and nerve specialists",
    doctors: [
      {
        id: 201,
        name: "Dr. Emily Williams",
        specialty: "Neurologist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 10,
        rating: 4.7,
        consultationFee: 1800
      }
    ]
  },
  {
    id: 3,
    name: "Pediatrics",
    icon: "baby",
    description: "Child healthcare experts",
    doctors: [
      {
        id: 301,
        name: "Dr. David Miller",
        specialty: "Pediatrician",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 8,
        rating: 4.9,
        consultationFee: 1200
      }
    ]
  },
  {
    id: 4,
    name: "Orthopedics",
    icon: "bone",
    description: "Bone and joint care",
    doctors: [
      {
        id: 401,
        name: "Dr. Jessica Brown",
        specialty: "Orthopedic Surgeon",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 14,
        rating: 4.8,
        consultationFee: 1600
      }
    ]
  },
  {
    id: 5,
    name: "Ophthalmology",
    icon: "eye",
    description: "Eye care specialists",
    doctors: [
      {
        id: 501,
        name: "Dr. Robert Lee",
        specialty: "Ophthalmologist",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 11,
        rating: 4.7,
        consultationFee: 1400
      }
    ]
  },
  {
    id: 6,
    name: "Dental",
    icon: "tooth",
    description: "Dental care experts",
    doctors: [
      {
        id: 601,
        name: "Dr. Lisa Wang",
        specialty: "Dentist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 9,
        rating: 4.8,
        consultationFee: 1300
      }
    ]
  },
  {
    id: 7,
    name: "General Medicine",
    icon: "stethoscope",
    description: "Primary healthcare",
    doctors: [
      {
        id: 701,
        name: "Dr. James Wilson",
        specialty: "General Physician",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 13,
        rating: 4.6,
        consultationFee: 1000
      }
    ]
  },
  {
    id: 8,
    name: "Pathology",
    icon: "microscope",
    description: "Laboratory diagnostics",
    doctors: [
      {
        id: 801,
        name: "Dr. Maria Garcia",
        specialty: "Pathologist",
        image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 16,
        rating: 4.9,
        consultationFee: 1700
      }
    ]
  },
  {
    id: 9,
    name: "Dermatology",
    icon: "activity",
    description: "Skin care specialists",
    doctors: [
      {
        id: 901,
        name: "Dr. Anna Kim",
        specialty: "Dermatologist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 10,
        rating: 4.8,
        consultationFee: 1600
      }
    ]
  },
  {
    id: 10,
    name: "Pulmonology",
    icon: "stethoscope",
    description: "Respiratory care",
    doctors: [
      {
        id: 1001,
        name: "Dr. Thomas Anderson",
        specialty: "Pulmonologist",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        experience: 14,
        rating: 4.7,
        consultationFee: 1500
      }
    ]
  }
];


export const hospitals: Hospital[] = [
  {
    id: 1,
    name: "MediCare General Hospital",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=2000",
    address: "123 Medical Center Dr, City, State",
    rating: 4.8,
    categories: [
      {
        id: 1,
        name: "Cardiology",
        icon: "heart-pulse",
        description: "Heart and cardiovascular care",
        doctors: [
          {
            id: 101,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
            experience: 12,
            rating: 4.8,
            consultationFee: 1500
          },
          {
            id: 102,
            name: "Dr. Michael Chen",
            specialty: "Cardiac Surgeon",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
            experience: 15,
            rating: 4.9,
            consultationFee: 2000
          }
        ]
      },
      {
        id: 2,
        name: "Neurology",
        icon: "brain",
        description: "Brain and nerve specialists",
        doctors: [
          {
            id: 201,
            name: "Dr. Emily Williams",
            specialty: "Neurologist",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
            experience: 10,
            rating: 4.7,
            consultationFee: 1800
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "City Medical Center",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2000",
    address: "456 Healthcare Ave, City, State",
    rating: 4.7,
    categories: [
      {
        id: 3,
        name: "Pediatrics",
        icon: "baby",
        description: "Child healthcare experts",
        doctors: [
          {
            id: 301,
            name: "Dr. David Miller",
            specialty: "Pediatrician",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300",
            experience: 8,
            rating: 4.9,
            consultationFee: 1200
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Wellness Hospital",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000",
    address: "789 Wellness Blvd, City, State",
    rating: 4.9,
    categories: [
      {
        id: 4,
        name: "Orthopedics",
        icon: "bone",
        description: "Bone and joint care",
        doctors: [
          {
            id: 401,
            name: "Dr. Jessica Brown",
            specialty: "Orthopedic Surgeon",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
            experience: 14,
            rating: 4.8,
            consultationFee: 1600
          }
        ]
      }
    ]
  }
];