import { Reveal } from "../lib/Reveal";

const features = [
  {
    emoji: "🧑‍💼",
    name: "Client Management",
    desc: "Every client in one profile — branding, billing, platforms, and pipeline.",
  },
  {
    emoji: "✅",
    name: "Content Approvals",
    desc: "Magic link reviews. No login for clients. Full version history.",
  },
  {
    emoji: "🛡️",
    name: "Internal Approvals",
    desc: "Route drafts through your team for sign-off before a client ever sees them.",
  },
  {
    emoji: "📅",
    name: "Content Calendar",
    desc: "Visual calendar across all clients and platforms. Month and week views.",
  },
  {
    emoji: "📣",
    name: "Campaigns",
    desc: "Group posts into campaigns with a single review link for the whole initiative.",
  },
  {
    emoji: "🗂️",
    name: "Tasks & Assignments",
    desc: "Assign tasks by role, and track status and due dates across every client.",
  },
  {
    emoji: "🎯",
    name: "Prospects CRM",
    desc: "Built-in lead pipeline from New to Won. One click converts to client.",
  },
  {
    emoji: "📨",
    name: "Proposals",
    desc: "Send proposals clients accept online. Track when they open it.",
  },
  {
    emoji: "💰",
    name: "Finance",
    desc: "Invoice, track expenses, see profit per client — all in one workspace.",
  },
  {
    emoji: "📁",
    name: "Documents",
    desc: "Centralised file storage per client, with meeting scheduling built in.",
  },
  {
    emoji: "📝",
    name: "Notes",
    desc: "Notion-style notes for every client — keep them private or share with the team.",
  },
  {
    emoji: "👥",
    name: "Team & Permissions",
    desc: "Invite teammates, assign roles, and control exactly what each one can see.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-[60px] max-sm:py-10" id="features">
      <div className="h-px bg-border" />
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5 pt-12">
        <Reveal>
          <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
            Everything included
          </span>
          <h2 className="font-['Bricolage_Grotesque'] text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
            One platform.
            <br />
            <em className="not-italic text-muted-foreground/60">
              Every part of your agency.
            </em>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 border-t border-l border-border">
          {features.map((f, i) => (
            <Reveal
              key={i}
              delay={(i % 3) * 0.08}
              className="p-8 max-sm:p-6 border-r border-b border-border hover:bg-muted transition-colors"
            >
              <div className="text-2xl mb-[14px]">{f.emoji}</div>
              <div className="font-['Bricolage_Grotesque'] text-sm font-bold text-foreground mb-[6px] tracking-[-0.01em]">
                {f.name}
              </div>
              <div className="text-[13px] text-muted-foreground leading-[1.55] font-normal">
                {f.desc}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
