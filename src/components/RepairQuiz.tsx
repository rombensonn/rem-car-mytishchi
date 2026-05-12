import { ClipboardPenLine } from 'lucide-react';
import { useState } from 'react';
import { issueOptions } from '../data/services';
import { LeadForm } from './LeadForm';

export function RepairQuiz() {
  const [selected, setSelected] = useState<string>('стук / скрип / вибрация');

  return (
    <section id="quiz" className="section bg-brand-50/70">
      <div className="container-page grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-start">
        <div>
          <div className="eyebrow">
            <ClipboardPenLine className="h-4 w-4" aria-hidden="true" />
            Квиз-заявка
          </div>
          <h2 className="section-title">Опишите проблему — подскажем, с чего начать</h2>
          <p className="section-lead">
            Не обязательно знать, что сломалось. Достаточно выбрать симптом и коротко описать, когда он проявляется.
          </p>

          <div className="mt-7 grid gap-2">
            {issueOptions.map((item) => (
              <button
                key={item}
                type="button"
                className={`min-h-12 rounded-xl border px-4 text-left font-extrabold transition ${
                  selected === item ? 'border-brand-700 bg-brand-700 text-white shadow-card' : 'border-line bg-white text-ink hover:border-brand-100'
                }`}
                onClick={() => setSelected(item)}
                aria-pressed={selected === item}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5 md:p-6">
          <h3 className="text-2xl font-extrabold text-ink">Заявка на диагностику</h3>
          <p className="mt-2 leading-7 text-muted">После отправки: “Заявка отправлена. Мы свяжемся с вами в рабочее время.”</p>
          <div className="mt-5">
            <LeadForm key={selected} source="quiz" defaultIssue={selected} />
          </div>
        </div>
      </div>
    </section>
  );
}
