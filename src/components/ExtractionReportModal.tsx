import { EXTRACTION_AUDIT_REPORT, SALON_INFO, SERVICES_CATALOG } from '../data/salonData';
import { X, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck, Database, FileText } from 'lucide-react';

interface ExtractionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExtractionReportModal({ isOpen, onClose }: ExtractionReportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-stone-900 text-amber-300 rounded-lg">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900">
                <span>Phase 1 Deliverable</span>
                <span aria-hidden="true">·</span>
                <span>Audit Documentation</span>
              </div>
              <h2 className="font-editorial text-2xl font-bold text-stone-900">
                StyleSeat Profile Extraction &amp; Migration Report
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 flex-1 leading-relaxed">
          
          {/* Overview */}
          <div className="p-4 bg-stone-100/70 rounded-xl border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block">Source Profile</span>
              <a
                href={EXTRACTION_AUDIT_REPORT.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-stone-900 inline-flex items-center gap-1 hover:underline text-xs mt-0.5"
              >
                styleseat.com/{EXTRACTION_AUDIT_REPORT.profileHandle}
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block">Stylist / Entity</span>
              <span className="font-semibold text-stone-900">{EXTRACTION_AUDIT_REPORT.stylistName}</span>
              <span className="block text-[11px] text-stone-500">({EXTRACTION_AUDIT_REPORT.businessBrand})</span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide block">Verified Location</span>
              <span className="font-medium text-stone-900">{EXTRACTION_AUDIT_REPORT.location}</span>
            </div>
          </div>

          {/* Section 1: Business Information Extracted */}
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              1. Extracted Business Information &amp; Credentials
            </h3>
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3">Field</th>
                    <th className="py-2.5 px-3">Extracted Data</th>
                    <th className="py-2.5 px-3">Verification Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  <tr>
                    <td className="py-2 px-3 font-medium text-stone-800">Stylist Name</td>
                    <td className="py-2 px-3 text-stone-700">{SALON_INFO.stylistName}</td>
                    <td className="py-2 px-3 text-stone-500">StyleSeat Profile &amp; Cosmetology Registry</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-stone-800">Brand Handles</td>
                    <td className="py-2 px-3 text-stone-700">@theeweavesnatcher · @OHSHEMAD · Bundled Beauty</td>
                    <td className="py-2 px-3 text-stone-500">StyleSeat URL, Instagram &amp; Booksy Profile</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-stone-800">Experience &amp; License</td>
                    <td className="py-2 px-3 text-stone-700">Practicing since 2009 · MI Licensed Cosmetologist (2013)</td>
                    <td className="py-2 px-3 text-stone-500">Professional Bio &amp; Cosmetology Credentials</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-stone-800">Operating Suite</td>
                    <td className="py-2 px-3 text-stone-700">Mane Attraction Salon, 865 28th St SE, Grand Rapids, MI</td>
                    <td className="py-2 px-3 text-stone-500">Salon Address &amp; Suite Registry</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-stone-800">Business Hours</td>
                    <td className="py-2 px-3 text-stone-700">Tue-Fri: 9am-6pm · Sat: 8am-4pm · Sun-Mon: Closed</td>
                    <td className="py-2 px-3 text-stone-500">StyleSeat Appointment Availability Grid</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-stone-800">Booking Terms</td>
                    <td className="py-2 px-3 text-stone-700 font-semibold">$0 Deposit (Pay full service balance at salon)</td>
                    <td className="py-2 px-3 text-stone-500">Direct Email Confirmation Model</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Services & Pricing Catalog */}
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              2. Complete Service &amp; Pricing Menu ({SERVICES_CATALOG.length} Items Captured)
            </h3>
            <p className="text-stone-600 text-[11px]">
              Every service includes exact original base price, duration, category, and client preparation rules without omission:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {SERVICES_CATALOG.map((svc) => (
                <div key={svc.id} className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-medium text-stone-900">{svc.name}</p>
                    <p className="text-[11px] text-stone-500">{svc.durationMinutes} mins · Pay at Salon</p>
                  </div>
                  <span className="font-editorial text-sm font-bold text-stone-900 tabular-nums">
                    ${svc.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Strategic Migration Benefits */}
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              3. Strategic Advantages of Independent Platform vs. StyleSeat
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXTRACTION_AUDIT_REPORT.independentMigrationBenefits.map((benefit, i) => (
                <div key={i} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs">
                  <span className="font-semibold text-amber-950">✓ {benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Owner Action Checklist */}
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              4. Business Owner Approval &amp; Integration Checklist
            </h3>
            <div className="space-y-2">
              {EXTRACTION_AUDIT_REPORT.ownerActionChecklist.map((item, i) => (
                <div key={i} className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-stone-800">{item.item}</span>
                  <span className="text-[11px] font-mono text-stone-500 shrink-0 bg-white px-2 py-0.5 rounded border border-stone-200">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded transition-colors"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}
