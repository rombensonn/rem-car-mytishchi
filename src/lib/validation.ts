import { z } from 'zod';
import { issueOptions } from '../data/services';

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Укажите имя минимум из 2 символов'),
  phone: z.string().trim().min(7, 'Укажите телефон'),
  car_model: z.string().trim().optional(),
  car_year: z.string().trim().optional(),
  issue_type: z.enum(issueOptions as [string, ...string[]], {
    errorMap: () => ({ message: 'Выберите, что случилось с автомобилем' })
  }),
  message: z.string().trim().min(3, 'Коротко опишите проблему'),
  contact_method: z.enum(['звонок', 'WhatsApp', 'Telegram']),
  page_source: z.string().trim().default('landing'),
  consent_personal_data: z.boolean().refine((value) => value, 'Нужно согласие на обработку персональных данных'),
  consent_policy: z.boolean().refine((value) => value, 'Нужно подтвердить ознакомление с политикой'),
  honeypot: z.string().max(0, 'Проверка формы не пройдена').optional()
});

export type LeadFormValues = z.infer<typeof leadSchema>;
