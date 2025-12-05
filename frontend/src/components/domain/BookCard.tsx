import "./BookCard.css";

export interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
}

interface BookCardProps {
  book: Book;
  onClick?: (book: Book) => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <div className="book-card" onClick={() => onClick?.(book)}>
      <div className="book-cover">
        {book.cover ? (
          <img src={book.cover} alt={book.title} />
        ) : (
          <div className="book-cover-placeholder">{book.title.charAt(0)}</div>
        )}
      </div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">{book.author}</p>
    </div>
  );
}
