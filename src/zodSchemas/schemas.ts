import { z } from 'zod';

export const createBookSchema = z.object({
  name: z
    .string()
    .min(1, 'Book Name is required')
    .max(50, 'Max Book Name is 50 chars'),
  description: z
    .string()
    .max(500, "Description can't be longer than 500 characters")
    .optional(),

  authorId: z.number().int().positive(),
  genreId: z.number().int().positive(),
  publisherId: z.number().int().positive(),
});

export type CreateBookBody = z.infer<typeof createBookSchema>;

export const updateBookSchema = z.object({
  name: z
    .string()
    .min(1, 'Book Name is required')
    .max(50, 'Max Book Name is 50 chars'),
  description: z
    .string()
    .max(500, "Description can't be longer than 500 characters")
    .optional(),

  authorId: z.number().int().positive(),
  genreId: z.number().int().positive(),
  publisherId: z.number().int().positive(),
});

export type UpdateBookBody = z.infer<typeof updateBookSchema>;
