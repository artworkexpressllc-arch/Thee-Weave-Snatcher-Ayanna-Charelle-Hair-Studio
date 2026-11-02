import { BUSINESS_POLICIES, SALON_INFO } from '../data/salonData';
import { ShieldCheck, AlertCircle, Clock, Scissors, Users } from 'lucide-react';

const POLICY_ICONS = [ShieldCheck, Clock, AlertCircle, Scissors, Users];

export function PoliciesSection() {
  return (
    <section id="policies" className="py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-900 mb-2">
            <span>Salon Guidelines</span>
            <span aria-hidden="true">·</span>
            <span>Appointment Policies</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
            Transparent Standards for an Exceptional Experience.
          </h2>
          <p className="mt-3 text-stone-600 text-sm leading-relaxed">
            Please review our business policies prior to booking. These terms ensure punctual scheduling, hair preparation compliance, and respect for every client's dedicated salon time.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_POLICIES.map((policy, idx) => {
            const Icon = POLICY_ICONS[idx % POLICY_ICONS.length];
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-amber-900 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-stone-900 mb-1">
                    {policy.title}
                  </h3>

                  <p className="text-xs font-medium text-amber-950 mb-3 pb-3 border-b border-stone-100">
                    {policy.summary}
                  </p>

                  <ul className="space-y-2 text-xs text-stone-600">
                    {policy.rules.map((rule, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-amber-800 font-bold mt-0.5">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
