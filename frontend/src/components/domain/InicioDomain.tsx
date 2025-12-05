import "./InicioDomain.css";
import { useState } from "react";
import SideBar from "../common/SideBar";
import Header from "../common/Header";
import CollectionHeader from "./CollectionHeader";
import Alphabet from "./Alphabet";
import Toolbar from "./Toolbar";
import BookGrid from "./BookGrid";
import type { Book } from "./BookCard";

const sampleBooks: Book[] = [
  {
    id: "1",
    title: "Harry Potter and The Cursed Child",
    author: "J.K. Rowling",
    cover:
      "https://images-na.ssl-images-amazon.com/images/P/B01D3F47GA.01.L.jpg",
  },
  {
    id: "2",
    title: "Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: "3",
    title: "Prisoner of Azkaban",
    author: "J.K. Rowling",
  },
  {
    id: "4",
    title: "Goblet of Fire",
    author: "J.K. Rowling",
  },
];

function InicioDomain() {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(sampleBooks);

  const handleLetterClick = (letter: string) => {
    if (letter === "#") {
      setFilteredBooks(sampleBooks);
    } else {
      const filtered = sampleBooks.filter((book) =>
        book.title.toUpperCase().startsWith(letter)
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className="layout">
      <SideBar />
      <div className="main-wrapper">
        <Header userName="Usuario" />
        <main className="main-content">
          <div className="content-container">
            <CollectionHeader title="Colección de Harry Potter" itemCount={1} />
            <Toolbar />
            <Alphabet onLetterClick={handleLetterClick} />
            <BookGrid books={filteredBooks} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default InicioDomain;
