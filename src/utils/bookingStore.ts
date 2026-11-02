import { AppointmentBooking } from '../types';

const STORAGE_KEY = 'thee_weave_snatcher_bookings';

const INITIAL_SAMPLE_BOOKINGS: AppointmentBooking[] = [
  {
    id: 'TWS-94281',
    serviceId: 'sewin-traditional',
    serviceName: 'Traditional Sew-In (Leave Out)',
    servicePrice: 165,
    addOns: [
      {
        id: 'addon-trim',
        name: 'Split-End Precision Dusting / Trim',
        price: 25,
        durationMinutes: 15,
        description: 'Removes dead, split ends.',
      },
    ],
    totalPrice: 190,
    date: '2026-11-04',
    time: '10:00 AM',
    clientName: 'Monique Davis',
    clientPhone: '(616) 555-0143',
    clientEmail: 'monique.davis@example.com',
    hairNotes: 'Bringing 3 bundles of 22" deep wave hair. Naturally 4A curls.',
    status: 'confirmed',
    createdAt: '2026-11-01T14:30:00Z',
    emailStatus: 'sent',
  },
  {
    id: 'TWS-88319',
    serviceId: 'silk-press-signature',
    serviceName: 'Diamond Gloss Silk Press',
    servicePrice: 80,
    addOns: [
      {
        id: 'addon-steam',
        name: 'Steam Hydration Therapy Treatment',
        price: 25,
        durationMinutes: 20,
        description: 'Infuses deep moisture.',
      },
    ],
    totalPrice: 105,
    date: '2026-11-05',
    time: '01:30 PM',
    clientName: 'Taylor Jenkins',
    clientPhone: '(616) 555-0188',
    clientEmail: 'taylor.j@example.com',
    hairNotes: 'First time client, dry scalp after braids.',
    status: 'confirmed',
    createdAt: '2026-11-01T16:15:00Z',
    emailStatus: 'sent',
  },
];

export function getStoredBookings(): AppointmentBooking[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_BOOKINGS));
      return INITIAL_SAMPLE_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SAMPLE_BOOKINGS;
  }
}

