export type ServiceCategory = 
  | 'all'
  | 'sew-in'
  | 'quick-weave'
  | 'silk-press'
  | 'maintenance'
  | 'cut-color'
  | 'brows';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  depositRequired?: number;
  popular?: boolean;
  requirements?: string[];
  image?: string;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  image: string;
  description: string;
  duration: string;
  price: number;
  serviceId?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  serviceRendered: string;
  rating: number;
  date: string;
  reviewText: string;
  city: string;
}

export interface AppointmentBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  addOns?: ServiceAddOn[];
  totalPrice: number;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  hairNotes?: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
  emailStatus?: 'sent' | 'pending' | 'direct';
}

export interface BusinessPolicy {
  title: string;
  summary: string;
  rules: string[];
}
