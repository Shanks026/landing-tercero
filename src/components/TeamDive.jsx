import { Reveal } from "../lib/Reveal";

const checks = [
  "Role-based permissions — finance, proposals, and task assignment gated by role",
  "Internal review step before content ever goes out for client approval",
  "Tasks assigned to teammates, tracked by status and due date",
  "Notion-style notes — public to the team, or kept private to you",
  "Full activity trail: who assigned, approved, or edited what",
];

const statusStyle = {
  "To Do": { bg: "bg-blue-50", text: "text-blue-600", dot: "#3b82f6" },
  "In Progress": { bg: "bg-orange-50", text: "text-orange-600", dot: "#f97316" },
  Completed: { bg: "bg-green-50", text: "text-green-700", dot: "#22c55e" },
};

const priorityStyle = {
  High: { bg: "bg-amber-50", text: "text-amber-700", dot: "#f59e0b" },
  Normal: { bg: "bg-muted", text: "text-muted-foreground", dot: "#9ca3af" },
};

const tasks = [
  {
    status: "In Progress",
    priority: "Normal",
    title: "Q2 retainer check-in",
    desc: "Confirm payment status with the client.",
    assignee: "Jack Sullivan",
    avatarColor: "#a68a64",
    client: "Good Sports Talk",
    clientColor: "#6b8f76",
    tag: null,
    due: "Due 11 Jul",
    done: false,
  },
  {
    status: "Completed",
    priority: "Normal",
    title: "Resize posters",
    desc: "Resize posters to 1080×1080.",
    assignee: "Emily Foster",
    avatarColor: "#7d8a99",
    client: "Northstar Social Co.",
    clientColor: "#7d7a9c",
    tag: "Internal",
    due: "Done 6 Jul",
    done: true,
  },
  {
    status: "To Do",
    priority: "High",
    title: "Client follow-up on attached post",
    desc: "Confirm the product mentioned in this post with the client.",
    assignee: "Hannah Brooks",
    avatarColor: "#9c8398",
    client: "Tuno Corp",
    clientColor: "#b08968",
    tag: null,
    due: "Due 10 Jul",
    done: false,
  },
];

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ name, color, shape = "full" }) {
  return (
    <div
      className={`w-5 h-5 flex items-center justify-center text-[8px] font-bold text-white shrink-0 ${shape === "full" ? "rounded-full" : "rounded-[6px]"}`}
      style={{ background: color }}
    >
      {initials(name)}
    </div>
  );
}

function Pill({ label, style }) {
  return (
    <span
      className={`inline-flex items-center gap-[5px] text-[10px] font-semibold px-[9px] py-[3px] rounded-full whitespace-nowrap ${style.bg} ${style.text}`}
    >
      <span
        className="w-[5px] h-[5px] rounded-full shrink-0"
        style={{ background: style.dot }}
      />
      {label}
    </span>
  );
}

function TaskCard({ t }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-background">
      <div className="flex items-center gap-[6px]">
        <Pill label={t.status} style={statusStyle[t.status]} />
        <Pill label={t.priority} style={priorityStyle[t.priority]} />
      </div>

      <div
        className={`text-[13px] font-bold mt-[10px] tracking-[-0.01em] ${t.done ? "text-muted-foreground line-through" : "text-foreground"}`}
      >
        {t.title}
      </div>
      <div className="text-[12px] text-muted-foreground leading-[1.5] mt-[3px]">
        {t.desc}
      </div>

      <div className="flex items-center gap-[8px] mt-3 pt-3 border-t border-border">
        <span className="text-[10px] text-muted-foreground shrink-0">
          Assigned to
        </span>
        <Avatar name={t.assignee} color={t.avatarColor} />
        <span className="text-[12px] font-medium text-foreground truncate">
          {t.assignee}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mt-[10px]">
        <div className="flex items-center gap-[6px] min-w-0">
          <Avatar name={t.client} color={t.clientColor} shape="square" />
          <span className="text-[12px] font-medium text-foreground truncate">
            {t.client}
          </span>
          {t.tag && (
            <span className="text-[9px] font-semibold text-muted-foreground bg-muted px-[6px] py-[1px] rounded-[4px] shrink-0">
              {t.tag}
            </span>
          )}
        </div>
        <span className="text-[11px] text-muted-foreground shrink-0">
          {t.due}
        </span>
      </div>
    </div>
  );
}

export function TeamDive() {
  return (
    <section className="py-[60px] max-sm:py-10">
      <div className="h-px bg-border" />
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5 pt-12">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-24 max-md:gap-10 items-start">
          <Reveal>
            <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
              Team & internal workflow
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
              Everyone sees
              <br />
              <em className="not-italic text-muted-foreground">
                exactly what they need.
              </em>
            </h2>
            <p className="text-base text-muted-foreground leading-[1.7] font-normal max-w-[500px]">
              Assign work by role, catch mistakes with an internal review
              before a client ever sees them, and keep notes scoped to the
              right audience — your whole team, or just you.
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
                  Team tasks
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Bloom Studio · assigned by role
                </div>
              </div>

              <div className="px-6 py-5 flex flex-col gap-3">
                {tasks.map((t, i) => (
                  <TaskCard key={i} t={t} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
