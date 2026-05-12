import { ChevronDown, Wrench } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

export function Services() {
  const [expanded, setExpanded] = useState(false);
  const visibleServices = expanded ? services : services.slice(0, 6);

  return (
    <section id="services" className="section">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="eyebrow">
              <Wrench className="h-4 w-4" aria-hidden="true" />
              Что ремонтируем
            </div>
            <h2 className="section-title">Не список на 40 строк, а понятные зоны ремонта</h2>
            <p className="section-lead">
              Выберите направление, если уже примерно понимаете проблему. Если нет — начните с диагностики, она помогает не
              гадать по симптомам.
            </p>
          </div>
          <a className="btn-secondary w-fit" href="#quiz">
            Уточнить стоимость ремонта
          </a>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((service, index) => (
            <motion.article
              key={service.title}
              className="card flex min-h-[280px] flex-col p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ delay: (index % 3) * 0.04 }}
            >
              <h3 className="text-xl font-extrabold text-ink">{service.title}</h3>
              <p className="mt-3 min-h-16 leading-7 text-muted">{service.description}</p>
              <ul className="mt-4 grid gap-2">
                {service.works.map((work) => (
                  <li key={work} className="flex gap-2 text-sm font-semibold leading-6 text-graphite">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                    {work}
                  </li>
                ))}
              </ul>
              <a className="mt-auto pt-5 text-sm font-extrabold text-brand-700 underline-offset-4 hover:underline" href="#quiz">
                Уточнить стоимость
              </a>
            </motion.article>
          ))}
        </div>

        <button
          type="button"
          className="mx-auto mt-6 flex min-h-12 items-center gap-2 rounded-lg border border-line bg-white px-5 font-extrabold text-brand-700 shadow-card transition hover:bg-brand-50 md:hidden"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? 'Свернуть услуги' : 'Показать все услуги'}
          <ChevronDown className={`h-5 w-5 transition ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
