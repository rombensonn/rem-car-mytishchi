import { z } from 'zod';
import { issueOptions } from '../data/services';

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя минимум из 2 символов'),
  phone: z.string().trim().min(7, 'Укажите телефон'),
  email: z.string().trim().email('Укажите корректный email').or(z.literal('')).optional(),
  car_model: z.string().trim().optional(),
  car_year: z.string().trim().optional(),
  issue_type: z.enum(issueOptions as [string, ...string[]], {
    errorMap: () => ({ message: 'Выберите, что случилось с автомобилем' })
  }),
  selected_service: z.string().trim().optional(),
  message: z.string().trim().min(3, 'Коротко опишите проблему'),
  contact_method: z.enum(['звонок', 'WhatsApp', 'Telegram']),
  page_source: z.string().trim().default('landing'),
  page_url: z.string().trim().optional(),
  form_id: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
  utm_source: z.string().trim().optional(),
  utm_medium: z.string().trim().optional(),
  utm_campaign: z.string().trim().optional(),
  utm_content: z.string().trim().optional(),
  utm_term: z.string().trim().optional(),
  consent_personal_data: z.boolean().refine((value) => value, 'Нужно согласие на обработку персональных данных'),
  consent_policy_read: z.boolean().refine((value) => value, 'Нужно подтвердить ознакомление с политикой'),
  consent_text_version: z.string().trim().optional(),
  consent_timestamp: z.string().trim().optional(),
  honeypot: z.string().max(0, 'Проверка формы не пройдена').optional()
});

export type LeadFormValues = z.infer<typeof leadSchema>;
