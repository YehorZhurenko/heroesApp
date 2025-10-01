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

> **Note:** All environment variables (such as the MongoDB URI and Cloudinary storage keys) are hardcoded for easier project setup.  
> The developer is aware that this is not a best practice, but given that this is a training/test project and will only be used by reviewers, this approach was chosen for simplicity.

> **Backend Notes:**  
> The project uses MongoDB as the database, along with the Mongoose library for schema modeling.  
> GraphQL was intentionally not used, as the structure and size of the superhero documents are relatively small, and REST was deemed sufficient for this case.  
> Despite the absence of NestJS guards and interceptors at this stage, the backend remains **type-safe** thanks to the use of strongly typed **DTO (Data Transfer Object) files**.  
> There are also plans to add **NestJS guards and interceptors**, as well as potentially implement **authentication** — for example, restricting access to superhero data to specific users like Nick Fury and Lex Luthor.

> **Frontend Notes:**  
> Styling is planned to be improved in the future — due to time constraints, the main focus was placed on the technical implementation.  
> **Redux** was used for state management (not Redux Toolkit), as the simplicity of the project did not require complex asynchronous handling.  
> `createAsyncThunk` and extra reducers were used to manage async operations, although not all use cases are covered — some logic, like form validation and UI feedback, is handled directly within the frontend components.  
> **React Router** (basic version) was used for client-side routing. More advanced solutions like the **Data Router** API were not necessary, as the project did not require built-in loaders, prefetching, or deferred data handling.

## Future Improvements

- **Pagination edge case:** When deleting the last superhero on a page, the pagination does not remove the now-empty page. This will be fixed to provide a smoother user experience.
- **Edit form visuals:** The UI for the image upload section in the hero edit form will be visually improved to provide clearer feedback and better styling.
- **Styling enhancements:** General improvements to layout and styles are planned, especially for responsiveness and consistency.
- **Redux state improvements:** Error handling in Redux will be extended — currently, the state only accounts for errors during the list fetch. In the future, separate error states will be added for fetching a single superhero and other specific operations.

-  **Create Hero (demo):**  
  ![Create Hero](./assets/ezgif-4bde700ed9c0b2.gif)

- **Edit Hero (demo):**  
  ![Edit Hero](./assets/ezgif-4bc08318e135c0.gif)
