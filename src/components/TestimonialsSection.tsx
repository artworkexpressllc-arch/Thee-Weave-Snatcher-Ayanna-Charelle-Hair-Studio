import { TESTIMONIALS } from '../data/salonData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section id="reviews" className="py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-2">
            <span>Client Satisfaction</span>
            <span aria-hidden="true">·</span>
            <span>StyleSeat Verified Reviews</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
            Loved by clients throughout West Michigan.
          </h2>
          <p className="mt-3 text-stone-600 text-sm leading-relaxed">
            Real feedback from verified clients who trust Ayanna Charelle for protective styles, flawless extensions, and healthy hair transformations.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testi) => (
            <div
              key={testi.id}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{testi.date}</span>
                </div>

                <Quote className="w-5 h-5 text-amber-900/30 mb-2" />
                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{testi.reviewText}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-stone-900 text-xs">{testi.clientName}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
                <p className="text-[11px] text-amber-900 font-medium">{testi.serviceRendered}</p>
                <p className="text-[11px] text-stone-400">{testi.city}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
