// Sample API URL (replace with your actual API endpoint)
const API_URL = "https://example.com/api/books";

// Fetch all books and display them
async function fetchBooks() {
  try {
    const response = await fetch(dc65058f1ec48bec531dace9ef52f175);
    const books = await response.json();

    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Clear the list

    books.forEach(book => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
          <button onclick="deleteBook(${book.id})">Delete</button>
          <button onclick="editBook(${book.id}, '${book.title}', '${book.author}')">Edit</button>
        </td>
      `;
      bookList.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Add a new book
async function addBook(title, author) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    fetchBooks(); // Refresh the list
  } catch (error) {
    console.error("Error adding book:", error);
  }
}

// Delete a book
async function deleteBook(id) {
  try {
    await fetch(${API_URL}/${id}, { method: "DELETE" });
    fetchBooks(); // Refresh the list
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

// Edit a book
function editBook(id, title, author) {
  document.getElementById("title").value = title;
  document.getElementById("author").value = author;

  // Update form behavior
  const form = document.getElementById("book-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    updateBook(id, document.getElementById("title").value, document.getElementById("author").value);
  };
}

// Update a book
async function updateBook(id, title, author) {
  try {
    await fetch(${API_URL}/${id}, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    fetchBooks(); // Refresh the list

    // Reset the form
    const form = document.getElementById("book-form");
    form.reset();
    form.onsubmit = handleFormSubmit; // Reset to default behavior
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  addBook(title, author);

  // Reset the form
  e.target.reset();
}

// Initialize
document.getElementById("book-form").onsubmit = handleFormSubmit;
fetchBooks();
