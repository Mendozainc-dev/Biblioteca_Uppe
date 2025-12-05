import "./BookGrid.css";
import BookCard from "./BookCard";
import type { Book } from "./BookCard";

interface BookGridProps {
  books: Book[];
  onBookClick?: (book: Book) => void;
}

export default function BookGrid({ books, onBookClick }: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="book-grid-empty">
        <p>No hay libros disponibles</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
}
