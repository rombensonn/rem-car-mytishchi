import { ReceiptText } from 'lucide-react';

const prices = [
  ['Компьютерная диагностика', 'от 1200 ₽'],
  ['Замена масла', 'от 700-1200 ₽ с фильтрами'],
  ['Диагностика ходовой', '800 ₽'],
  ['Замена тормозных колодок (передние)', 'от 700 ₽'],
  ['Замена тормозных колодок (задние)', 'от 800 ₽'],
  ['Замена тормозных колодок (электронные)', '1200 ₽'],
  ['Заправка кондиционера', '3000 ₽']
];

export function PriceGuide() {
  return (
    <section id="prices" className="section bg-white/70">
      <div className="container-page">
        <div className="eyebrow">
          <ReceiptText className="h-4 w-4" aria-hidden="true" />
          Ориентиры по цене
        </div>
        <h2 className="section-title">Точная стоимость зависит от автомобиля, состояния узла и запчастей</h2>
        <p className="section-lead">Ниже — ориентиры для первичного понимания. Конкретную смету корректно считать после осмотра.</p>

        <div className="mt-9 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {prices.map(([name, price], index) => (
            <div key={name} className={`grid gap-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center ${index !== 0 ? 'border-t border-line' : ''}`}>
              <span className="font-extrabold text-ink">{name}</span>
              <span className="font-extrabold text-brand-700">{price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
