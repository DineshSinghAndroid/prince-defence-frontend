"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import {
  getDailyQuizStats,
  getQuizLeaderboard,
  saveQuizAnswer,
  startQuizAttempt,
  submitQuizAttempt,
} from "@/services/quizService";
import toast from "react-hot-toast";

const getElapsedMs = (startedAt) => Math.max(0, Date.now() - startedAt);

export default function DailyQuizClient() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [attemptId, setAttemptId] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardError, setLeaderboardError] = useState("");
  const [dailyStats, setDailyStats] = useState(null);
  const [dailyStatsError, setDailyStatsError] = useState("");
  const startedAtRef = useRef(0);
  const nameInputRef = useRef(null);
  const currentQuestion = questions[currentIndex] || null;

  const refreshDailyStats = useCallback(async () => {
    try {
      const payload = await getDailyQuizStats();
      setDailyStats(payload);
      setDailyStatsError("");
    } catch (statsError) {
      setDailyStatsError(statsError.message || "Today's quiz activity is temporarily unavailable.");
    }
  }, []);

  const refreshLeaderboard = useCallback(async () => {
    try {
      const payload = await getQuizLeaderboard();
      setLeaderboard(payload.entries || []);
      setLeaderboardError("");
    } catch (error) {
      setLeaderboardError(error.message || "Today's leaderboard is temporarily unavailable.");
    }
  }, []);

  useEffect(() => {
    const refreshPublicQuizData = () => {
      void refreshDailyStats();
      void refreshLeaderboard();
    };
    refreshPublicQuizData();
    const interval = window.setInterval(refreshPublicQuizData, 30_000);
    return () => window.clearInterval(interval);
  }, [refreshDailyStats, refreshLeaderboard]);

  useEffect(() => {
    if (!showNameForm) return;
    const frame = window.requestAnimationFrame(() => nameInputRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [showNameForm]);

  const progressText = useMemo(() => {
    if (!questions.length) return "0 / 0";
    return `${currentIndex + 1} / ${questions.length}`;
  }, [currentIndex, questions.length]);

  const startQuiz = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      toast.error("Please enter a name between 2 and 50 characters.");
      return;
    }
    const normalizedPhoneNumber = phoneNumber.replace(/[\s()-]/g, "").replace(/^\+91/, "");
    if (!/^[6-9]\d{9}$/.test(normalizedPhoneNumber)) {
      toast.error("Enter a valid 10-digit Indian mobile number. +91 prefix is optional.");
      return;
    }

    setLoading(true);
    window.localStorage.setItem("pd_quiz_name", trimmedName);

    try {
      let savedVisitorId = visitorId || window.localStorage.getItem("pd_visitor_id");
      if (!savedVisitorId) {
        savedVisitorId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        window.localStorage.setItem("pd_visitor_id", savedVisitorId);
      }

      const payload = await startQuizAttempt({
        name: trimmedName,
        phoneNumber: normalizedPhoneNumber,
        visitorId: savedVisitorId,
      });
      const savedAnswers = payload.answers || {};
      const quizQuestions = payload.questions || [];
      const firstUnanswered = quizQuestions.findIndex((question) => savedAnswers[question._id] === undefined);

      setVisitorId(payload.visitorId || savedVisitorId);
      setAttemptId(payload.attemptId);
      setName(payload.name || trimmedName);
      setPhoneNumber(normalizedPhoneNumber);
      setQuestions(quizQuestions);
      setAnswers(savedAnswers);
      setCurrentIndex(firstUnanswered < 0 ? 0 : firstUnanswered);
      setStarted(true);
      startedAtRef.current = Date.now();
      toast.success(payload.resumed ? "Your quiz has been resumed." : "Your quiz has started.");
      void refreshDailyStats();
    } catch (startError) {
      toast.error(startError.message || "Could not start the quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (selectedIndex) => {
    if (!currentQuestion || loading) return;
    setLoading(true);
    try {
      await saveQuizAnswer({
        attemptId,
        visitorId: visitorId || window.localStorage.getItem("pd_visitor_id"),
        questionId: currentQuestion._id,
        selected: selectedIndex,
      });
      setAnswers((previous) => ({ ...previous, [currentQuestion._id]: selectedIndex }));
      setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
    } catch (saveError) {
      toast.error(saveError.message || "Your answer could not be saved. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!attemptId || !questions.length || loading) return;
    setLoading(true);
    try {
      const resultPayload = await submitQuizAttempt({
        attemptId,
        visitorId: visitorId || window.localStorage.getItem("pd_visitor_id"),
        timeTakenMs: startedAtRef.current ? getElapsedMs(startedAtRef.current) : 0,
      });
      setResult(resultPayload);
      setStarted(false);
      void refreshDailyStats();
      void refreshLeaderboard();
    } catch (submitError) {
      toast.error(submitError.message || "Quiz submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [attemptId, loading, questions.length, refreshDailyStats, refreshLeaderboard, visitorId]);
  const showNamePrompt = () => {
    setName(window.localStorage.getItem("pd_quiz_name") || "");
    setShowNameForm(true);
  };

  if (!started && !result) {
    return (
      <main className="quiz-page-shell relative isolate overflow-hidden bg-[#f7f8f9] px-4 pb-8 pt-40 sm:px-6 sm:pb-12 sm:pt-44 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#234f3d]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#b89242]/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[2rem] bg-[#102a43] p-6 text-white shadow-[0_24px_70px_rgba(16,42,67,0.18)] sm:p-9 lg:min-h-[520px] lg:p-11">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#3869d0]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#b89242]/15 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f4d27e]">
                <Sparkles size={14} /> Daily practice
              </span>
              <p className="mt-7 text-sm font-semibold text-white/65">PRINCE DEFENCE ACADEMY</p>
              <h1 className="montserrat mt-3 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Today’s Defence Quiz
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Strengthen your preparation with today’s questions across all scheduled categories. Your progress saves as you answer.
              </p>
            </div>

            <div className="relative mt-10 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#f4d27e]"><BookOpenCheck size={19} /></span>
                <div><p className="text-sm font-bold">One daily set</p><p className="mt-0.5 text-xs text-white/60">All today’s questions</p></div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-200"><ShieldCheck size={19} /></span>
                <div><p className="text-sm font-bold">Progress saved</p><p className="mt-0.5 text-xs text-white/60">Resume if you leave</p></div>
              </div>
            </div>
          </section>

          <section className="flex flex-col justify-center rounded-[2rem] border border-[#102a43]/[0.07] bg-white p-6 shadow-[0_18px_55px_rgba(16,42,67,0.08)] sm:p-9 lg:p-10">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#234f3d]/[0.08] text-[#234f3d]"><Target size={25} /></div>
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#234f3d]">Ready when you are</p>
            <h2 className="montserrat mt-2 text-2xl font-extrabold text-[#102a43] sm:text-3xl">Start your daily practice</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">Enter your name to begin. It will be saved with your attempt so you can resume today.</p>

            <section aria-label="Today's quiz subjects and categories" className="mt-6 rounded-2xl border border-[#234f3d]/10 bg-[#f5f8f6] p-4">
              {dailyStatsError && <p role="status" className="mt-3 text-xs text-amber-800">{dailyStatsError}</p>}
              {dailyStats?.categories?.length > 0 && (
                <div className="mt-4 border-t border-[#234f3d]/10 pt-3">
                  <p className="text-xs font-bold text-[#102a43]">Today’s subjects and categories</p>
                  <ul className="mt-2 grid gap-2">
                    {dailyStats.categories.map((item) => (
                      <li key={`${item.category}-${item.subject}`} className="flex items-center justify-between gap-3 text-xs">
                        <span className="min-w-0 truncate text-slate-600">{item.category} · {item.subject}</span>
                        <span className="shrink-0 text-right font-semibold text-[#234f3d]">{item.questionCount} questions</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {!showNameForm ? (
              <button
                type="button"
                onClick={showNamePrompt}
                className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#234f3d] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#234f3d]/20 transition hover:-translate-y-0.5 hover:bg-[#1c4232] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b89242]/35"
              >
                Start Daily Quiz <ArrowRight size={19} />
              </button>
            ) : (
              <form onSubmit={startQuiz} className="mt-7 space-y-4">
                <label htmlFor="quiz-name" className="block text-sm font-bold text-[#102a43]">Your name</label>
                <input
                  id="quiz-name"
                  required
                  minLength={2}
                  maxLength={50}
                  value={name}
                  ref={nameInputRef}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="min-h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-[#102a43] outline-none transition placeholder:text-slate-400 focus:border-[#234f3d] focus:bg-white focus:ring-4 focus:ring-[#234f3d]/10"
                />
                <div>
                  <label htmlFor="quiz-phone-number" className="block text-sm font-bold text-[#102a43]">Mobile number</label>
                  <input
                    id="quiz-phone-number"
                    type="tel"
                    required
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={16}
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    placeholder="10-digit mobile number"
                    aria-describedby="quiz-phone-help"
                    className="mt-2 min-h-13 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-[#102a43] outline-none transition placeholder:text-slate-400 focus:border-[#234f3d] focus:bg-white focus:ring-4 focus:ring-[#234f3d]/10"
                  />
                  <p id="quiz-phone-help" className="mt-1 text-xs text-slate-500">Indian 10-digit mobile number; +91 prefix is optional.</p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#234f3d] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#234f3d]/20 transition hover:-translate-y-0.5 hover:bg-[#1c4232] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b89242]/35 disabled:cursor-wait disabled:opacity-60"
                >
                  {loading ? <><Loader2 size={19} className="animate-spin" /> Starting quiz…</> : <>Continue to Quiz <ArrowRight size={19} /></>}
                </button>
                <button type="button" onClick={() => setShowNameForm(false)} className="w-full rounded-xl px-4 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-[#102a43]">Back</button>
              </form>
            )}

            <div className="mt-7 flex items-start gap-3 rounded-xl bg-[#faf7ef] p-4 text-xs leading-5 text-slate-600">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#9a762f]" />
              <p>One quiz attempt per visitor each day. If you leave before submitting, the attempt stays incomplete and can be resumed today.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (started && currentQuestion) {
    const selectedAnswer = answers[currentQuestion._id];
    const answeredCount = Object.keys(answers).length;

    return (
      <main className="quiz-page-shell relative isolate min-h-[72vh] overflow-hidden bg-[#f7f8f9] px-4 pb-7 pt-40 sm:px-6 sm:pb-10 sm:pt-44 lg:px-8 lg:pt-36">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#b89242]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#234f3d]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <section className="overflow-hidden rounded-3xl border border-[#102a43]/[0.07] bg-white shadow-[0_20px_60px_rgba(16,42,67,0.10)]">
            <header className="bg-[#102a43] px-5 py-5 text-white sm:px-8 sm:py-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f4d27e]">
                      <ShieldCheck size={13} className="shrink-0" /><span className="truncate">{currentQuestion.category || "Daily Quiz"}</span>
                    </span>
                    {currentQuestion.subject && <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[10px] font-semibold text-white/75">{currentQuestion.subject}</span>}
                  </div>
                  <p className="mt-3 text-lg font-bold sm:text-xl">Welcome, {name}</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Question</p>
                  <p className="mt-0.5 text-base font-extrabold">{progressText}</p>
                </div>
              </div>
              <progress aria-label="Quiz progress" max={questions.length} value={Math.min(currentIndex + 1, questions.length)} className="mt-5 h-2 w-full overflow-hidden rounded-full accent-[#b89242]" />
              <div className="mt-2 flex items-center justify-between text-[11px] text-white/60">
                <span>{answeredCount} of {questions.length} answered</span>
                <span>Answers save automatically</span>
              </div>
            </header>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.13em] text-[#234f3d]">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#234f3d]/[0.08]"><ClipboardCheck size={18} /></span>
                Daily question
              </div>

              <h1 className="text-xl font-extrabold leading-snug text-[#102a43] sm:text-2xl lg:text-3xl">
                {currentQuestion.text?.en || currentQuestion.text || "Question text"}
              </h1>
              {currentQuestion.text?.hi && <p className="mt-2 text-sm leading-6 text-slate-500">{currentQuestion.text.hi}</p>}

              <div className="mt-7 grid gap-3">
                {currentQuestion.options.map((option, index) => {
                  const selected = selectedAnswer === index;
                  return (
                    <button
                      key={`${currentQuestion._id}-${index}`}
                      type="button"
                      onClick={() => void handleAnswer(index)}
                      disabled={loading}
                      aria-pressed={selected}
                      className={`group flex min-h-14 w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b89242]/25 sm:px-5 sm:text-base ${selected ? "border-[#b89242] bg-[#fbf7ec] text-[#102a43] shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-[#234f3d]/40 hover:bg-[#f5f8f6]"} ${loading ? "cursor-wait opacity-70" : ""}`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold transition ${selected ? "bg-[#b89242] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-[#234f3d]/10 group-hover:text-[#234f3d]"}`}>
                        {selected ? <Check size={17} /> : String.fromCharCode(65 + index)}
                      </span>
                      <span className="min-w-0 flex-1">{option}</span>
                      {selected && <span className="hidden text-xs font-bold text-[#8a6820] sm:inline">Saved</span>}
                    </button>
                  );
                })}
              </div>

              <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-slate-500">
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#234f3d]" />
                Leaving this page will keep your attempt incomplete. Your saved answers will be available if you resume today.
              </p>

              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
                  disabled={currentIndex === 0 || loading}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={17} /> Previous
                </button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {currentIndex < questions.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}
                      disabled={loading}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#234f3d]/20 px-4 py-3 text-sm font-bold text-[#234f3d] transition hover:bg-[#234f3d]/5 disabled:opacity-50"
                    >
                      Next question <ArrowRight size={17} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void handleSubmit()}
                    disabled={loading}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#234f3d] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#234f3d]/15 transition hover:bg-[#1c4232] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#b89242]/30 disabled:cursor-wait disabled:opacity-60"
                  >
                    {loading ? <><Loader2 size={17} className="animate-spin" /> Saving…</> : <>Complete & Submit <Check size={17} /></>}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (result) {
    return (
      <main className="quiz-page-shell relative isolate min-h-[72vh] overflow-hidden bg-[#f7f8f9] px-4 pb-7 pt-40 sm:px-6 sm:pb-10 sm:pt-44 lg:px-8 lg:pt-36">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#b89242]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-5xl gap-5">
          <section className="overflow-hidden rounded-3xl bg-[#102a43] p-6 text-white shadow-[0_20px_60px_rgba(16,42,67,0.16)] sm:p-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f4d27e]"><Trophy size={14} /> Quiz complete</span>
                <p className="mt-4 text-sm font-semibold text-white/65">Well done, {name}</p>
                <h1 className="montserrat mt-1 text-4xl font-extrabold sm:text-5xl">{result.score}<span className="text-2xl text-white/50 sm:text-3xl"> / {questions.length}</span></h1>
                <p className="mt-2 text-sm text-white/65">Your result has been saved successfully.</p>
              </div>
              <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center self-start rounded-full border-4 border-[#f4d27e]/50 bg-white/10 sm:self-center">
                <span className="text-2xl font-extrabold">{result.percentage}%</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">Accuracy</span>
              </div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><CircleCheck size={18} className="text-emerald-300" /><p className="mt-3 text-2xl font-extrabold">{result.correctCount}</p><p className="mt-0.5 text-xs text-white/60">Correct</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><CircleX size={18} className="text-rose-300" /><p className="mt-3 text-2xl font-extrabold">{result.wrongCount}</p><p className="mt-0.5 text-xs text-white/60">Wrong</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><BookOpenCheck size={18} className="text-[#f4d27e]" /><p className="mt-3 text-2xl font-extrabold">{result.skippedCount}</p><p className="mt-0.5 text-xs text-white/60">Skipped</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4"><Target size={18} className="text-sky-200" /><p className="mt-3 text-2xl font-extrabold">{result.attemptedCount ?? result.correctCount + result.wrongCount}</p><p className="mt-0.5 text-xs text-white/60">Attempted</p></div>
            </div>
            <Link href="/" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#b89242] px-5 py-3 text-sm font-bold text-[#102a43] transition hover:bg-[#d0ae63] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30">Return to Home</Link>
          </section>

          <section className="rounded-3xl border border-[#102a43]/[0.07] bg-white p-5 shadow-[0_15px_45px_rgba(16,42,67,0.06)] sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#234f3d]">Review</p><h2 className="mt-1 text-xl font-extrabold text-[#102a43] sm:text-2xl">Answer explanations</h2></div>
              <ClipboardCheck size={22} className="mt-1 text-[#b89242]" />
            </div>
            <div className="mt-5 grid gap-3">
              {result.review?.map((item, index) => (
                <article key={item.questionId} className={`rounded-2xl border p-4 sm:p-5 ${item.isCorrect ? "border-emerald-200 bg-emerald-50/50" : item.selected === null ? "border-slate-200 bg-slate-50" : "border-rose-200 bg-rose-50/40"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Question {index + 1} · {item.category}</p>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${item.isCorrect ? "bg-emerald-100 text-emerald-800" : item.selected === null ? "bg-slate-200 text-slate-700" : "bg-rose-100 text-rose-800"}`}>
                      {item.isCorrect ? "Correct" : item.selected === null ? "Skipped" : "Incorrect"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold leading-6 text-[#102a43] sm:text-base">{item.questionText}</h3>
                  <p className="mt-2 text-sm text-slate-600">Your answer: <strong>{item.selected === null ? "Skipped" : `${String.fromCharCode(65 + item.selected)}. ${questions[index]?.options?.[item.selected] || ""}`}</strong></p>
                  {!item.isCorrect && <p className="mt-1 text-sm text-[#234f3d]">Correct answer: <strong>{String.fromCharCode(65 + item.correctIndex)}. {questions[index]?.options?.[item.correctIndex] || ""}</strong></p>}
                  {item.explanation && <p className="mt-3 border-t border-black/5 pt-3 text-sm leading-6 text-slate-600">{item.explanation}</p>}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#102a43]/[0.07] bg-white p-5 shadow-[0_15px_45px_rgba(16,42,67,0.06)] sm:p-8">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b89242]/15 text-[#8a6820]"><Trophy size={19} /></span><div><h2 className="font-extrabold text-[#102a43]">Daily leaderboard</h2><p className="text-xs text-slate-500">Today’s top quiz scores</p></div></div>
            <div className="mt-4 divide-y divide-slate-100">
              {leaderboardError ? <p role="status" className="py-5 text-sm text-amber-800">{leaderboardError}</p> : leaderboard.length ? leaderboard.map((person, index) => (
                <div key={`${person.name}-${index}`} className="flex items-center justify-between gap-3 py-3">
                  <span className="flex min-w-0 items-center gap-3 text-sm font-semibold text-[#102a43]"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#102a43]/[0.06] text-xs font-extrabold text-[#234f3d]">{index + 1}</span><span className="truncate">{person.name}</span></span>
                  <span className="shrink-0 text-sm font-extrabold text-[#234f3d]">{person.percentage}%</span>
                </div>
              )) : <p className="py-5 text-sm text-slate-500">Leaderboard is currently empty.</p>}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return null;
}
