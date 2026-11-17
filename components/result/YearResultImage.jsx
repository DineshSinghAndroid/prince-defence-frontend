import Link from "next/link";
import { Image as ImageIcon } from "lucide-react";

const YearResultImage = ({ year, category }) => (
    <Link
        href={`/results/image/${encodeURIComponent(year)}/${category}`}
        aria-label={`View ${category} results image for ${year}`}
        className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-white/90 bg-gradient-to-br from-white via-[#F8FAFC] to-[#F0F3F8] px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-(--navy) shadow-[0_4px_14px_rgba(15,35,65,0.08),0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-(--gold)/70 hover:shadow-[0_8px_20px_rgba(15,35,65,0.14)] active:translate-y-0"
    >
        <span className="flex h-5 w-5 sm:h-5.5 sm:w-5.5 items-center justify-center rounded-full bg-white text-(--gold) shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-(--navy) group-hover:text-(--gold)">
            <ImageIcon size={12} className="sm:w-3.5 sm:h-3.5" aria-hidden="true" />
        </span>
        <span className="font-bold tracking-wide text-(--navy) hidden sm:inline">
            View All Results for {year}
        </span>
        <span className="font-bold tracking-wide text-(--navy) sm:hidden">
            {year} Results
        </span>
    </Link>
);

export default YearResultImage;
