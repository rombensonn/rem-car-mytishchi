import { BadgeCheck, CalendarClock, CarFront, CreditCard, MapPinned, ParkingCircle, Wifi } from 'lucide-react';
import { business, carTypes } from '../data/business';

const reasons = [
  ['Удобно для жителей Мытищ', MapPinned],
  ['Широкий список работ в одном месте', BadgeCheck],
  ['Можно записаться заранее', CalendarClock],
  ['Есть парковка и Wi-Fi', Wifi],
  ['Работаем с разными марками авто', CarFront],
  ['Нормочас от 1000 ₽', CreditCard],
  ['Пн-Сб до 20:00', ParkingCircle]
] as const;

export function WhyChoose() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="eyebrow">Почему выбирают Рем Кар</div>
        <h2 className="section-title">Практичные причины приехать на Карла Маркса, 1</h2>
        <p className="section-lead">{carTypes}</p>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, Icon]) => (
            <article key={title} className="card p-5">
              <Icon className="h-7 w-7 text-brand-700" aria-hidden="true" />
              <h3 className="mt-4 font-extrabold leading-7 text-ink">{title}</h3>
            </article>
          ))}
        </div>
        <p className="mt-6 rounded-2xl border border-line bg-white p-5 font-bold leading-7 text-graphite shadow-card">
          Адрес: {business.address}. График: {business.hours}, {business.sunday.toLowerCase()}.
        </p>
      </div>
    </section>
  );
}
