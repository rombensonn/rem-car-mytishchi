import { Camera, CheckCircle2, ClipboardList, FileCheck2, MessageCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const fixBefore = [
  ['Что нужно сделать', 'Фиксируем предполагаемый список работ после осмотра.'],
  ['Сколько это может стоить', 'Даём ориентир по работам и отдельно обсуждаем запчасти.'],
  ['Что согласовывается отдельно', 'Дополнительные работы не должны появляться без разговора с клиентом.']
];

const steps = [
  ['Описываете проблему', MessageCircle],
  ['Мастер проводит осмотр', Search],
  ['Вам называют ориентир по работам', ClipboardList],
  ['Всё дополнительное согласовывается отдельно', FileCheck2]
] as const;

const promises = [
  'Предварительная смета',
  'Согласование дополнительных работ',
  'Фото/видео по запросу',
  'Понятное описание работ',
  'Запись в удобное время'
];

export function TransparentRepair() {
  return (
    <section className="section bg-ink text-white">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-amber-400">Сервис без сюрпризов</div>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Чтобы итоговая цена не стала неожиданностью</h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              Финальная стоимость зависит от состояния автомобиля и запчастей, но дополнительные работы не должны становиться
              неожиданностью — их нужно согласовать до выполнения.
            </p>
            <a className="btn-primary mt-7" href="#quiz">
              Описать проблему
            </a>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-3">
              {fixBefore.map(([title, text]) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <CheckCircle2 className="h-6 w-6 text-amber-400" aria-hidden="true" />
                  <h3 className="mt-4 font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{text}</p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white p-4 text-ink shadow-soft">
              <div className="grid gap-3 sm:grid-cols-2">
                {steps.map(([title, Icon], index) => (
                  <motion.div
                    key={title}
                    className="rounded-xl bg-porcelain p-4"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon className="h-6 w-6 text-brand-700" aria-hidden="true" />
                    <p className="mt-3 font-extrabold">{index + 1}. {title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <div className="flex items-center gap-3">
                <Camera className="h-6 w-6 text-amber-400" aria-hidden="true" />
                <h3 className="text-xl font-extrabold">Без неприятных сюрпризов</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {promises.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-bold text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
