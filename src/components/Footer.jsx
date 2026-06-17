import { Logo } from '../lib/Logo'

const cols = [
  { title: 'Product', links: ['Features', 'Pricing', 'Content Approvals', 'Prospects CRM', 'Finance'] },
  { title: 'Company', links: ['About', 'Blog', 'Changelog', 'Contact'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
]

export function Footer() {
  return (
    <footer className="pt-14 pb-9 border-t border-border">
      <div className="max-w-wrap mx-auto px-10 max-sm:px-5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] max-lg:grid-cols-2 max-sm:grid-cols-1 gap-12 max-sm:gap-7 mb-12">
          <div>
            <Logo />
            <p className="text-sm text-muted-foreground leading-[1.65] mt-3 max-w-[240px] font-normal">
              The all-in-one operations platform for social media agencies. From lead to invoice.
            </p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-[0.08em] mb-[14px]">{col.title}</div>
              <ul className="list-none flex flex-col gap-2">
                {col.links.map(l => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground no-underline hover:text-foreground transition-colors font-normal">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-6 flex items-center justify-between">
          <div className="text-xs text-muted-foreground/30">© 2025 Tercero. All rights reserved.</div>
          <div className="text-xs text-muted-foreground/30">Built for agency operators.</div>
        </div>
      </div>
    </footer>
  )
}
