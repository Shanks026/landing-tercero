import { Reveal } from '../lib/Reveal'

const items = [
  { n: '01', title: 'Approvals over WhatsApp', desc: 'Feedback buried in threads. Nothing tracked. Nothing versioned. Changes get lost.' },
  { n: '02', title: 'Briefs in five different places', desc: 'Notion for tasks, Google Docs for briefs, email for feedback, Slack for urgent revisions.' },
  { n: '03', title: 'Invoices in Excel', desc: 'Manual invoice builds, payment tracking in spreadsheets, chasing overdue clients with copy-pasted emails.' },
]

export function Problem() {
  return (
    <section className="py-[60px] pt-[60px]">
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
        <Reveal className="max-w-[520px]">
          <span className="text-xs font-medium text-muted-foreground tracking-[0.06em] uppercase mb-4 block">The problem</span>
          <h2 className="font-['Bricolage_Grotesque'] text-[clamp(28px,3.5vw,46px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-foreground mb-3">
            Too many tools.<br /><em className="not-italic text-muted-foreground/60">Not enough clarity.</em>
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7] font-normal max-w-[500px]">
            Agencies juggle five apps to do one job. Tercero collapses all of it into one structured workspace.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-14 grid grid-cols-3 max-md:grid-cols-1 border border-border rounded-[14px] overflow-hidden">
          {items.map((item, i) => (
            <div
              key={i}
              className={`p-9 max-md:p-8 hover:bg-muted transition-colors ${
                i < 2 ? 'border-r border-border max-md:border-r-0 max-md:border-b' : ''
              }`}
            >
              <div className="font-serif text-[42px] text-muted-foreground/40 leading-none mb-[14px] font-normal">{item.n}</div>
              <div className="font-['Bricolage_Grotesque'] text-[15px] font-bold text-foreground mb-2 tracking-[-0.01em]">{item.title}</div>
              <div className="text-sm text-muted-foreground leading-[1.6] font-normal">{item.desc}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
