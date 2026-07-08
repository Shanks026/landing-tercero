import { Reveal } from "../lib/Reveal";
import todoTask from "../assets/TodoTask.png";
import inProgressTask from "../assets/InProgressTask.png";
import completedTask from "../assets/CompletedTask.png";

const checks = [
  "Role-based permissions — finance, proposals, and task assignment gated by role",
  "Internal approval workflow — members submit, owners or admins approve or request changes",
  "Tasks assigned to teammates, tracked by status and due date",
  "Notion-style notes — public to the team, or kept private to you",
  "In-app notifications & comments keep everyone in the loop",
];

const taskImages = [todoTask, inProgressTask, completedTask];

export function TeamDive() {
  return (
    <section className="py-[60px] max-sm:py-10">
      <div className="h-px bg-border" />
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5 pt-12">
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-24 max-md:gap-10 items-start">
          <Reveal className="md:order-2">
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
              Assign work by role, route drafts through internal approval
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

          <Reveal delay={0.16} className="md:order-1">
            <div className="flex flex-col items-center max-w-[380px] mx-auto md:mx-0">
              {taskImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Task card"
                  className={`w-full h-auto shadow-xl rounded-lg ${i > 0 ? "-mt-14" : ""} ${
                    i % 2 === 0 ? "-translate-x-4" : "translate-x-4"
                  }`}
                  style={{ zIndex: i + 1 }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
