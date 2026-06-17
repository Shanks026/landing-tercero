import { Reveal } from "../lib/Reveal";
import { Button } from "./ui/button";
import { links } from "../lib/links";

export function FinalCTA() {
  return (
    <section className="py-20 text-center bg-foreground/[0.04]">
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
        <Reveal>
          <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
            Start today
          </span>
          <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground max-w-[580px] mx-auto mb-4">
            Run your agency.
            <br />
            <em className="not-italic text-muted-foreground/60">
              Not your inbox.
            </em>
          </h2>
          <p className="text-muted-foreground text-base mb-9 font-normal">
            14-day free trial with full Quantum access. No credit card required.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              asChild
              variant="default"
              className="text-base px-5 h-auto py-[9px] font-sans tracking-[-0.01em]"
            >
              <a href={links.signup}>
                Start free trial
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  style={{ width: 15, height: 15 }}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-base px-5 h-auto py-[9px] text-muted-foreground font-sans"
            >
              <a href={links.features}>See all features</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
