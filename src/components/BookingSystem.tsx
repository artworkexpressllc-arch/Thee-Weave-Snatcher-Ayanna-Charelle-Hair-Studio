import { useState, useMemo, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SERVICES_CATALOG, SALON_INFO } from '../data/salonData';
import { ServiceItem, AppointmentBooking } from '../types';
import {
  saveBooking,
  getAvailableSlots,
  getBookedDates,
  getBookedTimeSlots,
  sendBookingEmails,
  generateMailtoUrl,
} from '../utils/bookingStore';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Download,
  AlertCircle,
  Mail,
  Send,
  User,
  Phone,
  FileText,
  Info,
} from 'lucide-react';

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  onBookingComplete?: (booking: AppointmentBooking) => void;
}

export function BookingSystem({
  isOpen,
  onClose,
  preSelectedServiceId,
  onBookingComplete,
}: BookingSystemProps) {
  // Service selection
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  
  // Date & Time
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [hairNotes, setHairNotes] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);
  const [emailStatusMessage, setEmailStatusMessage] = useState<string | null>(null);

  // Set initial service
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
    } else if (!selectedServiceId && SERVICES_CATALOG.length > 0) {
      setSelectedServiceId(SERVICES_CATALOG[0].id);
    }
  }, [preSelectedServiceId, isOpen]);

  const selectedService = useMemo(() => {
    return SERVICES_CATALOG.find((s) => s.id === selectedServiceId) || SERVICES_CATALOG[0];
  }, [selectedServiceId]);

  // Read currently booked dates in local storage
  const bookedDatesSet = useMemo(() => {
    return getBookedDates();
  }, [confirmedBooking, isOpen]);

  // Generate selectable dates for next 21 days
  const selectableDates = useMemo(() => {
    const dates: {
      dateStr: string;
      displayDay: string;
      dayName: string;
      isOpenDay: boolean;
      isBooked: boolean;
    }[] = [];
    const today = new Date();

    for (let i = 1; i <= 21; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue ... 6 = Sat
      const isOpenDay = dayOfWeek !== 0 && dayOfWeek !== 1; // Tue-Sat
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const displayDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isBooked = bookedDatesSet.has(dateStr);

      dates.push({ dateStr, displayDay, dayName, isOpenDay, isBooked });
    }
    return dates;
  }, [bookedDatesSet]);

  // Standard all slots for Tue-Fri or Sat
  const allDaySlots = useMemo(() => {
    if (!selectedDate) return [];
    const dateObj = new Date(selectedDate + 'T00:00:00');
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 1) return [];
    if (dayOfWeek === 6) {
      return ['08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM'];
    }
    return ['09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM'];
  }, [selectedDate]);

  // Booked slots on this date
  const bookedTimesOnDate = useMemo(() => {
    if (!selectedDate) return new Set<string>();
    return getBookedTimeSlots(selectedDate);
  }, [selectedDate, confirmedBooking]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone || !clientEmail) {
      setSubmissionError('Please fill in all required fields and choose an available date and time.');
      return;
    }

    // Double check that the slot is not already booked
    if (bookedTimesOnDate.has(selectedTime)) {
      setSubmissionError(`The ${selectedTime} time slot has already been booked. Please choose another time.`);
      return;
    }

    setSubmissionError(null);
    setIsSubmitting(true);

    const bookingId = `TWS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: AppointmentBooking = {
      id: bookingId,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      totalPrice: selectedService.price,
      date: selectedDate,
      time: selectedTime,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      hairNotes: hairNotes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      emailStatus: 'pending',
    };

    // 1. Save locally to immediately mark slot and date unselectable
    saveBooking(newBooking);

    // 2. Dispatch real email to theeweavesnatcher@gmail.com and CC client
    const emailResult = await sendBookingEmails(newBooking);
    newBooking.emailStatus = emailResult.success ? 'sent' : 'direct';
    setEmailStatusMessage(emailResult.message);

    setIsSubmitting(false);
    setConfirmedBooking(newBooking);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#78350f', '#d97706', '#f59e0b', '#1c1917'],
      });
    } catch {
      // no-op
    }

    if (onBookingComplete) {
      onBookingComplete(newBooking);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setSelectedTime('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
    setHairNotes('');
    onClose();
  };

  // Download .ics calendar event
  const downloadIcsCalendar = () => {
    if (!confirmedBooking) return;
    const startHour = parseInt(confirmedBooking.time.split(':')[0], 10);
    const isPM = confirmedBooking.time.includes('PM');
    const normalizedHour = (isPM && startHour !== 12 ? startHour + 12 : startHour).toString().padStart(2, '0');
    const startMinute = confirmedBooking.time.split(':')[1].substring(0, 2);

    const dateFormatted = confirmedBooking.date.replace(/-/g, '');
    const dtStart = `${dateFormatted}T${normalizedHour}${startMinute}00`;
    const endHour = (parseInt(normalizedHour, 10) + 3).toString().padStart(2, '0');
    const dtEnd = `${dateFormatted}T${endHour}${startMinute}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Thee Weave Snatcher//Ayanna Charelle Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.id}@theeweavesnatcher.com`,
      `DTSTAMP:${dateFormatted}T000000Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:Hair Appointment: ${confirmedBooking.serviceName} with Ayanna Charelle`,
      `DESCRIPTION:Appointment confirmation for ${confirmedBooking.clientName}. Service: ${confirmedBooking.serviceName} ($${confirmedBooking.totalPrice}). Location: Mane Attraction Salon, 865 28th St SE, Grand Rapids, MI.`,
      `LOCATION:Mane Attraction Salon, 865 28th St SE, Grand Rapids, MI 49508`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${confirmedBooking.id}-Ayanna-Charelle-Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Salon Booking · No Upfront Deposit</span>
            </div>
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              {confirmedBooking ? 'Appointment Submitted' : 'Book Your Salon Visit'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {confirmedBooking ? (
            /* Confirmation View */
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold tracking-wider uppercase text-amber-900">
                  Appointment Details Dispatched
                </div>
                <h3 className="font-editorial text-3xl font-bold text-stone-900">
                  Thank You, {confirmedBooking.clientName}!
                </h3>
                <p className="text-xs text-stone-600">
                  Booking Reference: <strong className="font-mono text-stone-900 font-bold">{confirmedBooking.id}</strong>
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 text-left space-y-3 max-w-lg mx-auto text-xs">
                <div className="flex justify-between items-start pb-2 border-b border-stone-200">
                  <div>
                    <p className="font-semibold text-sm text-stone-900">{confirmedBooking.serviceName}</p>
                    <p className="text-stone-500">{confirmedBooking.date} at {confirmedBooking.time}</p>
                  </div>
                  <span className="font-bold text-stone-900 tabular-nums text-sm">${confirmedBooking.totalPrice}</span>
                </div>

                <div className="space-y-1 text-stone-600">
                  <p><strong className="text-stone-800">Client:</strong> {confirmedBooking.clientName} ({confirmedBooking.clientPhone})</p>
                  <p><strong className="text-stone-800">Confirmation Sent To:</strong> {confirmedBooking.clientEmail}</p>
                  <p><strong className="text-stone-800">Stylist Notification:</strong> {SALON_INFO.email}</p>
                  <p><strong className="text-stone-800">Location:</strong> {SALON_INFO.streetAddress}, {SALON_INFO.cityStateZip}</p>
                  <p><strong className="text-stone-800">Payment:</strong> No deposit required. Full service price ($${confirmedBooking.totalPrice}) is paid at the salon.</p>
                  {confirmedBooking.hairNotes && (
                    <p className="pt-1 text-stone-500 italic">Notes: "{confirmedBooking.hairNotes}"</p>
                  )}
                </div>
              </div>

              {/* Real Email Dispatch Notice */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl text-left text-xs text-stone-700 space-y-2 max-w-lg mx-auto">
                <div className="flex items-center gap-1.5 font-semibold text-amber-950">
                  <Mail className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Real Email Delivery Dispatched</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Booking details were sent to <strong>{SALON_INFO.email}</strong> and a confirmation copy was sent to <strong>{confirmedBooking.clientEmail}</strong>.
                </p>
                {emailStatusMessage && (
                  <p className="text-[11px] text-stone-500 italic border-t border-amber-200/60 pt-1.5">
                    {emailStatusMessage}
                  </p>
                )}
                
                {/* Direct mailto fallback link */}
                <div className="pt-1">
                  <a
                    href={generateMailtoUrl(confirmedBooking)}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-900 font-semibold hover:underline"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Open in your email app as direct backup
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={downloadIcsCalendar}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Add to Calendar (.ics)
                </button>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-medium rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Simplified Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              
              {submissionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submissionError}</span>
                </div>
              )}

              {/* Service Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 flex items-center justify-between">
                  <span>1. Selected Hairstyle Service *</span>
                  <span className="font-editorial text-sm font-bold text-stone-900 tabular-nums">
                    ${selectedService.price}
                  </span>
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  {SERVICES_CATALOG.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name} (${svc.price} · {Math.floor(svc.durationMinutes / 60)}h {svc.durationMinutes % 60 ? `${svc.durationMinutes % 60}m` : ''})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-stone-500 line-clamp-2">
                  {selectedService.description}
                </p>
              </div>

              {/* Date Horizontal Picker with Slash on Booked Dates */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    2. Preferred Appointment Date *
                  </label>
                  <span className="text-[11px] text-stone-500">Tue – Sat</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 pr-1">
                  {selectableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    const isBooked = item.isBooked;
                    const isSelectable = item.isOpenDay && !isBooked;

                    return (
                      <button
                        key={item.dateStr}
                        type="button"
                        disabled={!isSelectable}
                        onClick={() => {
                          setSelectedDate(item.dateStr);
                          setSelectedTime(''); // Reset time on date change
                        }}
                        title={
                          isBooked
                            ? 'This date is already booked and unavailable'
                            : !item.isOpenDay
                            ? 'Salon closed on Sunday & Monday'
                            : `Select ${item.dateStr}`
                        }
                        className={`relative p-3 rounded-xl flex flex-col items-center justify-center min-w-[76px] transition-all shrink-0 border overflow-hidden ${
                          isBooked
                            ? 'bg-rose-50/70 border-rose-300 text-stone-400 cursor-not-allowed opacity-75'
                            : !item.isOpenDay
                            ? 'opacity-40 bg-stone-100 border-stone-200 cursor-not-allowed text-stone-400'
                            : isSelected
                            ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                        }`}
                      >
                        {/* Red diagonal slash mark for already booked dates */}
                        {isBooked && (
                          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <div className="w-[140%] h-[2px] bg-rose-500/80 -rotate-45 transform" />
                          </div>
                        )}

                        <span className="text-[11px] font-medium">{item.dayName}</span>
                        <span className="text-sm font-bold mt-0.5">{item.displayDay.split(' ')[1]}</span>
                        <span className="text-[10px] mt-0.5 opacity-80">{item.displayDay.split(' ')[0]}</span>

                        {isBooked ? (
                          <span className="text-[9px] font-bold text-rose-600 mt-1 uppercase">
                            Booked
                          </span>
                        ) : !item.isOpenDay ? (
                          <span className="text-[9px] mt-1 text-stone-400">Closed</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                {/* Slashed Date Indicator Note */}
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="inline-block w-4 h-2.5 bg-rose-50 border border-rose-300 relative overflow-hidden rounded">
                    <span className="absolute inset-0 w-full h-[2px] bg-rose-500 -rotate-45 top-1" />
                  </span>
                  <span>Dates with a red slash are already booked and unselectable.</span>
                </div>
              </div>

              {/* Time Slots on Selected Date */}
              {selectedDate && (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    3. Preferred Appointment Time for {selectedDate} *
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {allDaySlots.map((slot) => {
                      const isBookedSlot = bookedTimesOnDate.has(slot);
                      const isSelected = selectedTime === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBookedSlot}
                          onClick={() => setSelectedTime(slot)}
                          className={`relative py-2.5 px-3 text-xs font-medium rounded-lg border transition-all text-center overflow-hidden ${
                            isBookedSlot
                              ? 'bg-rose-50/60 border-rose-200 text-stone-400 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-amber-900 text-white border-amber-900 font-semibold'
                              : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                          }`}
                        >
                          {slot}
                          {isBookedSlot && (
                            <span className="block text-[9px] text-rose-600 no-underline font-semibold">
                              Unavailable
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Client Contact Info */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  4. Your Contact Details
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-800 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Monique Davis"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-800 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (616) 555-0143"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-stone-800 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>Email Address (Confirmation Delivery) *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. monique.davis@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-medium text-stone-800 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-stone-400" />
                      <span>Additional Notes (Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Hair texture, bundle length, or special styling requests..."
                      value={hairNotes}
                      onChange={(e) => setHairNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* No Payment Notice & Disclaimers */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-stone-800">
                  <Info className="w-4 h-4 text-stone-500 shrink-0" />
                  <span>No Deposit Required:</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Your appointment information will be emailed directly to <strong>{SALON_INFO.email}</strong> and a confirmation will be emailed to your address. Full payment of ${selectedService.price} is payable in person at the salon after service.
                </p>
                <p className="text-[10px] text-stone-400 pt-0.5">
                  Availability Notice: Slot reservation and date slashing are stored locally on this device. Without a custom centralized database, multi-device cross-browser locking relies on external calendar synchronization.
                </p>
              </div>

              {/* The Main Action Button: BOOK APPOINTMENT */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !selectedDate || !selectedTime || !clientName || !clientPhone || !clientEmail}
                  className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-sm font-semibold tracking-wide rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Send className="w-4 h-4 animate-spin" />
                      <span>Sending Booking Details...</span>
                    </>
                  ) : (
                    <>
                      <span>BOOK APPOINTMENT</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
