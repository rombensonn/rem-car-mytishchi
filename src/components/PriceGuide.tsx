import { ReceiptText } from 'lucide-react';

const prices = [
  ['Нормочас', 'от 1000 ₽'],
  ['Компьютерная диагностика', 'от [уточнить] ₽'],
  ['Замена масла', 'от [уточнить] ₽'],
  ['Диагностика ходовой', 'от [уточнить] ₽'],
  ['Замена тормозных колодок', 'от [уточнить] ₽'],
  ['Ремонт автоэлектрики', 'от [уточнить] ₽'],
  ['Заправка кондиционера', 'от [уточнить] ₽'],
  ['Ремонт двигателя', 'после диагностики'],
  ['Ремонт АКПП/КПП', 'после диагностики']
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
