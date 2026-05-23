import { z } from 'zod';

const phoneRegex = /^(\+40|0)(7\d{8})$/;

export const orderSchema = z.object({
  customer_name: z.string().min(3, 'Numele trebuie sa aiba cel putin 3 caractere'),
  customer_phone: z
    .string()
    .regex(phoneRegex, 'Format valid: 07XXXXXXXX sau +407XXXXXXXX'),
  customer_county: z.string().min(1, 'Selectati judetul'),
  customer_city: z.string().min(2, 'Introduceti orasul / localitatea'),
  customer_address: z
    .string()
    .min(10, 'Adresa trebuie sa aiba cel putin 10 caractere'),
  quantity: z.number().min(1).max(5),
});

export type OrderFormData = z.infer<typeof orderSchema>;
