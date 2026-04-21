// AI-POWERED
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

// ─── Types & Storage ────────────────────────────────────────────────────────

export interface TasteProfile {
  flavors: string[];
  dietary: string[];
  occasion: string;
  completedAt: string;
}

export const TASTE_PROFILE_KEY = "calora_taste_profile";

export function getTasteProfile(): TasteProfile | null {
  try {
    const raw = localStorage.getItem(TASTE_PROFILE_KEY);
    return raw ? (JSON.parse(raw) as TasteProfile) : null;
  } catch {
    return null;
  }
}

// ─── Option Data ─────────────────────────────────────────────────────────────

const FLAVOR_OPTIONS = [
  "Rich & Chocolatey",
  "Fruity & Fresh",
  "Floral & Delicate",
  "Nutty & Earthy",
  "Citrusy & Tart",
  "Creamy & Vanilla",
  "Caramel & Buttery",
  "Spiced & Warm",
];

const DIETARY_OPTIONS = [
  "Vegan",
  "Gluten-Free",
  "Low-Calorie (under 100 cal)",
  "No Sugar Added",
  "Nut-Free",
  "No Preference",
];

const OCCASION_OPTIONS = [
  { label: "Treating myself", emoji: "🍰" },
  { label: "Gifting someone", emoji: "🎁" },
  { label: "Stocking up", emoji: "🛒" },
  { label: "Exploring something new", emoji: "✨" },
];

const STEPS = [
  {
    title: "What flavors do you love?",
    subtitle: "Pick at least 2 — we'll tune every recommendation around your palate.",
  },
  {
    title: "Any preferences we should know?",
    subtitle: "We'll keep these in mind across every visit.",
  },
  {
    title: "What brings you here today?",
    subtitle: "We'll shape your experience around the moment.",
  },
];

