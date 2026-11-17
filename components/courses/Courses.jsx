

import examData from "@/data/course.json";
import ScrollReveal from "../animations/ScrollReveal";
import Image from "next/image";
import Link from "next/link";

import {
    ArrowRight,
} from "lucide-react";

const exams = examData.exams;

const Courses = () => {
    return (
        <>
            {exams.map((exam, index) => (
                <ScrollReveal
                    key={exam.slug}
                    animation={
                        index % 2 === 0
                            ? "right"
                            : "left"
                    }
                    delay={Math.min(
                        index * 60,
                        240
                    )}
                    duration={500}
                    className="w-full min-w-0 flex-none"
                >
                    <article className="grid w-full min-w-full basis-full items-center flex-none overflow-hidden rounded-4xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[40%_60%] lg:p-8">

                        {/* Course Image */}
                        <div className="relative mx-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-4xl bg-slate-50 sm:max-w-[400px] lg:mx-0 lg:max-w-none">
                            <Image
                                src={exam.image}
                                alt={exam.title}
                                fill
                                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) 400px, 40vw"
                                quality={75}
                                className="rounded-4xl object-contain"
                                // priority={index === 0}
                            />


                        </div>

                        {/* Course Details */}
                        <div className="flex flex-col justify-center px-6 lg:px-8 xl:px-12 pt-6 md:pt-0">
                           

                            <h3 className="montserrat mt-3 text-xl font-bold leading-tight text-(--navy) sm:text-2xl lg:text-3xl">
                                {exam.title}
                            </h3>

                            <p className="mt-2 font-(--font-montserrat) text-sm font-medium text-(--muted) lg:text-lg">
                                Eligibility &amp;
                                Selection Process
                            </p>

                            <p className="mt-4 max-w-xl text-sm leading-5 text-slate-600 line-clamp-7 text-left md:text-justify sm:text-base lg:text-medium lg:leading-7">
                                {exam.contentNote}
                            </p>

                            <Link
                                href={`/courses/${exam.slug}`}
                                aria-label={`Explore ${exam.title}`}
                                className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-(--gold) px-8 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                            >
                                Learn More
                                <ArrowRight
                                    size={18}
                                />
                            </Link>
                        </div>
                    </article>
                </ScrollReveal>
            ))}
        </>
    );
};

export default Courses;
