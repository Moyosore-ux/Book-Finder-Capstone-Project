# Book Finder

A small website where you search for books by title or author and see
results with cover images. Built with Node.js, Express, Axios, and EJS,
using the free Open Library API (no API key needed).

## How it works

1. You type a search into the form.
2. The Express server sends your search to the Open Library API using Axios.
3. The results come back as JSON, and the server picks out the title,
   author, year, and cover.
4. EJS turns that data into the page you see.

## How to run it

1. Make sure Node.js is installed (`node -v` to check).
2. Clone or download this project, then open a terminal in its folder.
3. Install the dependencies:
```
   npm i
```
4. Start the server:
```
   node index.js
```
   (or `nodemon index.js` if you have nodemon installed)
5. Open http://localhost:3000 in your browser.

## Project structure

```
book-finder/
├── index.js        # Express server and routes
├── views/
│   └── index.ejs   # The page template
├── public/
│   └── styles.css  # Styling
└── package.json
```

## Built with

- Node.js and Express
- Axios
- EJS
- Open Library API
