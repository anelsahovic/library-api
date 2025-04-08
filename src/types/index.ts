// BOOK TYPES
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

export interface ShowBookParams {
  bookId: string;
}

export interface UpdateBookParams {
  bookId: string;
}

export interface DeleteBookParams {
  bookId: string;
}
// AUTHOR TYPES
export interface ShowAuthorParams {
  authorId: string;
}

export interface UpdateAuthorParams {
  authorId: string;
}

export interface DeleteAuthorParams {
  authorId: string;
}

// GENRE TYPES

export interface ShowGenreParams {
  genreId: string;
}
export interface UpdateGenreParams {
  genreId: string;
}

export interface DeleteGenreParams {
  genreId: string;
}
