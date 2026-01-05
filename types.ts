
export interface ClimbRoute {
  id: string;
  name: string;
  grade: string;
  location: string;
  time: number; // in minutes
  date: string;
  partners: string[];
  gear: string[];
  notes: string;
  photoUrl?: string;
  annotations?: Annotation[];
}

export interface Annotation {
  x: number;
  y: number;
  emoji?: string;
  type: 'emoji' | 'draw';
}

export interface ClimbingSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'boulder' | 'sport' | 'trad';
  description: string;
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  climbCount: number;
  maxGrade: string;
  minGrade: string;
}

export type ViewType = 'dashboard' | 'log' | 'spots' | 'profile' | 'annotate';
