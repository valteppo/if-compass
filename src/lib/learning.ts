export type Lesson = { explanation: string; reinforcement: string };
export type LearningEntry = { id: string; title: string; module: "cyber" | "vehicle"; learned: string; completedAt: number; kind?: "done" | "planned" };

const lessons: Record<string, Lesson> = {
  leak: { explanation: "A breached password can be tried on other accounts. Replace it everywhere it was reused and sign out old sessions.", reinforcement: "Good decision — you have practised containing a breach before it spreads to other accounts." },
  weak: { explanation: "Unique passwords keep a leak in one account from unlocking the rest. A password manager helps you create and remember them.", reinforcement: "Well done — unique passwords make your other accounts harder to reach." },
  "2fa": { explanation: "Two-factor authentication adds a second check beyond your password. Keep backup codes somewhere safe in case you lose your phone.", reinforcement: "Great progress — you have added another barrier and prepared a way to recover access." },
  ice: { explanation: "Ice reduces grip, even on familiar roads. Check current conditions, allow more time and consider postponing a trip if no safe route is available.", reinforcement: "Thoughtful choice — planning around conditions gives you more time and fewer rushed decisions." },
  night: { explanation: "Darkness limits visibility and fatigue slows reactions. Plan breaks and stop somewhere safe if you feel tired.", reinforcement: "Well done — recognising tiredness and planning breaks is a safer habit." },
  brake: { explanation: "More following distance gives you time to react smoothly. Slow down early rather than relying on sudden braking.", reinforcement: "Good step — anticipating traffic helps make each journey calmer." },
  tires: { explanation: "Tread depth is only one part of tire safety: condition, pressure and the weather matter too. Ask a professional if you are unsure about grip.", reinforcement: "Good decision — checking your tires replaces uncertainty with a clearer picture." },
  service: { explanation: "Regular servicing can catch worn brakes, lights and other issues before they disrupt a journey. Follow the vehicle's service schedule.", reinforcement: "Well done — planning maintenance now helps prevent surprises later." },
};

export function lessonFor(id: string, explanation: string): Lesson {
  return lessons[id] ?? { explanation, reinforcement: "Good decision — you have taken a practical step toward a safer day." };
}

// A completed action replaces an earlier plan for the same insight; repeats are ignored.
export function recordLearning(entries: LearningEntry[], entry: LearningEntry): LearningEntry[] {
  const existing = entries.find((item) => item.id === entry.id);
  if (!existing) return [...entries, entry];
  if ((existing.kind ?? "done") === "planned" && (entry.kind ?? "done") === "done") return entries.map((item) => item.id === entry.id ? entry : item);
  return entries;
}

const reminders: Record<string, string> = {
  leak: "Remind me at 19:00 — I'll change it when I'm home",
  weak: "Remind me tonight",
  "2fa": "Remind me this weekend",
  ice: "Leave 20 min later, after the gritter passes",
  night: "Plan a break on my next night drive",
  brake: "Remind me before my next drive",
  tires: "Remind me on Saturday",
  service: "Remind me next week",
};

export function reminderFor(id: string): string {
  return reminders[id] ?? "Remind me later today";
}

// Illustrative progress points, not a risk assessment or insurance rating.
export function safetyScore(entries: LearningEntry[]): number {
  // Completed decisions earn 8 points; a calm plan to act later earns 3.
  const points = entries.reduce((sum, entry) => sum + ((entry.kind ?? "done") === "done" ? 8 : 3), 0);
  return Math.min(100, 40 + points);
}