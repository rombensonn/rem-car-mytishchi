import { MapPinned, MessageCircle, Navigation, Phone } from 'lucide-react';
import { business } from '../data/business';
import { LeadForm } from './LeadForm';

export function Contacts() {
  return (
    <section id="contacts" className="section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1fr]">
          <div>
            <div className="eyebrow">
              <MapPinned className="h-4 w-4" aria-hidden="true" />
              Контакты
            </div>
            <h2 className="section-title">{business.name}: автосервис в Мытищах</h2>
            <div className="mt-7 grid gap-4">
              <Info label="Адрес" value={business.address} />
              <Info label="Телефон" value={business.phone} href={business.phoneHref} />
              <Info label="График" value={`${business.hours}, ${business.sunday}`} />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn-primary" href={business.phoneHref}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                Позвонить
              </a>
              <a className="btn-secondary" href={business.whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp
              </a>
              <a className="btn-secondary" href={business.telegramHref} target="_blank" rel="noreferrer">
                Telegram
              </a>
              <a className="btn-secondary" href={business.routeHref} target="_blank" rel="noreferrer">
                <Navigation className="h-5 w-5" aria-hidden="true" />
                Построить маршрут
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <iframe
                title="Карта: Рем Кар, Мытищи, ул. Карла Маркса, 1"
                src={business.mapEmbed}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>
          </div>

          <div className="card p-5 md:p-6">
            <h3 className="text-2xl font-extrabold text-ink">Быстрая заявка</h3>
            <p className="mt-2 leading-7 text-muted">Оставьте контакт, если удобнее начать не со звонка.</p>
            <div className="mt-5">
              <LeadForm compact source="contacts" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="text-sm font-extrabold uppercase tracking-wide text-muted">{label}</span>
      <span className="mt-1 block text-xl font-extrabold text-ink">{value}</span>
    </>
  );

  return href ? (
    <a className="rounded-2xl border border-line bg-white p-5 shadow-card transition hover:border-brand-100" href={href}>
      {content}
    </a>
  ) : (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">{content}</div>
  );
}
