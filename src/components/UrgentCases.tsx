import { AlertTriangle } from 'lucide-react';

const urgent = [
  'машина не заводится',
  'загорелся Check Engine',
  'появились рывки при переключении',
  'педаль тормоза стала мягкой',
  'машина уводит в сторону',
  'слышен металлический стук',
  'двигатель перегревается',
  'появился запах бензина или гари'
];

export function UrgentCases() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="rounded-[1.75rem] border border-amber-500/30 bg-gradient-to-br from-amber-50 to-white p-5 shadow-soft md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-sm font-extrabold text-ink">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                Когда нельзя откладывать
              </div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-ink md:text-5xl">Лучше показать машину мастеру до серьёзной поломки</h2>
              <p className="mt-4 text-lg leading-8 text-graphite">
                Эти симптомы могут быть связаны с безопасностью или дорогими узлами. Осмотр помогает понять риск до того, как
                неисправность станет больше.
              </p>
              <a className="btn-primary mt-7" href="#quiz">
                Показать машину мастеру
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {urgent.map((item) => (
                <div key={item} className="rounded-xl border border-amber-500/25 bg-white p-4 font-extrabold text-ink shadow-card">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
