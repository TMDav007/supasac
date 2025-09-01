import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const adminStoreSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  merchantPhoneNumber: z.string().min(8).max(12),
  merchantEmail: z.string().email(),
  name: z.string().min(3),
  storePhoneNumber: z.string().min(8).max(12),
  storeEmail: z.string().email(),
  address: z.string().min(5),
  postcode: z.string().min(8).max(9),
  description: z.string(),
});

export const categorySchema = z.object({
  name: z.string().min(3),
  code: z.string().min(3),
});

export const subcategorySchema = z.object({
  name: z.string().min(3),
  category_name: z.string().min(3),
  category_code: z.string().min(3),
  description: z.string(),
});
