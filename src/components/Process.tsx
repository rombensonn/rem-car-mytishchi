import { Car, CheckCheck, ClipboardList, FileCheck2, MapPin, PhoneCall, Search, Wrench } from 'lucide-react';

const route = [
  ['Вы оставляете заявку или звоните', PhoneCall],
  ['Приезжаете в сервис на ул. Карла Маркса, 1', MapPin],
  ['Мастер осматривает автомобиль', Search],
  ['Обсуждаем список работ', ClipboardList],
  ['Согласовываем стоимость и сроки', FileCheck2],
  ['Выполняем ремонт', Wrench],
  ['Проверяем результат', CheckCheck],
  ['Вы забираете автомобиль', Car]
] as const;

export function Process() {
  return (
    <section id="process" className="section">
      <div className="container-page">
        <div className="eyebrow">Сервисная карта ремонта</div>
        <h2 className="section-title">Понятный маршрут от заявки до выдачи авто</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {route.map(([title, Icon], index) => (
            <article key={title} className="card relative p-5">
              <span className="text-sm font-black text-brand-700">0{index + 1}</span>
              <Icon className="mt-4 h-7 w-7 text-amber-500" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-extrabold leading-7 text-ink">{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