export function saveBooking(booking: AppointmentBooking): void {
  const current = getStoredBookings();
  const index = current.findIndex((b) => b.id === booking.id);
  let updated: AppointmentBooking[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = booking;
  } else {
    updated = [booking, ...current];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function cancelBooking(id: string): boolean {
  const current = getStoredBookings();
  const index = current.findIndex((b) => b.id === id);
  if (index >= 0) {
    current[index].status = 'cancelled';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  }
  return false;
}

export function rescheduleBooking(id: string, newDate: string, newTime: string): boolean {
  const current = getStoredBookings();
  const index = current.findIndex((b) => b.id === id);
  if (index >= 0) {
    current[index].date = newDate;
    current[index].time = newTime;
    current[index].status = 'rescheduled';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  }
  return false;
}

export function findBooking(query: string): AppointmentBooking | undefined {
  const current = getStoredBookings();
  const q = query.trim().toLowerCase();
  return current.find(
    (b) =>
      b.id.toLowerCase() === q ||
      b.clientPhone.replace(/\D/g, '') === q.replace(/\D/g, '') ||
      b.clientEmail.toLowerCase() === q
  );
}

export function getBookedDates(): Set<string> {
  const bookings = getStoredBookings();
  const dates = new Set<string>();
  bookings.forEach((b) => {
    if (b.status !== 'cancelled') {
      dates.add(b.date);
    }
  });
  return dates;
}

export function isDateFullyBookedOrReserved(dateString: string): boolean {
  if (!dateString) return false;
  const bookings = getStoredBookings();
  // Any date booked in this browser or by the client is flagged
  return bookings.some((b) => b.date === dateString && b.status !== 'cancelled');
}

export function getBookedTimeSlots(dateString: string): Set<string> {
  const bookings = getStoredBookings();
  const times = new Set<string>();
  bookings
    .filter((b) => b.date === dateString && b.status !== 'cancelled')
    .forEach((b) => times.add(b.time));
  return times;
}

// Dispatches real email notification to both the stylist and customer without a custom backend
export async function sendBookingEmails(booking: AppointmentBooking): Promise<{ success: boolean; message: string }> {
  const STYLIST_EMAIL = 'theeweavesnatcher@gmail.com';

  const emailPayload = {
    _subject: `New Salon Appointment: ${booking.clientName} - ${booking.serviceName} (${booking.date} at ${booking.time})`,
    _replyto: booking.clientEmail,
    _cc: booking.clientEmail, // Sends a copy to the customer's email!
    _template: 'table',
    _autoresponse: `Hello ${booking.clientName},\n\nThank you for booking with Ayanna Charelle at Thee Weave Snatcher! Your appointment request has been received.\n\nSummary:\nService: ${booking.serviceName}\nDate: ${booking.date}\nTime: ${booking.time}\nLocation: Mane Attraction Salon, 865 28th St SE, Grand Rapids, MI 49508\n\nNo upfront deposit is required. Your total balance of $${booking.totalPrice} is payable in person at the conclusion of your service.\n\nWe look forward to giving you an exceptional salon experience!`,
    'Client Name': booking.clientName,
    'Client Phone': booking.clientPhone,
    'Client Email': booking.clientEmail,
    'Hairstyle Service': booking.serviceName,
    'Appointment Date': booking.date,
    'Appointment Time': booking.time,
    'Estimated Price': `$${booking.totalPrice}`,
    'Additional Notes': booking.hairNotes || 'None provided',
    'Booking Reference': booking.id,
    'Notification Destination': `Sent to Stylist (${STYLIST_EMAIL}) and Customer (${booking.clientEmail})`,
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${STYLIST_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Booking notification successfully emailed to ${STYLIST_EMAIL} and confirmation sent to ${booking.clientEmail}.`,
      };
    } else {
      return {
        success: false,
        message: `Direct gateway returned status ${response.status}. Mailto backup generated.`,
      };
    }
  } catch (error) {
    console.warn('Direct HTTP email dispatch encountered a network or CORS restriction:', error);
    return {
      success: false,
      message: 'Network connection issue with external gateway. Direct email client backup triggered.',
    };
  }
}

export function generateMailtoUrl(booking: AppointmentBooking): string {
  const subject = encodeURIComponent(`New Salon Appointment Booking: ${booking.clientName} - ${booking.serviceName}`);
  const body = encodeURIComponent(
    `Hello Ayanna,\n\nHere are my appointment details for Thee Weave Snatcher:\n\n` +
      `Client: ${booking.clientName}\n` +
      `Phone: ${booking.clientPhone}\n` +
      `Email: ${booking.clientEmail}\n` +
      `Service: ${booking.serviceName}\n` +
      `Date: ${booking.date}\n` +
      `Time: ${booking.time}\n` +
      `Price: $${booking.totalPrice} (Payable at salon)\n` +
      `Notes: ${booking.hairNotes || 'None'}\n` +
      `Reference: ${booking.id}\n\n` +
      `Thank you!`
  );
  return `mailto:theeweavesnatcher@gmail.com?cc=${encodeURIComponent(booking.clientEmail)}&subject=${subject}&body=${body}`;
}

export function getAvailableSlots(dateString: string): string[] {
  if (!dateString) return [];
  const dateObj = new Date(dateString + 'T00:00:00');
  const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat

  // Closed Sun & Mon
  if (dayOfWeek === 0 || dayOfWeek === 1) return [];

  let slots: string[] = [];
  if (dayOfWeek === 6) {
    // Saturday: 8am - 4pm
    slots = [
      '08:00 AM',
      '09:30 AM',
      '11:00 AM',
      '12:30 PM',
      '02:00 PM',
      '03:30 PM',
    ];
  } else {
    // Tue-Fri: 9am - 6pm
    slots = [
      '09:00 AM',
      '10:30 AM',
      '12:00 PM',
      '01:30 PM',
      '03:00 PM',
      '04:30 PM',
    ];
  }

  // Filter out any slots that are already confirmed for that date
  const bookings = getStoredBookings();
  const bookedTimes = new Set(
    bookings
      .filter((b) => b.date === dateString && b.status !== 'cancelled')
      .map((b) => b.time)
  );

  return slots.filter((slot) => !bookedTimes.has(slot));
}
