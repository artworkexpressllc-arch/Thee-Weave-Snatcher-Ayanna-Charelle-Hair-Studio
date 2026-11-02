/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioGallery } from './components/PortfolioGallery';
import { PoliciesSection } from './components/PoliciesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { ManageBookingModal } from './components/ManageBookingModal';
import { ExtractionReportModal } from './components/ExtractionReportModal';
import { AppointmentBooking } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isManageBookingOpen, setIsManageBookingOpen] = useState(false);
  const [isAuditReportOpen, setIsAuditReportOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleBookingCompleted = (booking: AppointmentBooking) => {
    setNotification(`Appointment ${booking.id} reserved for ${booking.clientName}! Check your email for details.`);
    setTimeout(() => {
      setNotification(null);
    }, 6000);
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900">
      
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white px-4 py-3 rounded-lg shadow-xl border border-stone-700 flex items-center gap-2.5 text-xs animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenManageBooking={() => setIsManageBookingOpen(true)}
        onOpenAuditReport={() => setIsAuditReportOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={scrollToServices}
        />

        <AboutSection
          onOpenBooking={() => handleOpenBooking()}
        />

        <ServicesSection
          onSelectServiceToBook={(svcId) => handleOpenBooking(svcId)}
        />

        <PortfolioGallery
          onSelectServiceToBook={(svcId) => handleOpenBooking(svcId)}
        />

        <PoliciesSection />

        <TestimonialsSection />

        <ContactSection
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenAuditReport={() => setIsAuditReportOpen(true)}
        onOpenManageBooking={() => setIsManageBookingOpen(true)}
      />

      {/* Modals & Portals */}
      <BookingSystem
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={selectedServiceId}
        onBookingComplete={handleBookingCompleted}
      />

      <ManageBookingModal
        isOpen={isManageBookingOpen}
        onClose={() => setIsManageBookingOpen(false)}
        onAppointmentUpdated={() => {
          setNotification('Your appointment status has been updated.');
          setTimeout(() => setNotification(null), 5000);
        }}
      />

      <ExtractionReportModal
        isOpen={isAuditReportOpen}
        onClose={() => setIsAuditReportOpen(false)}
      />

    </div>
  );
}
