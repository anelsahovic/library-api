export interface Book {
  id: number;
  name: string;
  description?: string;
  authorId: number;
  genreId: number;
  publisherId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookBody {
  name: string;
  description?: string;
  authorId: number;
  genreId: number;
  publisherId: number;
}

export interface UpdateBookBody {
  name: string;
  description?: string;
  authorId: number;
  genreId: number;
  publisherId: number;
}

export interface UpdateBookParams {
  bookId: string;
}

export interface DeleteBookParams {
  bookId: string;
}
