import { useState } from "react";
import { Reveal } from "../lib/Reveal";
import { Badge } from "./ui/badge";

const checks = [
  "Platform previews: Instagram, LinkedIn, X, YouTube",
  "Every revision saved as a new version automatically",
  "Client feedback captured inline — no email thread needed",
  "You see approval or revision request in real time",
  "Full version history: who approved what, and when",
  "Optional internal approval — owner or admin signs off before a client sees it",
];

// Colors/labels mirror the app's POST_STATUS_CONFIG (src/lib/post-statuses.js).
const STATUS = {
  DRAFT: { label: "Draft", dot: "#3b82f6", className: "bg-blue-100 text-blue-700" },
  SUBMITTED: { label: "Submitted", dot: "#f59e0b", className: "bg-amber-100 text-amber-700" },
  CHANGES_REQUESTED: { label: "Changes Requested", dot: "#f43f5e", className: "bg-rose-100 text-rose-700" },
  NEEDS_REVISION: { label: "Needs Revision", dot: "#ec4899", className: "bg-pink-100 text-pink-700" },
  READY: { label: "Ready", dot: "#8b5cf6", className: "bg-violet-100 text-violet-700" },
  PENDING_APPROVAL: { label: "Awaiting Approval", dot: "#f97316", className: "bg-orange-100 text-orange-700" },
  APPROVED: { label: "Approved", dot: "#22c55e", className: "bg-green-100 text-green-700" },
  SCHEDULED: { label: "Scheduled", dot: "#a855f7", className: "bg-purple-100 text-purple-700" },
  PUBLISHED: { label: "Published", dot: "#10b981", className: "bg-emerald-100 text-emerald-700" },
  DELIVERED: { label: "Delivered", dot: "#14b8a6", className: "bg-teal-100 text-teal-700" },
};

const clientFlow = [
  { key: "DRAFT", note: "Post created — caption, platform, media." },
  {
    key: "PENDING_APPROVAL",
    note: "A versioned magic link is sent to the client.",
    branch: {
      key: "NEEDS_REVISION",
      note: "Client leaves a note → a new version is created.",
    },
  },
  {
    key: "APPROVED",
    note: "Client approves. From here it either goes live or is handed off:",
    fork: [
      { caption: "Scheduled to social", pills: ["SCHEDULED", "PUBLISHED"] },
      { caption: "Delivered to the client only", pills: ["DELIVERED"] },
    ],
  },
];

const internalFlow = [
  { key: "DRAFT", note: "A member creates the post." },
  {
    key: "SUBMITTED",
    note: "Sent to the owner / admin review queue.",
    branch: {
      key: "CHANGES_REQUESTED",
      note: "Sent back to the creator to revise & resubmit.",
    },
  },
  {
    key: "READY",
    note: "Approved internally — cleared to send to the client.",
  },
];

function StatusBadge({ status }) {
  const st = STATUS[status];
  return (
    <Badge variant="secondary" className={`gap-1.5 ${st.className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      {st.label}
    </Badge>
  );
}

function StatusFlow({ flow }) {
  return (
    <div>
      {flow.map((node, i) => {
        const last = i === flow.length - 1;
        return (
          <div key={i} className="flex gap-[14px]">
            {/* Rail */}
            <div className="flex flex-col items-center pt-[6px]">
              <span
                className="w-[11px] h-[11px] rounded-full shrink-0"
                style={{ background: STATUS[node.key].dot }}
              />
              {!last && <span className="w-px flex-1 bg-border my-1" />}
            </div>

            {/* Content */}
            <div className={last ? "" : "pb-5 flex-1"}>
              <StatusBadge status={node.key} />
              <div className="text-xs text-muted-foreground mt-[6px] leading-[1.5]">
                {node.note}
              </div>

              {node.branch && (
                <div className="mt-3 ml-1 pl-4 border-l border-dashed border-border">
                  <StatusBadge status={node.branch.key} />
                  <div className="text-xs text-muted-foreground mt-[6px] leading-[1.5]">
                    {node.branch.note}
                  </div>
                  <div className="flex items-center gap-[6px] text-[11px] font-medium text-muted-foreground mt-2">
                    <svg
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      style={{ width: 12, height: 12 }}
                    >
                      <polyline points="1 4 1 10 7 10" />
                      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    loops back to revise
                  </div>
                </div>
              )}

              {node.fork && (
                <div className="mt-3 flex flex-col gap-3">
                  {node.fork.map((f, fi) => (
                    <div
                      key={fi}
                      className="pl-4 border-l border-dashed border-border"
                    >
                      <div className="flex items-center gap-[6px] flex-wrap">
                        {f.pills.map((p, pi) => (
                          <span key={pi} className="flex items-center gap-[6px]">
                            {pi > 0 && (
                              <svg
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                className="text-muted-foreground shrink-0"
                                style={{ width: 12, height: 12 }}
                              >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            )}
                            <StatusBadge status={p} />
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-[6px]">
                        {f.caption}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ApprovalDive() {
  const [tab, setTab] = useState("client");
  const flow = tab === "client" ? clientFlow : internalFlow;

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
              <em className="not-italic text-muted-foreground">
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
              <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-4">
                <div className="text-[13px] font-medium text-foreground tracking-[-0.01em]">
                  {tab === "client"
                    ? "Content approval flow"
                    : "Internal approval flow"}
                </div>
                <div className="inline-flex bg-muted rounded-lg p-[3px] shrink-0">
                  {[
                    { key: "client", label: "Client" },
                    { key: "internal", label: "Internal" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)}
                      className={`text-[12px] font-medium px-3 py-[5px] rounded-[7px] transition-colors ${
                        tab === t.key
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-6 py-6">
                <StatusFlow flow={flow} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
