import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://openlibrary.org/search.json";

// Lets Express read form data and serve files from /public (CSS)
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home page: just show the search form
app.get("/", (req, res) => {
  res.render("index.ejs", { books: null, error: null, query: "" });
});

// Search route: the form sends the user's input here
app.post("/search", async (req, res) => {
  const query = req.body.query.trim();

  // Don't call the API if the box was empty
  if (!query) {
    return res.render("index.ejs", {
      books: null,
      error: "Please type a title or author first.",
      query,
    });
  }

  try {
    // Axios calls the public API; "params" builds ?q=...&limit=12 safely
    const response = await axios.get(API_URL, {
      params: { q: query, limit: 12 },
    });

    // The books live in response.data.docs
    const books = response.data.docs.map((book) => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown author",
      year: book.first_publish_year || "Unknown year",
      // Not every book has a cover, so build the URL only if cover_i exists
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));

    if (books.length === 0) {
      return res.render("index.ejs", {
        books: null,
        error: `No books found for "${query}". Try another search.`,
        query,
      });
    }

    res.render("index.ejs", { books, error: null, query });
  } catch (err) {
    // Log the technical detail for you, show a friendly message to the user
    console.error("API request failed:", err.message);
    res.render("index.ejs", {
      books: null,
      error: "Something went wrong reaching the book database. Please try again.",
      query,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});