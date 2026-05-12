import { CalendarCheck, FileText, MapPinned, MessageSquareText, SearchCheck, WalletCards } from 'lucide-react';
import { motion } from 'framer-motion';

const items = [
  ['Осмотр и первичная диагностика', SearchCheck],
  ['Объяснение неисправности простым языком', MessageSquareText],
  ['Ориентир по цене до начала работ', WalletCards],
  ['Согласование дополнительных работ', FileText],
  ['Возможность записаться заранее', CalendarCheck],
  ['Удобное расположение в Мытищах', MapPinned]
] as const;

export function TrustBar() {
  return (
    <section className="section bg-white/70">
      <div className="container-page">
        <div className="eyebrow">Подход к ремонту</div>
        <h2 className="section-title">Сначала понятная картина по машине — потом ремонт</h2>
        <p className="section-lead">
          Когда клиент понимает причину поломки, примерный бюджет и что будет согласовано отдельно, решение о ремонте становится
          спокойнее.
        </p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([title, Icon], index) => (
            <motion.article
              key={title}
              className="card p-5"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.04 }}
            >
              <Icon className="h-7 w-7 text-brand-700" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-extrabold text-ink">{title}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
