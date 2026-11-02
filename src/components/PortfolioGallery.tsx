import { useState } from 'react';
import { PORTFOLIO_GALLERY } from '../data/salonData';
import { PortfolioItem, ServiceCategory } from '../types';
import { Sparkles, X, ArrowRight, Clock, Tag } from 'lucide-react';

interface PortfolioGalleryProps {
  onSelectServiceToBook: (serviceId?: string) => void;
}

export function PortfolioGallery({ onSelectServiceToBook }: PortfolioGalleryProps) {
  const [filter, setFilter] = useState<ServiceCategory>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems = filter === 'all'
    ? PORTFOLIO_GALLERY
    : PORTFOLIO_GALLERY.filter((item) => item.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-2">
              <span>Hairstyle Portfolio</span>
              <span aria-hidden="true">·</span>
              <span>Authentic Client Artistry</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
              Flawless Sew-Ins, Sleek Bobs &amp; Silky Movement.
            </h2>
            <p className="mt-2 text-stone-600 text-sm leading-relaxed">
              Explore signature hairstyles completed in our Grand Rapids salon suite. Every look showcases seamless hairline work, protective braid foundations, and high-gloss finishes.
            </p>
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-lg overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Styles
            </button>
            <button
              onClick={() => setFilter('sew-in')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'sew-in' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sew-Ins &amp; Lace
            </button>
            <button
              onClick={() => setFilter('quick-weave')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'quick-weave' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Quick Weave Bobs
            </button>
            <button
              onClick={() => setFilter('silk-press')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                filter === 'silk-press' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Silk Presses
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-lg transition-all"
            >
              <div className="aspect-[3/4] overflow-hidden bg-stone-100 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-xs text-stone-900 text-xs font-medium rounded shadow-sm">
                    View Transformation
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>{item.duration}</span>
                  <span className="font-editorial text-stone-900 font-semibold tabular-nums text-base">
                    ${item.price}
                  </span>
                </div>
                <h3 className="font-editorial text-lg font-semibold text-stone-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-[4/5] bg-stone-100 max-h-[500px]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Grand Rapids Salon Suite Look</span>
                  </div>

                  <h3 className="font-editorial text-2xl font-bold text-stone-900">
                    {activeItem.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{activeItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400" />
                      <span className="font-semibold text-stone-900">${activeItem.price}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 mt-4 leading-relaxed">
                    {activeItem.description}
                  </p>

                  <div className="mt-4 p-3.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-1">
                    <p className="font-semibold text-stone-800">Stylist Maintenance Tip:</p>
                    <p>
                      Tie hair with a satin scarf or bonnet nightly. For sew-ins, sleep in loose pin curls or flexi rods to maintain wave integrity.
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100">
                  <button
                    onClick={() => {
                      const serviceId = activeItem.serviceId;
                      setActiveItem(null);
                      onSelectServiceToBook(serviceId);
                    }}
                    className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book This Hairstyle</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
