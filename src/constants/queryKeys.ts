// export const QUERY_KEYS = {
//   BOOKS: "books",
//   BOOK_DETAIL: "book-detail",
//   CART: "cart",
//   REVIEWS: "reviews",
// };
export const QUERY_KEYS = {
  BOOKS: (categoryId?: number) => ["books", categoryId], //List of books
  BOOK_DETAIL: (bookId: number) => ["book-detail", bookId], //Single book
  REVIEWS: (bookId: number) => ["reviews", bookId],
  CART: ["cart"],
  CATEGORY: ["book-categories"],
  MY_REVIEWS: "my-reviews",
};
