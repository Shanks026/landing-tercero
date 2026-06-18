import { Reveal } from "../lib/Reveal";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { Zap, Rocket, Atom } from "lucide-react";
import { links } from "../lib/links";

const plans = [
  {
    tier: "Ignite",
    Icon: Zap,
    accent: "#f59e0b",
    subtitle: "For freelancers & solopreneurs",
    price: "₹1,999",
    per: "/ mo",
    feats: [
      "Up to 5 clients",
      "20 GB storage",
      "Client management & profiles",
      "Content approvals & versioning",
      "Content calendar (month & week)",
      "Campaigns — up to 5",
      "Prospects CRM & follow-ups",
      "Proposals — 5 active",
      "Finance: invoices & ledger",
      "Documents & notes",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    tier: "Velocity",
    Icon: Rocket,
    accent: "#4ade80",
    subtitle: "For boutique agencies",
    price: "₹4,999",
    per: "/ mo",
    feats: [
      "Up to 15 clients",
      "100 GB storage",
      "Everything in Ignite",
      "Unlimited campaigns",
      "Calendar PDF export",
      "Recurring invoices & subscriptions",
      "Accrual accounting toggle",
      "Client report generation",
      "Document collections",
      "Agency logo on portals",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    tier: "Quantum",
    Icon: Atom,
    accent: "#a78bfa",
    subtitle: "For scaling firms & enterprises",
    price: "₹12,999",
    per: "/ mo",
    feats: [
      "Up to 30 clients",
      "300 GB storage",
      "Everything in Velocity",
      "Full whitelabel portals",
      "No Tercero branding anywhere",
      "Unlimited team seats",
      "VIP Concierge support",
    ],
    cta: "Contact Team",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="py-[60px] max-sm:py-10" id="pricing">
      <div className="h-px bg-border" />
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5 pt-12">
        <Reveal className="text-center max-w-[480px] mx-auto mb-3">
          <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
            Simple, honest pricing.
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7] font-normal mx-auto mb-2">
            14-day free trial — full Quantum access, no credit card required.
          </p>
          <p className="text-sm font-medium text-foreground">
            Add-on clients available on all plans · ₹500 / client / month
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-3 max-md:grid-cols-1 gap-4 items-stretch">
          {plans.map((p, i) => (
            <Reveal key={i} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative flex flex-col h-full rounded-2xl p-8 max-sm:p-6 border ${
                  p.featured
                    ? "bg-foreground border-foreground/20"
                    : "bg-background border-border hover:border-foreground/15"
                } transition-colors`}
              >
                {p.featured && (
                  <div className="absolute -top-[11px] left-1/2 -translate-x-1/2 bg-background text-foreground text-[10px] font-semibold px-3 py-[3px] rounded-full whitespace-nowrap tracking-[0.04em]">
                    Recommended
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-[7px] mb-1">
                    <p.Icon size={15} color={p.accent} strokeWidth={2.5} />
                    <span
                      className={`font-display text-[15px] font-bold tracking-[-0.01em] ${p.featured ? "text-primary-foreground" : "text-foreground"}`}
                    >
                      {p.tier}
                    </span>
                  </div>
                  <div
                    className={`text-[13px] font-normal ${p.featured ? "text-primary-foreground/50" : "text-muted-foreground"}`}
                  >
                    {p.subtitle}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-[6px]">
                    <span
                      className={`font-sans text-[40px] leading-none tracking-[-0.03em] font-regular ${p.featured ? "text-primary-foreground" : "text-foreground"}`}
                    >
                      {p.price}
                    </span>
                    <span
                      className={`text-[13px] font-normal ${p.featured ? "text-primary-foreground/50" : "text-muted-foreground"}`}
                    >
                      {p.per}
                    </span>
                  </div>
                </div>

                {/* CTA above features */}
                <a
                  href={p.cta === "Contact Team" ? links.contact : links.signup}
                  onClick={() => p.cta === "Contact Team"
                    ? track('contact_click', { plan: p.tier.toLowerCase() })
                    : track('signup_click', { location: 'pricing', plan: p.tier.toLowerCase() })
                  }
                  className={`w-full py-[11px] rounded-[10px] text-sm font-semibold cursor-pointer font-sans tracking-[-0.01em] transition-all inline-flex items-center justify-center gap-2 mb-6 no-underline ${
                    p.featured
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "bg-foreground text-primary-foreground hover:opacity-85"
                  }`}
                >
                  {p.cta}
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    style={{ width: 14, height: 14 }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>

                {/* Feature list */}
                <ul className="list-none flex flex-col gap-[10px] flex-1">
                  {p.feats.map((f, j) => (
                    <li
                      key={j}
                      className={`flex items-start gap-[9px] text-[13px] font-normal leading-[1.5] ${p.featured ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        fill="none"
                        style={{
                          width: 13,
                          height: 13,
                          flexShrink: 0,
                          marginTop: 2,
                          stroke: p.accent,
                        }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
