# Superhero Database Web Application

## Objective

This project is a web application to manage a superhero database. It allows users to perform CRUD operations on superheroes, including creating, editing, deleting, and viewing superheroes with detailed information and images.

---

## Superhero Model

Each superhero consists of the following fields:

- **nickname**: e.g. `Superman`
- **real_name**: e.g. `Clark Kent`
- **origin_description**: A detailed backstory of the superhero.
- **superpowers**: List or description of superpowers.
- **catch_phrase**: e.g. `"Look, up in the sky, it's a bird, it's a plane, it's Superman!"`
- **images**: A collection of images representing the superhero.

---

## Functional Requirements

The application provides the following functionalities:

- Create, edit, and delete a superhero.
- When creating or editing, assign and remove images from a superhero.
- List all superheroes showing:
  - One image per superhero,
  - Nickname,
  - Pagination with 5 superheroes per page.
- View detailed information and all images of a particular superhero.

---

## Technical Stack

- **Backend:** Node.js with Express.js (or Nest.js)
- **Frontend:** React
- **Testing:** Unit tests included for main logic (if implemented)
- **State management:** (Explain here if you used Redux, Context API, or other)
- **Async handling:** Middleware for asynchronous operations (e.g. Redux Thunk or Saga)

---

## How to Run

1. Clone the repository:

   ```sh
   git clone https://github.com/YehorZhurenko/heroesApp
   cd superhero-database

   ```

2. Install backend dependencies and start the server::

   ```sh
   cd superheroes_back
   npm install
   npm run start:dev
   ```

3. Install frontend dependencies:

   ```sh
   cd ../superheroes_front
   npm install
   npm run dev
   ```

4. Open your browser and navigate to http://localhost:3000
