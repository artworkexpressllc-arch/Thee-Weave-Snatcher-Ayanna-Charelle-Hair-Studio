import { useState, useMemo } from 'react';
import { ServiceCategory } from '../types';
import { SERVICES_CATALOG } from '../data/salonData';
import { Clock, Search, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

const CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'sew-in', label: 'Sew-In Extensions' },
  { id: 'quick-weave', label: 'Quick Weaves' },
  { id: 'silk-press', label: 'Silk Press & Treatments' },
  { id: 'maintenance', label: 'Weave Maintenance' },
  { id: 'cut-color', label: 'Cuts & Color' },
  { id: 'brows', label: 'Eyebrows' },
];

export function ServicesSection({ onSelectServiceToBook }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services" className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-2">
            <span>Service Menu &amp; Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Grand Rapids Studio</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
            Complete Menu Extracted from StyleSeat
          </h2>
          <p className="mt-3 text-stone-600 text-base leading-relaxed">
            Transparent pricing, realistic service durations, and uncompromised craftsmanship with zero upfront deposit required.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-lg overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900"
            />
          </div>
        </div>

        {/* Services List / Grid */}
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-stone-200">
            <p className="text-stone-500 text-sm">No services matched your search criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-amber-900 underline font-medium"
            >
              Clear filters and view all services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Optional Image thumbnail for signature styles */}
                  {service.image && (
                    <div className="h-44 w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Unboxed Metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />
                        <span>{Math.floor(service.durationMinutes / 60)}h {service.durationMinutes % 60 ? `${service.durationMinutes % 60}m` : ''}</span>
                        <span aria-hidden="true">·</span>
                        <span>Pay at Salon</span>
                      </div>
                      {service.popular && (
                        <div className="flex items-center gap-1 text-amber-800 font-semibold text-[11px] tracking-wide uppercase">
                          <Sparkles className="w-3 h-3" />
                          <span>Signature</span>
                        </div>
                      )}
                    </div>

                    {/* Service Title & Price */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-editorial text-xl font-semibold text-stone-900 leading-snug">
                        {service.name}
                      </h3>
                      <span className="font-editorial text-2xl font-semibold text-stone-900 tabular-nums shrink-0">
                        ${service.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">
                      {service.description}
                    </p>

                    {/* Requirements callout if any */}
                    {service.requirements && service.requirements.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-stone-100 space-y-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-700">
                          <AlertCircle className="w-3 h-3 text-stone-400" />
                          <span>Preparation Notice:</span>
                        </div>
                        <ul className="text-[11px] text-stone-500 list-disc list-inside space-y-0.5">
                          {service.requirements.map((req, idx) => (
                            <li key={idx} className="line-clamp-2">{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0 mt-2">
                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
