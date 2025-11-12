# Phonebook App V3 (React + Redux Toolkit)

A simple Phonebook application built with React and Redux Toolkit. You can add contacts, search/filter them, and delete
items. The app is scaffolded with Vite and uses async thunks with Axios to communicate with a MockAPI backend.

Note: This README reflects the current repository state.

## Overview

- UI: React 19 with Vite dev server and HMR.
- State: Redux Toolkit + React Redux.
- Forms & validation: Formik + Yup.
- HTTP client: Axios (async thunks in `contactsSlice`).
- Icons: react-icons.

## Tech stack

- Language: JavaScript (ES Modules)
- Framework/Library: React 19
- State Management: @reduxjs/toolkit, react-redux
- Build tool / Dev server: Vite 7 (rolldown-based), `@vitejs/plugin-react`
- Linting: ESLint 9
- Forms: formik, yup
- HTTP: axios

## Requirements

- Node.js 18+ (Vite 7 requires Node 18 or newer)
- npm 9+ (this project uses npm; a `package-lock.json` is present)

## Getting started

1. Install dependencies:
    - npm install
2. Start the dev server:
    - npm run dev
    - Vite will print a local URL (default http://localhost:5173)
3. Build for production:
    - npm run build
4. Preview the production build locally:
    - npm run preview
5. Lint the project:
    - npm run lint

## Scripts (package.json)

- dev: vite
- build: vite build
- preview: vite preview
- lint: eslint .

## Entry points

- index.html — HTML entry that loads the app
- src/main.jsx — JavaScript entry; renders the React app into `#root`
- src/App.jsx — Main application component

## Project structure (high level)

- index.html — Vite HTML entry
- src/
    - main.jsx — App bootstrap (Provider + App)
    - App.jsx — Page composition (Phonebook)
    - index.css — Global styles
    - redux/
        - store.js — Redux store configuration
        - contactsSlice.js — Async thunks and slice for contacts
        - filtersSlice.js — Filter slice (used by SearchBox)
    - components/
        - contactForm/ContactForm.jsx — New contact form (Formik/Yup)
        - contactList/ContactList.jsx — Renders a filtered list and delegates each item to `Contacts`
        - contact/Contacts.jsx — Single contact item (icons + delete action)
        - searchBox/SearchBox.jsx — Filter input
- vite.config.js — Vite configuration
- eslint.config.js — ESLint configuration
- package.json — Scripts and dependencies

## API

The app uses a public MockAPI endpoint for contacts via Axios in async thunks:

- GET    https://6914df283746c71fe049e682.mockapi.io/contact
- POST   https://6914df283746c71fe049e682.mockapi.io/contact
- DELETE https://6914df283746c71fe049e682.mockapi.io/contact/:id

No environment variables are required to run the app.

## Tests

No test setup or scripts are included in this repository.

## Development notes

- Data shape: a contact contains `{ id, name, phone }`.
- CSS Modules are used for component-level styles (e.g., `ContactForm.module.css`, `ContactList.module.css`,
  `Contacts.module.css`).
- The `ContactList` component selects filtered contacts from Redux and renders each item with `Contacts`.
- The `Contacts` component renders a single item and handles its own delete action by dispatching `deleteContact(id)`.

## License

No license file provided.

## Acknowledgements

- Vite + React template with `@vitejs/plugin-react`.