// ─── Step animation variants ──────────────────────────────────────────────

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
};

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TasteProfileModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [flavors, setFlavors] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [occasion, setOccasion] = useState("");
  const [completed, setCompleted] = useState(false);

  const reset = () => {
    setStep(0);
    setDir(1);
    setFlavors([]);
    setDietary([]);
    setOccasion("");
    setCompleted(false);
  };

  const handleDismiss = () => {
    if (!completed) {
      toast.info("No worries — you can set your preferences anytime from the shop.");
    }
    onClose();
    setTimeout(reset, 350);
  };

  const goNext = () => { setDir(1); setStep(s => s + 1); };
  const goBack = () => { setDir(-1); setStep(s => s - 1); };

  const toggle = (list: string[], val: string, set: (v: string[]) => void) =>
    set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);

  const handleComplete = () => {
    const profile: TasteProfile = {
      flavors,
      dietary,
      occasion,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem(TASTE_PROFILE_KEY, JSON.stringify(profile));
    setCompleted(true);
    setTimeout(() => { onClose(); setTimeout(reset, 350); }, 1400);
  };

  const canNext = [flavors.length >= 2, dietary.length >= 1, !!occasion];

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && handleDismiss()}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        {/* Panel */}
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[--color-ivory] border border-[--color-border] rounded-[--radius-lg] overflow-hidden focus:outline-none [box-shadow:var(--shadow-lg)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.96] data-[state=closed]:zoom-out-[0.96] data-[state=open]:slide-in-from-top-[4px] data-[state=closed]:slide-out-to-top-[4px] duration-300"
        >
          {/* Progress bar */}
          {!completed && (
            <div className="h-0.5 bg-[--color-bone] w-full">
              <motion.div
                className="h-full bg-[--color-ink]"
                animate={{ width: `${((step + 1) / 3) * 100}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
          )}

          {/* Close */}
          <Dialog.Close
            onClick={handleDismiss}
            className="absolute top-4 right-4 z-10 p-1.5 hover:bg-[--color-bone] transition-colors duration-300 text-[--color-taupe]"
          >
            <X size={16} />
          </Dialog.Close>

          <div className="p-8 min-h-[440px] flex flex-col">
            <AnimatePresence mode="wait" custom={dir}>
              {completed ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center flex-1 gap-5 text-center py-8"
                >
                  <div
                    style={{ fontFamily: "var(--font-serif)" }}
                    className="text-4xl text-[--color-taupe]"
                  >
                    ✦
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-2xl font-light text-[--color-ink]"
                    >
                      You're all set.
                    </h3>
                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[--color-taupe] mt-2 text-sm font-light leading-relaxed max-w-xs mx-auto"
                    >
                      Your picks are saved — we'll personalise everything for you.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex flex-col gap-6 flex-1"
                >
                  {/* Header */}
                  <div>
                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-[11px] text-[--color-taupe] tracking-[0.14em] uppercase mb-1.5"
                    >
                      Step {step + 1} of 3
                    </p>
                    <Dialog.Title
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-2xl font-light text-[--color-ink] leading-snug"
                    >
                      {STEPS[step].title}
                    </Dialog.Title>
                    <p
                      style={{ fontFamily: "var(--font-sans)" }}
                      className="text-sm font-light text-[--color-taupe] mt-1.5"
                    >
                      {STEPS[step].subtitle}
                    </p>
                  </div>

                  {/* Step 1 — Flavors */}
                  {step === 0 && (
                    <div className="flex flex-wrap gap-2">
                      {FLAVOR_OPTIONS.map(f => (
                        <button
                          key={f}
                          onClick={() => toggle(flavors, f, setFlavors)}
                          style={{ fontFamily: "var(--font-sans)" }}
                          className={`px-4 py-2 border text-xs font-medium transition-[background-color,border-color,color] duration-150 flex items-center gap-1.5 uppercase tracking-[0.08em] cursor-pointer active:scale-[0.97] rounded-[--radius-sm] ${
                            flavors.includes(f)
                              ? "bg-[--color-ink] text-[--color-cream] border-[--color-ink]"
                              : "bg-transparent text-[--color-ink] border-[--color-border] hover:border-[--color-ink]"
                          }`}
                        >
                          {flavors.includes(f) && <Check size={11} strokeWidth={3} />}
                          {f}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 2 — Dietary */}
                  {step === 1 && (
                    <div className="flex flex-wrap gap-2">
                      {DIETARY_OPTIONS.map(d => (
                        <button
                          key={d}
                          onClick={() => toggle(dietary, d, setDietary)}
                          style={{ fontFamily: "var(--font-sans)" }}
                          className={`px-4 py-2 border text-xs font-medium transition-[background-color,border-color,color] duration-150 flex items-center gap-1.5 uppercase tracking-[0.08em] cursor-pointer active:scale-[0.97] rounded-[--radius-sm] ${
                            dietary.includes(d)
                              ? "bg-[--color-ink] text-[--color-cream] border-[--color-ink]"
                              : "bg-transparent text-[--color-ink] border-[--color-border] hover:border-[--color-ink]"
                          }`}
                        >
                          {dietary.includes(d) && <Check size={11} strokeWidth={3} />}
                          {d}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Step 3 — Occasion */}
                  {step === 2 && (
                    <div className="flex flex-col gap-2">
                      {OCCASION_OPTIONS.map(o => (
                        <button
                          key={o.label}
                          onClick={() => setOccasion(o.label)}
                          style={{ fontFamily: "var(--font-sans)" }}
                          className={`flex items-center gap-4 px-5 py-4 border text-left transition-[background-color,border-color] duration-150 cursor-pointer active:scale-[0.97] rounded-[--radius-sm] ${
                            occasion === o.label
                              ? "bg-[--color-bone] border-[--color-ink] text-[--color-ink]"
                              : "bg-transparent border-[--color-border] text-[--color-ink] hover:border-[--color-ink]"
                          }`}
                        >
                          <span className="text-xl leading-none">{o.emoji}</span>
                          <span className="text-xs uppercase tracking-[0.08em] font-medium">{o.label}</span>
                          {occasion === o.label && (
                            <Check size={14} className="ml-auto text-[--color-ink]" strokeWidth={2.5} />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[--color-border]">
                    {step > 0 ? (
                      <button
                        onClick={goBack}
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="text-xs text-[--color-taupe] uppercase tracking-[0.1em] hover:text-[--color-ink] transition-colors duration-300"
                      >
                        ← Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 2 ? (
                      <button
                        onClick={goNext}
                        disabled={!canNext[step]}
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.1em] font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[--color-espresso] transition-[background-color] duration-200 cursor-pointer active:scale-[0.97] rounded-[--radius-sm]"
                      >
                        Continue <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={handleComplete}
                        disabled={!canNext[2]}
                        style={{ fontFamily: "var(--font-sans)" }}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-[--color-ink] text-[--color-cream] text-xs uppercase tracking-[0.1em] font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[--color-espresso] transition-[background-color] duration-200 cursor-pointer active:scale-[0.97] rounded-[--radius-sm]"
                      >
                        Save preferences ✦
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
