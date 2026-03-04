export interface Book {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
  };
  category: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchBooksResponse {
  books: Book[];
  pagination: Pagination;
}
