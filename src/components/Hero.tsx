import { ArrowRight, CalendarClock, ClipboardCheck, Gauge, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { business, heroFacts } from '../data/business';

const cardRows = [
  ['Проблема', 'Стук, ошибка, тормоза, ТО или другое'],
  ['Автомобиль', 'Марка, модель, год выпуска'],
  ['Первый шаг', 'Осмотр и понятная диагностика'],
  ['До ремонта', 'Ориентир по стоимости и согласование']
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.88fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="eyebrow">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Прозрачный ремонт без сюрпризов в конце
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-normal text-ink md:text-6xl">
            Автосервис в Мытищах с диагностикой и согласованием работ до ремонта
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-graphite md:text-xl">
            Ремонтируем ходовую, двигатель, тормоза, КПП, кондиционеры и выполняем ТО. Перед работой объясняем, что
            нужно сделать, даём ориентир по стоимости и согласовываем дополнительные работы.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {heroFacts.map((fact) => (
              <span key={fact} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-graphite shadow-card">
                {fact}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="btn-primary" href="#quiz">
              Записаться на диагностику
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a className="btn-secondary" href="#prices">
              Узнать ориентир по цене
            </a>
          </div>
        </motion.div>

        <motion.div
          className="card relative overflow-hidden p-5 md:p-6"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] bg-brand-50" aria-hidden="true" />
          <div className="relative">
            <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-wide text-brand-700">Карта обращения</p>
                <h2 className="mt-2 text-2xl font-extrabold text-ink">Сначала картина по машине</h2>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-700 text-white">
                <ClipboardCheck className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {cardRows.map(([label, value], index) => (
                <div key={label} className="rounded-xl border border-line bg-porcelain p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-sm font-black text-brand-700 shadow-card">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{label}</p>
                      <p className="mt-1 font-bold text-ink">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl bg-ink p-4 text-white sm:grid-cols-2">
              <span className="flex items-center gap-2 text-sm font-bold">
                <MapPin className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {business.address}
              </span>
              <span className="flex items-center gap-2 text-sm font-bold">
                <CalendarClock className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {business.hours}
              </span>
              <span className="flex items-center gap-2 text-sm font-bold">
                <Gauge className="h-4 w-4 text-amber-400" aria-hidden="true" />
                Нормочас {business.laborRate}
              </span>
              <a className="flex items-center gap-2 text-sm font-bold underline-offset-4 hover:underline" href={business.phoneHref}>
                <Phone className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {business.phone}
              </a>
            </div>

            <div className="mt-5 rounded-2xl border border-brand-100 bg-brand-50 p-4">
              <p className="flex items-start gap-3 text-sm font-bold leading-6 text-brand-900">
                <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
                Финальная стоимость зависит от автомобиля и запчастей. Смысл диагностики — заранее понять объём работ и не
                превращать ремонт в набор неожиданных доплат.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
