import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { business } from '../data/business';

const nav = [
  ['Услуги', '#services'],
  ['Как работаем', '#process'],
  ['Цены', '#prices'],
  ['Отзывы', '#reviews'],
  ['Контакты', '#contacts']
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-porcelain/90 backdrop-blur-xl">
      <div className="container-page flex h-[72px] items-center justify-between py-3">
        <a href="#top" className="flex items-center gap-3" aria-label="Рем Кар, наверх страницы">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-700 text-lg font-black text-white">РК</span>
          <span>
            <span className="block text-lg font-extrabold text-ink">{business.name}</span>
            <span className="block text-xs font-bold uppercase tracking-wide text-muted">автосервис Мытищи</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {nav.map(([label, href]) => (
            <a key={href} className="rounded-lg px-3 py-2 text-sm font-bold text-graphite transition hover:bg-brand-50 hover:text-brand-700" href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-extrabold text-ink hover:bg-brand-50" href={business.phoneHref}>
            <Phone className="h-4 w-4 text-brand-700" aria-hidden="true" />
            {business.phone}
          </a>
          <a className="btn-primary min-h-11 px-4 py-2 text-sm" href="#quiz">
            Записаться
          </a>
        </div>

        <button
          className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white text-ink md:hidden"
          type="button"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container-page grid gap-1 py-4" aria-label="Мобильная навигация">
            {nav.map(([label, href]) => (
              <a key={href} className="rounded-lg px-3 py-3 font-bold text-ink hover:bg-brand-50" href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <a className="btn-primary mt-2" href="#quiz" onClick={() => setOpen(false)}>
              Записаться
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
