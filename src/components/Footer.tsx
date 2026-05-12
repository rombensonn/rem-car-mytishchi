import { useEffect, useState } from 'react';
import { business } from '../data/business';

export function Footer() {
  const documentBasePath = import.meta.env.BASE_URL;
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    setShowCookieNotice(localStorage.getItem('rem-car-cookie-ok') !== '1');
  }, []);

  const acceptCookieNotice = () => {
    localStorage.setItem('rem-car-cookie-ok', '1');
    setShowCookieNotice(false);
  };

  return (
    <>
      <footer className="border-t border-line bg-ink py-10 text-white">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div>
            <p className="text-2xl font-extrabold">{business.name}</p>
            <p className="mt-2 text-white/70">Автосервис в Мытищах</p>
            <p className="mt-4 text-sm font-bold text-white/60">© {new Date().getFullYear()} Рем Кар</p>
          </div>

          <div className="grid gap-2 text-sm font-bold text-white/75">
            <span>{business.address}</span>
            <a className="hover:text-white" href={business.phoneHref}>{business.phone}</a>
            <span>{business.hours}; {business.sunday}</span>
          </div>

          <div className="grid gap-3 text-sm text-white/75">
            <div className="grid gap-1">
              <span className="font-extrabold text-white">[ПОЛНОЕ_НАИМЕНОВАНИЕ_ОПЕРАТОРА]</span>
              <span>ИНН: [ИНН]</span>
              <span>ОГРН/ОГРНИП: [ОГРН_ИЛИ_ОГРНИП]</span>
              <span>Адрес: [АДРЕС_ОПЕРАТОРА]</span>
              <span>Email: [EMAIL_ДЛЯ_ПДН]</span>
            </div>
            <div className="grid gap-2 font-bold">
              <a className="hover:text-white" href={`${documentBasePath}privacy-policy/`}>Политика обработки персональных данных</a>
              <a className="hover:text-white" href={`${documentBasePath}personal-data-consent/`}>Согласие на обработку персональных данных</a>
              <a className="hover:text-white" href={`${documentBasePath}cookies/`}>Политика использования cookie-файлов</a>
            </div>
          </div>
        </div>
        <div className="container-page mt-8 border-t border-white/10 pt-6 text-sm leading-6 text-white/55">
          Информация на сайте носит справочный характер. На сайте нет оплаты, личного кабинета, регистрации, публичной оферты и
          отдельного согласия на рекламные рассылки.
        </div>
      </footer>

      {showCookieNotice && (
        <div className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-3xl rounded-2xl border border-line bg-white p-4 shadow-soft md:bottom-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold leading-6 text-graphite">
              Сайт использует техническое хранилище браузера для сохранения факта показа этого уведомления и может учитывать
              UTM-метки заявки. Продолжая пользоваться сайтом, вы соглашаетесь с такими техническими настройками.
            </p>
            <button className="btn-primary min-h-11 shrink-0 px-4 py-2 text-sm" type="button" onClick={acceptCookieNotice}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </>
  );
}
