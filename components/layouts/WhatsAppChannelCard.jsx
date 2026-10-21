import React from "react";
import { ArrowRight } from "lucide-react";

const CHANNEL_URL = "https://whatsapp.com/channel/0029VaBwXM1IyPtJUs87cq2v";

export function WhatsAppChannelCard() {
  return (
    <div className="w-full text-left">
      <a
        href={CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join Prince Defence Academy WhatsApp Channel"
        className="group relative block w-full overflow-hidden rounded-2xl border border-[#b89242]/35 bg-gradient-to-r from-[#0B1B3A] via-[#102A43] to-[#183C66] p-4 sm:p-5 shadow-[0_8px_24px_-8px_rgba(11,27,58,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b89242] hover:shadow-[0_18px_36px_-8px_rgba(11,27,58,0.55),0_0_24px_rgba(37,211,102,0.18)]"
      >
        {/* Ambient background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#25D366]/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[#b89242]/20 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-50"
        />

        {/* Subtle dot pattern on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#25D366_1px,transparent_1px)] [background-size:16px_16px] opacity-0 transition-opacity duration-300 group-hover:opacity-20"
        />

        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* WhatsApp Icon Tile */}
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_6px_16px_-4px_rgba(18,140,126,0.6)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_-3px_rgba(37,211,102,0.6)]">
            <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
          </div>

          {/* Text Content */}
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#86efac]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
              Official Channel
            </div>

            <h2 className="mt-1.5 text-base sm:text-lg font-extrabold text-white tracking-tight">
              Join Prince Defence WhatsApp Channel
            </h2>

            <p className="mt-0.5 text-xs sm:text-[13px] text-white/75 leading-relaxed">
              Results, Exam Notices & Updates — First to Know
            </p>
          </div>

          {/* Action Arrow Button */}
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:border-[#b89242] group-hover:bg-[#b89242] group-hover:text-[#0B1B3A] group-hover:translate-x-1">
            <ArrowRight size={18} />
          </div>
        </div>
      </a>
    </div>
  );
}

const WhatsAppIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.34-1.66a11.88 11.88 0 0 0 5.7 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.42-8.45z" />
  </svg>
);

export default WhatsAppChannelCard;
