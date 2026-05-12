import { Star } from 'lucide-react';
import { business } from '../data/business';
import { reviews } from '../data/reviews';

export function Reviews() {
  return (
    <section id="reviews" className="section bg-brand-900 text-white">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-amber-400">
              <Star className="h-4 w-4 fill-amber-400" aria-hidden="true" />
              Рейтинг {business.rating} на Яндекс Картах
            </div>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">Отзывы без глянцевой витрины</h2>
            <p className="mt-5 text-lg leading-8 text-white/75">
              У сервиса 4,3 на Яндекс Картах и 44 оценки. В отзывах чаще всего отмечают скорость ремонта, работу мастеров и
              помощь с диагностикой. Для новых клиентов мы отдельно выносим на первый план понятную смету и согласование работ
              до ремонта.
            </p>
          </div>
          <div className="grid gap-3">
            {reviews.map((review) => (
              <blockquote key={review} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-lg font-bold leading-8 text-white/90">
                “{review}”
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
