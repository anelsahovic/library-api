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

export const createGenreSchema = z.object({
  name: z
    .string()
    .min(1, 'Genre name is required')
    .max(30, 'Genre name can be max 30 characters'),
});

export type CreateGenreBody = z.infer<typeof createGenreSchema>;

export const updateGenreSchema = z.object({
  name: z
    .string()
    .min(1, 'Genre name is required')
    .max(30, 'Genre name can be max 30 characters'),
});

export type UpdateGenreBody = z.infer<typeof updateGenreSchema>;

export const createPublisherSchema = z.object({
  name: z
    .string()
    .min(1, 'Publisher name is required')
    .max(30, 'Publisher name can be max 30 characters'),
});

export type CreatePublisherBody = z.infer<typeof createPublisherSchema>;

export const updatePublisherSchema = z.object({
  name: z
    .string()
    .min(1, 'Publisher name is required')
    .max(30, 'Publisher name can be max 30 characters'),
});

export type UpdatePublisherBody = z.infer<typeof updatePublisherSchema>;

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be 50 characters or less'),

  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be 30 characters or less')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  email: z.string().min(1, 'Email is required').email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be 100 characters or less')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character'
    ),
});

export type RegisterUserBody = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(30, 'Username must be 30 characters or less')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  password: z
    .string()
    .min(1, 'Password is required')
    .max(100, 'Password must be 100 characters or less'),
});

export type LoginUserBody = z.infer<typeof loginUserSchema>;
