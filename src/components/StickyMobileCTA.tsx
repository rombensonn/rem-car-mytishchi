import { MapPinned, Phone, Wrench } from 'lucide-react';
import { business } from '../data/business';

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 py-2 shadow-soft backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a className="grid min-h-12 place-items-center rounded-lg bg-brand-50 text-xs font-extrabold text-brand-700" href={business.phoneHref}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          Позвонить
        </a>
        <a className="grid min-h-12 place-items-center rounded-lg bg-amber-500 text-xs font-extrabold text-ink" href="#quiz">
          <Wrench className="h-4 w-4" aria-hidden="true" />
          Записаться
        </a>
        <a className="grid min-h-12 place-items-center rounded-lg bg-brand-50 text-xs font-extrabold text-brand-700" href={business.routeHref} target="_blank" rel="noreferrer">
          <MapPinned className="h-4 w-4" aria-hidden="true" />
          Маршрут
        </a>
      </div>
    </div>
  );
}
