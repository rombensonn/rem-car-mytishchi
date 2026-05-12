import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { issueOptions } from '../data/services';
import { leadSchema, type LeadFormValues } from '../lib/validation';

type LeadFormProps = {
  compact?: boolean;
  source?: string;
  defaultIssue?: string;
};

const defaultValues: LeadFormValues = {
  name: '',
  phone: '',
  car_model: '',
  car_year: '',
  issue_type: 'другое',
  message: '',
  contact_method: 'звонок',
  page_source: 'landing',
  consent_personal_data: false,
  consent_policy: false,
  honeypot: ''
};

export function LeadForm({ compact = false, source = 'landing', defaultIssue }: LeadFormProps) {
  const documentBasePath = import.meta.env.BASE_URL;
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      ...defaultValues,
      page_source: source,
      issue_type: (defaultIssue || defaultValues.issue_type) as LeadFormValues['issue_type']
    }
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus('idle');
    setServerMessage('');
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, typeof value === 'boolean' ? (value ? '1' : '') : String(value ?? ''));
    });

    try {
      const response = await fetch('/api/lead.php', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      const data = (await response.json()) as { success: boolean; error?: string; message?: string };
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Не удалось отправить заявку. Попробуйте позвонить.');
      }
      setStatus('success');
      setServerMessage(data.message || 'Заявка отправлена. Мы свяжемся с вами в рабочее время.');
      reset({ ...defaultValues, page_source: source });
    } catch (error) {
      setStatus('error');
      setServerMessage(error instanceof Error ? error.message : 'Не удалось отправить заявку. Попробуйте позвонить.');
    }
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register('honeypot')} aria-hidden="true" />
      <input type="hidden" value={source} {...register('page_source')} />

      <div className={compact ? 'grid gap-4' : 'grid gap-4 md:grid-cols-2'}>
        <Field label="Что случилось с автомобилем?" error={errors.issue_type?.message}>
          <select className="field" {...register('issue_type')}>
            {issueOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Марка и модель авто" error={errors.car_model?.message}>
          <input className="field" placeholder="Например, Kia Rio" autoComplete="off" {...register('car_model')} />
        </Field>
        {!compact && (
          <Field label="Год выпуска" error={errors.car_year?.message}>
            <input className="field" inputMode="numeric" placeholder="Например, 2018" {...register('car_year')} />
          </Field>
        )}
        <Field label="Имя" error={errors.name?.message}>
          <input className="field" placeholder="Как к вам обращаться" autoComplete="name" {...register('name')} />
        </Field>
        <Field label="Телефон" error={errors.phone?.message}>
          <input className="field" type="tel" placeholder="+7" autoComplete="tel" {...register('phone')} />
        </Field>
        <Field label="Удобный способ связи" error={errors.contact_method?.message}>
          <select className="field" {...register('contact_method')}>
            <option value="звонок">звонок</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Telegram">Telegram</option>
          </select>
        </Field>
      </div>

      <Field label="Что беспокоит?" error={errors.message?.message}>
        <textarea className="field min-h-28 resize-y" placeholder="Опишите симптомы, когда появились, что уже проверяли" {...register('message')} />
      </Field>

      <div className="grid gap-3 rounded-xl border border-line bg-porcelain p-4">
        <Checkbox
          error={errors.consent_personal_data?.message}
          label={
            <>
              Даю{' '}
              <a className="text-brand-700 underline underline-offset-4 hover:text-brand-900" href={`${documentBasePath}consent.html`}>
                согласие на обработку персональных данных
              </a>{' '}
              для обработки моей заявки и обратной связи.
            </>
          }
          {...register('consent_personal_data')}
        />
        <Checkbox
          error={errors.consent_policy?.message}
          label={
            <>
              Подтверждаю, что ознакомлен(а) с{' '}
              <a className="text-brand-700 underline underline-offset-4 hover:text-brand-900" href={`${documentBasePath}privacy.html`}>
                Политикой обработки персональных данных
              </a>
              .
            </>
          }
          {...register('consent_policy')}
        />
      </div>

      {status !== 'idle' && (
        <div className={`flex items-start gap-3 rounded-xl p-4 text-sm font-bold ${status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`} role="status" aria-live="polite">
          {status === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          {serverMessage}
        </div>
      )}

      <button className="btn-primary w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-extrabold text-ink">
      {label}
      {children}
      {error && <span className="text-sm font-bold text-red-700">{error}</span>}
    </label>
  );
}

const Checkbox = ({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; error?: string }) => (
  <label className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm font-bold leading-6 text-graphite">
    <input className="mt-1 h-5 w-5 rounded border-line text-brand-700" type="checkbox" {...props} />
    <span>{label}</span>
    {error && <span className="col-start-2 text-sm font-bold text-red-700">{error}</span>}
  </label>
);
