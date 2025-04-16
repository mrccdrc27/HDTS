import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books/")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📚 Book List</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul className="space-y-2">
          {books.map((book) => (
            <li key={book.id} className="border p-2 rounded-lg shadow">
              <strong>{book.title}</strong> by {book.author} —{" "}
              {book.is_available ? "Available ✅" : "Not Available ❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
