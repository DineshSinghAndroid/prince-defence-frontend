import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import examData from "@/data/course.json";
import Toc from "@/components/others/Toc"
import ScrollReveal from "@/components/animations/ScrollReveal";

const SLUG_ALIASES = {
    "nda-application-form-2019": "nda",
    "indian-navy-ssr-eligibility": "navy",
    "indian-army-selection-process": "army",
    "indian-air-force-airmen-eligibility": "AirForce",
    "ssc-selection-process": "ssc",
    "airforce": "AirForce",
    "air-force": "AirForce",
};

function findExamBySlug(rawSlug) {
    if (!rawSlug) return null;
    const normalized = String(rawSlug).toLowerCase();
    const targetSlug = (SLUG_ALIASES[normalized] || rawSlug).toLowerCase();
    return (
        examData.exams?.find(
            (item) => item.slug.toLowerCase() === targetSlug || item.slug.toLowerCase() === normalized
        ) || null
    );
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const exam = findExamBySlug(slug);

    if (!exam) {
        return {
            title: "Course guide not found | Prince Defence Academy Sikar Rajasthan",
        };
    }

    const description =
        exam.contentNote ||
        `Prepare for ${exam.title} at Prince Defence Academy Sikar, the best defence academy in Rajasthan. Structured syllabus, physical training, and expert faculty.`;

    return {
        title: `${exam.title} Coaching in Rajasthan | Preparation Guide | Prince Defence Academy`,
        description,
        alternates: {
            canonical: `/courses/${slug}`,
        },
        openGraph: {
            title: `${exam.title} Coaching in Rajasthan | Prince Defence Academy`,
            description,
            url: `/courses/${slug}`,
            siteName: "Prince Defence Academy",
            locale: "en_IN",
            type: "article",
            images: [
                {
                    url: exam.image || "/images/campusbg-2.webp",
                    width: 1200,
                    height: 630,
                    alt: `${exam.title} Preparation Guide at Prince Defence Academy Sikar Rajasthan`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${exam.title} Coaching in Rajasthan | Prince Defence Academy`,
            description,
            images: [exam.image || "/images/campusbg-2.webp"],
        },
    };
}

// Helper to render inline markdown bold (**bold**)
function renderFormattedText(text) {
    if (!text || typeof text !== "string") return text;

    if (text.includes("**")) {
        const parts = text.split(/(\*{2}.*?\*{2})/g);
        return parts.map((part, idx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return (
                    <strong key={idx} className="font-bold text-slate-900">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            return part;
        });
    }

    return text;
}

// Reusable content block renderer
function ContentBlock({ block }) {
    switch (block.type) {
        case "paragraph":
            if (block.text && /^\s*Note\s*:/i.test(block.text)) {
                const noteText = block.text.replace(/^\s*Note\s*:\s*/i, "");
                return (
                    <div className="my-5 rounded-2xl border-l-4 border-amber-500 bg-amber-50/90 p-4 sm:p-5 shadow-xs">
                        <div className="flex items-start gap-3">
                            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                                !
                            </span>
                            <div>
                                <span className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                                    Important Note
                                </span>
                                <p className="mt-1 text-sm font-semibold leading-relaxed text-amber-950">
                                    {noteText}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <p className="text-[15px] leading-8 text-(--muted)">
                    {renderFormattedText(block.text)}
                </p>
            );

        case "heading":
            return (
                <h3
                    id={block.id}
                    className="mt-8 scroll-mt-28 text-lg sm:text-xl font-bold text-(--navy) flex items-center gap-2.5 pb-2.5 border-b border-slate-100"
                >
                    <span className="h-5 w-1 rounded-full bg-amber-500 shrink-0" />
                    <span>{block.text || block.heading}</span>
                </h3>
            );

        case "list":
            return (
                <ul className="space-y-3 pl-5">
                    {block.items?.map((item, i) => (
                        <li
                            key={i}
                            className="list-disc pl-1 text-[15px] leading-7 text-slate-600 marker:text-amber-500"
                        >
                            {renderFormattedText(typeof item === "string" ? item : item.text)}
                        </li>
                    ))}
                </ul>
            );

        case "note":
            return (
                <div className="my-5 rounded-2xl border-l-4 border-amber-500 bg-amber-50/90 p-4 sm:p-5 shadow-xs">
                    <div className="flex items-start gap-3">
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-white">
                            !
                        </span>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                                Important Note
                            </span>
                            <p className="mt-1 text-sm font-semibold leading-relaxed text-amber-950">
                                {block.text}
                            </p>
                        </div>
                    </div>
                </div>
            );

        case "link":
            return (
                <Link
                    href={block.url || "#"}
                    className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800"
                    target={block.url?.startsWith("http") ? "_blank" : undefined}
                    rel={block.url?.startsWith("http") ? "noreferrer" : undefined}
                >
                    {block.text || block.label || "Read More"}
                </Link>
            );

        case "image":
            return (
                <figure className="space-y-2">
                    <Image
                        src={block.src || block.url}
                        alt={block.alt || ""}
                        width={1200}
                        height={800}
                        sizes="(max-width: 768px) 100vw, 800px"
                        quality={85}
                        className="h-auto w-full rounded-2xl border border-slate-200 object-cover"
                    />
                    {block.caption && (
                        <figcaption className="text-center text-sm text-slate-500">
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case "table":
            return (
                <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
                    {block.title && (
                        <div className="border-b border-slate-200 bg-slate-50/90 px-5 py-3.5">
                            <h4 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                <span className="h-2 w-2 rounded-full bg-amber-500" />
                                {block.title}
                            </h4>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[340px] sm:min-w-[480px] border-collapse text-left text-sm">
                            {Array.isArray(block.headers) && block.headers.length > 0 && (
                                <thead className="bg-[#0b1c33] text-white">
                                    <tr>
                                        {block.headers.map((header, i) => (
                                            <th
                                                key={i}
                                                className="border-b-2 border-amber-500 border-r border-white/15 last:border-r-0 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                            )}

                            <tbody className="divide-y divide-slate-200 bg-white">
                                {(block.rows || block.row)?.map((row, i) => {
                                    const cells = Array.isArray(row)
                                        ? row
                                        : Object.values(row);
                                    return (
                                        <tr
                                            key={i}
                                            className="transition-colors odd:bg-white even:bg-slate-50/70 hover:bg-amber-50/40"
                                        >
                                            {cells.map((cell, j) => (
                                                <td
                                                    key={j}
                                                    className={`border-r border-slate-200 last:border-r-0 px-5 py-3.5 text-sm ${j === 0
                                                            ? "font-semibold text-slate-800"
                                                            : "text-slate-600"
                                                        }`}
                                                >
                                                    {renderFormattedText(cell)}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {(block.note || block.caption) && (
                        <div className="flex items-center gap-1.5 border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-xs text-slate-500 italic">
                            <span className="font-semibold not-italic text-amber-600">
                                Note:
                            </span>
                            <span>{renderFormattedText(block.note || block.caption)}</span>
                        </div>
                    )}
                </div>
            );

        default:
            return null;
    }
}



export default async function Page({ params }) {
    const { slug } = await params;

    const allExam = examData.exams || [];
    const exam = findExamBySlug(slug);

    if (!exam) notFound();

    return (
        <main className="min-h-screen bg-slate-50 text-(--navy)">

            <section className="relative overflow-hidden bg-[#071b32]">
                <div className="relative mx-auto grid max-w-7xl mt-28 items-center gap-8 px-5 py-6 sm:mt-30 md:grid-cols-2 md:mt-24 md:py-10 lg:gap-10 lg:py-12">
                    <ScrollReveal animation="right" delay="50" duration="700">

                        <div>
                            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-(--gold) sm:text-sm">
                                {exam.category || "Defence Exam Guide"}
                            </span>

                            <h1 className="text-3xl font-black montserrat leading-tight text-white sm:text-4xl md:text-5xl">
                                {exam.title}
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-6 inter text-slate-300">
                                {exam.contentNote || examData.description}
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#exam-content"
                                    className="rounded-xl bg-(--gold) px-6 py-3.5 text-sm font-bold text-white transition hover:bg-amber-400"
                                >
                                    Explore Exam Guide →
                                </a>


                            </div>
                        </div>
                    </ScrollReveal>


                    <ScrollReveal animation="left" delay="50" duration="700">

                        {exam.image && (
                            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px]">
                                <Image
                                    src={exam.image}
                                    alt={exam.title}
                                    width={901}
                                    height={901}
                                    loading="eager"
                                    sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, 440px"
                                    quality={85}
                                    className="h-auto w-full rounded-2xl object-contain"
                                />
                            </div>
                        )}

                    </ScrollReveal>
                </div>
            </section>


            <section
                id="exam-content"
                className="mx-auto grid max-w-7xl items-start gap-6 px-5 py-10
  lg:grid-cols-[300px_minmax(0,1fr)_300px]"
            >

                {/* TABLE OF CONTENTS */}

                <Toc sections={exam.sections} />


                {/* EXAM SECTIONS */}


                <div className="min-w-0 space-y-6">
                    {exam.sections?.map((section, i) => (
                        <article
                            key={section.id || i}
                            id={section.id}
                            className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
                        >
                            <ScrollReveal animation="up" delay="0" duration="700">
                                <div className="mb-6 flex items-start gap-4">
                                  

                                    <div>
                                        <h2 className="text-xl font-extrabold montserrat leading-snug sm:text-2xl">
                                            {section.heading}
                                        </h2>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {section.blocks?.map((block, j) => (
                                        <ContentBlock key={j} block={block} />
                                    ))}
                                </div>
                            </ScrollReveal>
                        </article>
                    ))}
                </div>


                {examData.tocEnabled !== false && (
                    <aside className="top-28 self-start rounded-2xl border border-slate-200 bg-(--navy) p-5 shadow-sm lg:sticky">
                        <h2 className="mb-4 flex items-center gap-2 text-base text-white font-extrabold">
                            <span className="h-5 w-1 rounded-full bg-(--gold)" />
                            All Courses
                        </h2>

                        <div className="space-y-1">
                            {allExam.map((course) => (


                                <Link
                                    key={course.slug}
                                    href={`/courses/${course.slug}`}
                                    aria-current={course.slug.toLowerCase() === exam.slug.toLowerCase() ? "page" : undefined}
                                    className={`block rounded-lg px-3 py-2.5 text-sm leading-5 transition
    ${course.slug.toLowerCase() === exam.slug.toLowerCase()
                                            ? "bg-amber-500 font-bold text-slate-950"
                                            : "text-white hover:bg-white/10 hover:text-amber-400"
                                        }`}
                                >
                                    {course.title}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl bg-slate-950 p-4">
                            <p className="text-sm font-bold text-white">
                                Prepare With Confidence
                            </p>
                            <p className="mt-2 text-xs leading-5 text-slate-400">
                                Explore the complete exam guide and understand every topic.
                            </p>
                        </div>
                    </aside>
                )}

            </section>

            <ScrollReveal animation="up" delay="50" duration="700">

                <section className="px-5 pb-10 sm:pb-12">
                    <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-6 text-center sm:px-10 sm:py-7">
                        <p className="text-xs font-bold uppercase tracking-widest text-(--gold)">
                            Prince Defence
                        </p>

                        <h2 className="mt-1.5 text-xl font-black text-white sm:text-2xl">
                            Your Defence Journey Starts Here
                        </h2>

                        <p className="mx-auto mt-1.5 max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 inter text-(--muted)">
                            Stay focused, prepare smartly, and take the next step towards your
                            defence career.
                        </p>

                        <Link
                            href="/courses"
                            className="mt-4 inline-flex rounded-xl bg-(--gold) px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-amber-400"
                        >
                            Explore All Courses →
                        </Link>
                    </div>
                </section>
            </ScrollReveal>
        </main >
    );
}
