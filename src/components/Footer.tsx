import { useEffect, useState } from 'react';
import { business } from '../data/business';

export function Footer() {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    setShowCookie(localStorage.getItem('rem-car-cookie-ok') !== '1');
  }, []);

  const acceptCookie = () => {
    localStorage.setItem('rem-car-cookie-ok', '1');
    setShowCookie(false);
  };

  return (
    <>
      <footer className="border-t border-line bg-ink py-10 text-white">
        <div className="container-page grid gap-8 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="text-2xl font-extrabold">{business.name}</p>
            <p className="mt-2 text-white/70">Автосервис в Мытищах</p>
          </div>
          <div className="grid gap-2 text-sm font-bold text-white/75">
            <span>{business.address}</span>
            <a className="hover:text-white" href={business.phoneHref}>{business.phone}</a>
            <span>{business.hours}; {business.sunday}</span>
          </div>
          <div className="grid gap-2 text-sm font-bold text-white/75">
            <a className="hover:text-white" href="/privacy.html">Политика обработки персональных данных</a>
            <a className="hover:text-white" href="/consent.html">Согласие на обработку персональных данных</a>
            <span>Согласие на использование cookie</span>
          </div>
        </div>
        <div className="container-page mt-8 border-t border-white/10 pt-6 text-sm text-white/55">
          © {new Date().getFullYear()} Рем Кар. Информация на сайте не является публичной офертой. Часть данных с пометкой
          [уточнить у владельца] требует финальной проверки.
        </div>
      </footer>

      {showCookie && (
        <div className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-3xl rounded-2xl border border-line bg-white p-4 shadow-soft md:bottom-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold leading-6 text-graphite">
              Мы используем cookie для работы сайта и аналитики. Продолжая пользоваться сайтом, вы соглашаетесь с использованием cookie.
            </p>
            <button className="btn-primary min-h-11 shrink-0 px-4 py-2 text-sm" type="button" onClick={acceptCookie}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
}
