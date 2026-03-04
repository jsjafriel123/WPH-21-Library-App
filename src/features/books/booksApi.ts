import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { SearchBooksResponse } from "@/types/books";
export interface Author {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
}

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
  author: Author;
  category: Category;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RecommendedBooksResponse {
  mode: string;
  books: Book[];
  pagination: Pagination;
}

export const getRecommendedBooks = async (
  by = "rating",
  categoryId?: number,
  page = 1,
  limit = 8,
): Promise<RecommendedBooksResponse> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: RecommendedBooksResponse;
  }>("/api/books/recommend", {
    params: { by, categoryId, page, limit },
  });

  return response.data.data;
};

export interface Review {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: User;
}

// export interface BookDetailResponse {
//   books: Book;
//   reviews: Review[];
// }

export interface BookDetail extends Book {
  reviews: Review[];
}
// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
// }
export const getBookDetail = async (id: number): Promise<BookDetail> => {
  const response = await api.get<ApiResponse<BookDetail>>(`/api/books/${id}`);

  return response.data.data;
};

export interface BooksResponse {
  books: Book[];
  pagination: Pagination;
}
export const getBooks = async (
  categoryId?: number,
  page = 1,
  limit = 12,
): Promise<BooksResponse> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: BooksResponse;
  }>("/api/books", {
    params: { categoryId, page, limit },
  });

  return response.data.data;
};

export interface PopularAuthors extends Author {
  bio: string;
  bookCount: number;
  accumulatedScore: number;
}
export interface PopularAuthorsResponse {
  authors: PopularAuthors[];
}
export const getPopularAuthors = async (
  limit = 10,
): Promise<PopularAuthorsResponse> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: PopularAuthorsResponse;
  }>("/api/authors/popular", {
    params: { limit },
  });

  return response.data.data;
};

export const searchBooks = async (
  q?: string | null,
  categoryId?: string | null,
  minRating?: string | null,
  page = 1,
  limit = 12,
): Promise<SearchBooksResponse> => {
  const response = await api.get<ApiResponse<SearchBooksResponse>>(
    "/api/books",
    {
      params: {
        q,
        categoryId,
        minRating,
        page,
        limit,
      },
    },
  );

  return response.data.data;
};

export interface BookCategoriesResponse {
  categories: Category[];
}
export const getBookCategories = async (): Promise<BookCategoriesResponse> => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: BookCategoriesResponse;
  }>("/api/categories");

  return response.data.data;
};
