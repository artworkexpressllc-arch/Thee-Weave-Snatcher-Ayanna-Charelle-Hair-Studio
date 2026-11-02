import { useState } from 'react';
import { AppointmentBooking } from '../types';
import { findBooking, cancelBooking, rescheduleBooking, getAvailableSlots } from '../utils/bookingStore';
import { X, Search, Calendar, Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface ManageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentUpdated?: () => void;
}

export function ManageBookingModal({
  isOpen,
  onClose,
  onAppointmentUpdated,
}: ManageBookingModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundBooking, setFoundBooking] = useState<AppointmentBooking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Rescheduling state
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const match = findBooking(searchQuery);
    setFoundBooking(match || null);
    setHasSearched(true);
    setActionSuccessMessage(null);
    setIsRescheduling(false);
  };

  const handleCancel = () => {
    if (!foundBooking) return;
    if (window.confirm('Are you sure you want to cancel this appointment? As per the 24-hour policy, notice given in advance allows deposit transfer.')) {
      cancelBooking(foundBooking.id);
      setFoundBooking({ ...foundBooking, status: 'cancelled' });
      setActionSuccessMessage('Your appointment has been cancelled successfully.');
      if (onAppointmentUpdated) onAppointmentUpdated();
    }
  };

  const handleRescheduleSubmit = () => {
    if (!foundBooking || !newDate || !newTime) return;
    rescheduleBooking(foundBooking.id, newDate, newTime);
    setFoundBooking({
      ...foundBooking,
      date: newDate,
      time: newTime,
      status: 'rescheduled',
    });
    setIsRescheduling(false);
    setActionSuccessMessage(`Your appointment has been rescheduled to ${newDate} at ${newTime}.`);
    if (onAppointmentUpdated) onAppointmentUpdated();
  };

  const availableRescheduleSlots = newDate ? getAvailableSlots(newDate) : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-stone-900">
              Lookup &amp; Manage Appointment
            </h2>
            <p className="text-xs text-stone-500">
              View your booking status, reschedule to a new slot, or cancel.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-stone-100">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Enter Booking Reference ID or Phone Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. TWS-94281 or (616) 555-0143"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                Find Booking
              </button>
            </div>
          </form>
        </div>

        {/* Results Body */}
        <div className="p-6 space-y-4">
          {actionSuccessMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
          )}

          {hasSearched && !foundBooking && (
            <div className="p-8 text-center text-stone-500 space-y-2">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="text-sm font-medium text-stone-800">No appointment found</p>
              <p className="text-xs">
                We couldn't find an appointment matching <strong className="text-stone-700 font-semibold">{searchQuery}</strong>. Please check your reference code or phone number.
              </p>
              <p className="text-[11px] text-stone-400 pt-2">
                Tip: Try sample reference code <code className="bg-stone-100 px-1 py-0.5 rounded">TWS-94281</code>
              </p>
            </div>
          )}

          {foundBooking && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-stone-200 px-1.5 py-0.5 rounded text-stone-800 font-semibold">
                      {foundBooking.id}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-stone-900 mt-1">
                      {foundBooking.serviceName}
                    </h3>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                      foundBooking.status === 'confirmed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : foundBooking.status === 'rescheduled'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {foundBooking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-stone-600 pt-2 border-t border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-medium text-stone-900">{foundBooking.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span className="font-medium text-stone-900">{foundBooking.time}</span>
                  </div>
                </div>

                <div className="text-xs text-stone-600 space-y-0.5 pt-1">
                  <p><strong className="text-stone-800">Client:</strong> {foundBooking.clientName}</p>
                  <p><strong className="text-stone-800">Phone:</strong> {foundBooking.clientPhone}</p>
                  <p><strong className="text-stone-800">Total Price:</strong> ${foundBooking.totalPrice} (Payable in person at the salon)</p>
                  {foundBooking.hairNotes && (
                    <p className="text-[11px] text-stone-500 italic mt-1">Notes: "{foundBooking.hairNotes}"</p>
                  )}
                </div>
              </div>

              {/* Reschedule View or Action Buttons */}
              {foundBooking.status !== 'cancelled' && (
                <div>
                  {isRescheduling ? (
                    <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3 text-xs">
                      <h4 className="font-semibold text-stone-900">Select New Date &amp; Time:</h4>
                      
                      <div className="space-y-1">
                        <label className="text-[11px] text-stone-600 block">New Date (YYYY-MM-DD):</label>
                        <input
                          type="date"
                          value={newDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => {
                            setNewDate(e.target.value);
                            setNewTime('');
                          }}
                          className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded"
                        />
                      </div>

                      {newDate && (
                        <div className="space-y-1">
                          <label className="text-[11px] text-stone-600 block">Available Time Slots:</label>
                          {availableRescheduleSlots.length === 0 ? (
                            <p className="text-stone-500 italic">No slots available on this date. Note: salon is closed Sunday &amp; Monday.</p>
                          ) : (
                            <div className="grid grid-cols-3 gap-1.5">
                              {availableRescheduleSlots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => setNewTime(slot)}
                                  className={`py-1.5 px-2 rounded border text-center transition-colors ${
                                    newTime === slot
                                      ? 'bg-amber-900 text-white border-amber-900 font-semibold'
                                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <button
                          disabled={!newDate || !newTime}
                          onClick={handleRescheduleSubmit}
                          className="flex-1 py-2 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded font-medium text-xs transition-colors"
                        >
                          Confirm Rescheduled Slot
                        </button>
                        <button
                          onClick={() => setIsRescheduling(false)}
                          className="px-3 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsRescheduling(true)}
                        className="flex-1 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reschedule Appointment</span>
                      </button>

                      <button
                        onClick={handleCancel}
                        className="py-2.5 px-4 bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-medium rounded-lg transition-colors"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
