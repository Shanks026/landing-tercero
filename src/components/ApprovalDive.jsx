import { Reveal } from "../lib/Reveal";

const steps = [
  {
    n: "1",
    label: "Draft post",
    desc: "Write caption, select platform, attach media.",
    state: "done",
  },
  {
    n: "2",
    label: "Send for approval",
    desc: "One click generates a versioned review link.",
    state: "done",
  },
  {
    n: "3",
    label: "Client reviews",
    desc: "Opens the link, sees a platform-accurate preview.",
    state: "active",
  },
  {
    n: "4",
    label: "Approve or revise",
    desc: "Approves instantly — or leaves a note and a new version is created.",
    state: "idle",
  },
];

const checks = [
  "Platform previews: Instagram, LinkedIn, X, YouTube",
  "Every revision saved as a new version automatically",
  "Client feedback captured inline — no email thread needed",
  "You see approval or revision request in real time",
  "Full version history: who approved what, and when",
];

export function ApprovalDive() {
  return (
    <section className="py-[60px] max-sm:py-10" id="how">
      <div className="h-px bg-border" />
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5 pt-12">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-24 max-md:gap-10 items-start">
          <Reveal>
            <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
              Content approvals
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
              Clients approve
              <br />
              <em className="not-italic text-muted-foreground/60">
                without an account.
              </em>
            </h2>
            <p className="text-base text-muted-foreground leading-[1.7] font-normal max-w-[500px]">
              Send a versioned magic link. Your client sees the post exactly as
              it'll appear — and clicks Approve or leaves a note. No login. No
              friction.
            </p>
            <ul className="list-none mt-6 flex flex-col gap-[10px]">
              {checks.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-[10px] text-sm text-muted-foreground leading-[1.55] font-normal"
                >
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    fill="none"
                    style={{
                      width: 14,
                      height: 14,
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="border border-border rounded-2xl overflow-hidden shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
              <div className="px-6 py-5 border-b border-border">
                <div className="text-[13px] font-medium text-foreground tracking-[-0.01em]">
                  Content approval flow
                </div>
                <div className="text-xs text-muted-foreground/50 mt-0.5">
                  Bloom Studio · Instagram post · v2
                </div>
              </div>
              <div className="px-6 py-5">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-[14px] py-[14px] ${i < steps.length - 1 ? "border-b border-border" : "pb-0"}`}
                  >
                    <div
                      className={`w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-[1px] text-[11px] font-semibold ${
                        s.state === "done"
                          ? "bg-green-50 text-green-700"
                          : s.state === "active"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground/50"
                      }`}
                    >
                      {s.state === "done" ? (
                        <svg
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          fill="none"
                          style={{ width: 10, height: 10 }}
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        s.n
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-medium text-foreground">
                        {s.label}
                      </div>
                      <div className="text-xs text-muted-foreground/50 mt-0.5 leading-[1.5]">
                        {s.desc}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-[14px] py-[10px] mt-4">
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    fill="none"
                    className="text-muted-foreground/50"
                    style={{ width: 12, height: 12, flexShrink: 0 }}
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span className="text-[11px] text-muted-foreground/60 font-mono flex-1 truncate min-w-0">
                    tercero.co/review/xK92mP8nLq3v
                  </span>
                  <span className="text-[11px] font-medium text-foreground cursor-pointer whitespace-nowrap">
                    Copy link
                  </span>
                </div>

                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-[11px] font-semibold text-muted-foreground/40 uppercase tracking-[0.06em] mb-3">
                    Version history
                  </div>
                  {[
                    {
                      v: "v2",
                      note: "Caption updated per feedback · Approved",
                      current: true,
                    },
                    {
                      v: "v1",
                      note: 'Changes requested: "Make the CTA clearer"',
                      current: false,
                    },
                  ].map((v, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-[10px] mb-[10px]"
                    >
                      <div
                        className={`w-[6px] h-[6px] rounded-full shrink-0 mt-[5px] ${v.current ? "bg-green-600" : "bg-border"}`}
                      />
                      <div>
                        <div className="text-xs font-medium text-foreground">
                          {v.v}
                          {v.current && (
                            <span className="text-[10px] text-green-700 ml-1 font-semibold">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-muted-foreground/50 mt-0.5">
                          {v.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
