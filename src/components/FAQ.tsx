import { ChevronDown } from 'lucide-react';
import { faq } from '../data/faq';

export function FAQ() {
  return (
    <section className="section bg-white/70">
      <div className="container-page">
        <div className="eyebrow">FAQ</div>
        <h2 className="section-title">Короткие ответы перед записью</h2>
        <div className="mt-9 grid gap-3">
          {faq.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-line bg-white p-5 shadow-card">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold text-ink">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-brand-700 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 leading-7 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
