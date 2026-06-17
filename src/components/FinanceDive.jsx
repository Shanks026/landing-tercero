import { Reveal } from "../lib/Reveal";

const checks = [
  "Invoices with line items, auto-numbered per year",
  "Status flow: Draft → Sent → Overdue → Paid",
  "Mark as Paid → income entry created automatically",
  "Recurring templates for retainer clients",
  "Revenue vs. expenses chart, net profit at a glance",
];

const kpis = [
  {
    label: "NET PROFIT (CASH)",
    val: "₹1.84L",
    sub: "0.0% margin",
    color: "#22c55e",
    icon: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
  {
    label: "CASH INFLOW (MO)",
    val: "₹2.4L",
    sub: "Received this month",
    color: "#888",
    icon: "M23 6l-9.5 9.5-5-5L1 18",
  },
  {
    label: "EXPENSES (MO)",
    val: "₹56k",
    sub: "Subscriptions + One-offs",
    color: "#f87171",
    icon: "M23 18l-9.5-9.5-5 5L1 6",
  },
  {
    label: "PENDING INVOICES",
    val: "₹48k",
    sub: "Unpaid invoices",
    color: "#f59e0b",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    amber: true,
  },
];

function FinanceMockup() {
  return (
    <div className="flex flex-col gap-[10px] font-sans">
      <div className="flex items-center justify-between mb-0.5">
        <div className="text-base font-bold text-foreground tracking-[-0.02em]">
          Performance Metrics
        </div>
        <div className="flex border border-border rounded-lg overflow-hidden">
          {["Cash", "Accrual"].map((t, i) => (
            <div
              key={i}
              className={`text-[11px] font-medium px-3 py-[5px] cursor-pointer ${i === 0 ? "bg-muted text-foreground border-r border-border" : "bg-background text-muted-foreground/60"}`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {kpis.map((k, i) => (
          <div
            key={i}
            className={`border rounded-[10px] px-4 py-[14px] ${k.amber ? "border-amber-200 bg-amber-50" : "border-border bg-background"}`}
          >
            <div className="flex items-start justify-between mb-[10px]">
              <div
                className={`text-[9px] font-bold tracking-[0.07em] uppercase leading-[1.4] ${k.amber ? "text-amber-600" : "text-muted-foreground/50"}`}
              >
                {k.label}
              </div>
              <div
                className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center shrink-0 ${k.amber ? "bg-amber-100" : "bg-muted"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke={k.color}
                  fill="none"
                  style={{ width: 11, height: 11 }}
                >
                  <path d={k.icon} />
                </svg>
              </div>
            </div>
            <div
              className={`text-[22px] font-bold tracking-[-0.03em] leading-none mb-1 ${k.amber ? "text-amber-600" : i === 0 ? "text-green-500" : "text-foreground"}`}
            >
              {k.val}
            </div>
            <div
              className={`text-[10px] ${k.amber ? "text-amber-600" : "text-muted-foreground/50"}`}
            >
              {k.sub}
            </div>
          </div>
        ))}
      </div>

      <div className="border border-border rounded-xl p-4 bg-background">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-[13px] font-semibold text-foreground">
              Profitability Trend
            </div>
            <div className="text-[11px] text-muted-foreground/50 mt-0.5">
              Cash Collected vs Expenses (Last 3 Months)
            </div>
          </div>
          <div className="flex gap-1">
            {["3M", "6M", "12M"].map((t, i) => (
              <div
                key={i}
                className={`text-[10px] font-semibold px-2 py-[3px] rounded-[5px] cursor-pointer ${i === 0 ? "bg-muted text-foreground" : "text-muted-foreground/40"}`}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <svg
          viewBox="0 0 400 90"
          style={{ width: "100%", height: 90, overflow: "visible" }}
        >
          {[0, 25, 50, 75].map((y, i) => (
            <g key={i}>
              <line
                x1="40"
                y1={y + 5}
                x2="390"
                y2={y + 5}
                stroke="hsl(0 0% 96.1%)"
                strokeWidth="1"
              />
              <text
                x="34"
                y={y + 9}
                fontSize="7"
                fill="hsl(0 0% 70%)"
                textAnchor="end"
              >
                ₹{(3 - i) * 1}k
              </text>
            </g>
          ))}
          {[
            { x: 105, l: "Apr" },
            { x: 215, l: "May" },
            { x: 325, l: "Jun" },
          ].map((m, i) => (
            <text
              key={i}
              x={m.x}
              y="88"
              fontSize="8"
              fill="hsl(0 0% 65%)"
              textAnchor="middle"
            >
              {m.l}
            </text>
          ))}
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points="60,72 200,42 340,22 340,80 60,80"
            fill="url(#revGrad)"
          />
          <polygon
            points="60,68 200,58 340,52 340,80 60,80"
            fill="url(#expGrad)"
          />
          <polyline
            points="60,72 200,42 340,22"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="60,68 200,58 340,52"
            fill="none"
            stroke="#f87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[
            [60, 72],
            [200, 42],
            [340, 22],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#22c55e"
              stroke="white"
              strokeWidth="1.5"
            />
          ))}
          {[
            [60, 68],
            [200, 58],
            [340, 52],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill="#f87171"
              stroke="white"
              strokeWidth="1.5"
            />
          ))}
        </svg>
        <div className="flex gap-4 mt-1 justify-center">
          {[
            { c: "#22c55e", l: "Revenue" },
            { c: "#f87171", l: "Expenses" },
          ].map((lg, i) => (
            <div
              key={i}
              className="flex items-center gap-[5px] text-[10px] text-muted-foreground"
            >
              <div
                className="w-[10px] h-[3px] rounded-full"
                style={{ background: lg.c }}
              />
              {lg.l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FinanceDive() {
  return (
    <section className="py-[60px] max-sm:py-10">
      <div className="h-px bg-border" />
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5 pt-12">
        <div
          className="grid grid-cols-2 max-md:grid-cols-1 gap-24 max-md:gap-10 items-start"
          style={{ direction: "rtl" }}
        >
          <Reveal style={{ direction: "ltr" }}>
            <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">
              Finance
            </span>
            <h2 className="font-display text-[clamp(28px,3.5vw,46px)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
              Invoice, track, and know
              <br />
              your profit —{" "}
              <em className="not-italic text-muted-foreground/60">
                per client.
              </em>
            </h2>
            <p className="text-base text-muted-foreground leading-[1.7] font-normal max-w-[500px]">
              Your finances live alongside your client work. Create an invoice,
              mark it paid, and the ledger updates itself.
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

          <Reveal delay={0.16} style={{ direction: "ltr" }}>
            <FinanceMockup />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
