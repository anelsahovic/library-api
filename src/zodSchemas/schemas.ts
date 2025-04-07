import { z } from 'zod';

export const createBookSchema = z.object({
  name: z
    .string()
    .min(1, 'Book name is required')
    .max(50, 'Book name can be max 50 characters'),
  description: z
    .string()
    .max(500, "Description can't be longer than 500 characters")
    .optional(),

  authorId: z
    .number({
      required_error: 'Author ID is required.',
      invalid_type_error: 'Author ID must be a number.',
    })
    .int()
    .min(1, 'Author ID must be at least 1.'),
  genreId: z
    .number({
      required_error: 'Genre ID is required.',
      invalid_type_error: 'Genre ID must be a number.',
    })
    .int()
    .min(1, 'Genre ID must be at least 1.'),
  publisherId: z
    .number({
      required_error: 'Publisher ID is required.',
      invalid_type_error: 'Publisher ID must be a number.',
    })
    .int()
    .min(1, 'Publisher ID must be at least 1.'),
});

export type CreateBookBody = z.infer<typeof createBookSchema>;

export const updateBookSchema = z.object({
  name: z
    .string()
    .min(1, 'Book name is required')
    .max(50, 'Book name can be max 50 characters'),
  description: z
    .string()
    .max(500, "Description can't be longer than 500 characters")
    .optional(),

  authorId: z
    .number({
      required_error: 'Author ID is required.',
      invalid_type_error: 'Author ID must be a number.',
    })
    .int()
    .min(1, 'Author ID must be at least 1.'),
  genreId: z
    .number({
      required_error: 'Genre ID is required.',
      invalid_type_error: 'Genre ID must be a number.',
    })
    .int()
    .min(1, 'Genre ID must be at least 1.'),
  publisherId: z
    .number({
      required_error: 'Publisher ID is required.',
      invalid_type_error: 'Publisher ID must be a number.',
    })
    .int()
    .min(1, 'Publisher ID must be at least 1.'),
});

export type UpdateBookBody = z.infer<typeof updateBookSchema>;

export const createAuthorSchema = z.object({
  name: z
    .string()
    .min(1, 'Author name is required')
    .max(30, 'Author name can be max 30 characters'),
  bio: z
    .string()
    .max(500, "Bio can't be longer than 500 characters")
    .optional(),
});

export type CreateAuthorBody = z.infer<typeof createAuthorSchema>;

export const updateAuthorSchema = z.object({
  name: z
    .string()
    .min(1, 'Author name is required')
    .max(30, 'Author name can be max 30 characters'),
  bio: z
    .string()
    .max(500, "Bio can't be longer than 500 characters")
    .optional(),
});

export type UpdateAuthorBody = z.infer<typeof updateAuthorSchema>;
