import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import dashboard from "../assets/dashboard.png";
import { Button } from "./ui/button";
import { links } from "../lib/links";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export function Hero() {
  return (
    <section className="pt-[100px] max-sm:pt-[76px] pb-0">
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
        <div className="text-center max-w-[660px] mx-auto">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-[7px] text-xs font-medium text-green-800 tracking-[0.02em] bg-green-100 rounded-full px-3 py-[5px] pl-2 mb-5">
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-green-600 shrink-0" />
              14-day free trial · No credit card required
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="font-display text-[clamp(38px,5vw,68px)] font-bold leading-[1.06] tracking-[-0.03em] text-foreground mb-[18px]"
          >
            Run your agency,
            <br />
            <em className="not-italic text-muted-foreground/50">
              not your tabs.
            </em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="text-base text-muted-foreground leading-[1.7] max-w-3xl font-normal mx-auto mb-7"
          >
            Tercero replaces the fragmented stack of Notion, spreadsheets,
            approval emails, and accounting tools. Assign work by role, get
            internal sign-off before clients see a thing, and invoice — all in
            one workspace.
          </motion.p>

          <motion.div
            {...fadeUp(0.24)}
            className="flex items-center justify-center gap-3 flex-wrap max-sm:flex-col max-sm:items-stretch max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto"
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="font-sans tracking-[-0.01em] text-[15px]"
            >
              <a href={links.signup} onClick={() => track('signup_click', { location: 'hero' })}>
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
              size="lg"
              className="font-sans text-[15px] text-muted-foreground hover:text-foreground"
            >
              <a href="#how">See how it works</a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-9 max-sm:mt-7 border border-border rounded-2xl overflow-hidden shadow-[0_2px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)]"
        >
          <img
            src={dashboard}
            alt="Tercero Dashboard"
            className="w-full block rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
