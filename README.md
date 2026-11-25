# DigiMistry

DigiMistry is a responsive blog-site frontend for discovering beginner-friendly
articles and resources about blogging, technology, and digital marketing. It is
built with React, Vite, Tailwind CSS, and React Router.

## Features

- Shared branded header and footer with navigation, social icons, and dropdown menus.
- Hero section with the DigiMistry logo, profile photo, and topic search.
- Post cards populated from a local JavaScript data file.
- Search posts by title or category.
- Load more posts from the home page.
- Client-side routes at `/` and `/blog/:slug`, configured in `src/AppRoutes.jsx`.
- Markdown post content rendered with React Markdown when available.
- Footer and a back-to-top button.

> **Current scope:** This repository contains a frontend only. Post data is
> hard-coded and article content is stored in local Markdown files. Posts
> without a matching Markdown file show a fallback message. There is no API,
> database, authentication, or content-management interface.

## Technology

- React 19
- Vite 8
- React Router 7
- React Markdown
- Tailwind CSS 3
- Tailwind Typography
- React Icons
- Oxlint

## Project structure

```text
digimistry/
├── public/
│   ├── App.png
│   ├── JavaSciptNotes.jpg
│   ├── Logo.png
│   ├── PHOTO.png
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/               # Source assets
│   ├── components/
│   │   ├── BackToTop.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── PostCard.jsx
│   │   └── socialIcons.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Post.jsx
│   ├── Content/              # Markdown files, named for their post slugs
│   │   ├── Javascript-handwritten-notes.md
│   │   └── Resume-cv-antar.md
│   ├── App.css
│   ├── App.jsx               # App entry component
│   ├── AppRoutes.jsx         # BrowserRouter and route definitions
│   ├── Content.js            # Looks up Markdown content by slug
│   ├── index.css             # Tailwind directives
│   ├── main.jsx              # React application entry point
│   └── posts.js              # Static post metadata
├── .gitignore
├── .oxlintrc.json
├── index.html                # HTML shell and page metadata
├── package-lock.json
├── package.json              # Dependencies and npm scripts
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

`node_modules/` is created when dependencies are installed. `dist/` is generated
by a production build.

### Post data and images

Post records are exported from `src/posts.js`. Each record currently has:

| Field | Purpose |
| --- | --- |
| `id` | Stable React list key |
| `slug` | URL segment for the post detail route |
| `title` | Post title shown in search and cards |
| `category` | Category shown on the card and used by search |
| `img` | Public URL for the card image |
| `bg` | Card image area's background color |

The `img` field in each record in `src/posts.js` supplies its post-card image
URL. Public assets are served from `public/`. Some records reference
`/images/...` paths, but this checkout does not contain a `public/images/`
directory; add the assets or update those paths as needed.

### Post content

The post detail page uses `src/Content.js` to find a Markdown file in
`src/Content/` whose filename matches the post slug (case-insensitive). The
content is rendered with React Markdown. If no matching file exists, or its
content is empty, the page displays `Content jald aayega.` Add a
`<slug>.md` file in `src/Content/` to provide content for another post.

## Getting started

### Requirements

- Node.js and npm
- A modern browser

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (typically
`http://localhost:5173`).

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create the production bundle in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Software Requirements Specification (SRS)

### 1. Purpose

This SRS describes the current DigiMistry frontend, its user-visible
requirements, constraints, and known limitations. It can also be used as a
baseline for extending the site into a complete publishing platform.

### 2. Scope

The application presents a blog landing page for visitors interested in
blogging, technology tutorials, tools, and digital marketing. Visitors can
browse a static list of posts, filter it by title or category, and open a
post-specific route. The current implementation does not provide article
authoring or persistent content storage.

### 3. User classes

- **Visitor:** Browses the home page, searches the available posts, and opens a
  post route.
- **Maintainer:** Updates the frontend, the static post records, and public
  assets directly in the project files. There is no in-app editor.

### 4. Functional requirements

| ID | Requirement | Current status |
| --- | --- | --- |
| FR-01 | The application shall show the DigiMistry home page at `/`. | Implemented |
| FR-02 | The home page shall show the brand, navigation, hero content, profile image, and search input. | Implemented |
| FR-03 | The home page shall render post cards using records from `src/posts.js`. | Implemented |
| FR-04 | Search shall filter posts by title or category without case sensitivity and ignore leading/trailing whitespace. | Implemented |
| FR-05 | The home page shall show a no-results message when no post matches the search. | Implemented |
| FR-06 | The page shall initially show up to five matching posts and offer three more at a time when available. | Implemented |
| FR-07 | Selecting a card shall navigate to `/blog/:slug`. | Implemented |
| FR-08 | A valid post route shall show the selected post title and matching Markdown content when available. | Implemented; missing content uses a fallback message |
| FR-09 | An unknown post slug shall show a not-found heading and a link back home. | Implemented |
| FR-10 | The interface shall provide a back-to-top control. | Implemented |
| FR-11 | Header, dropdown, footer, and social elements shall provide the navigation and branding presentation. | Presentation implemented; several links are placeholders |

### 5. Non-functional requirements

- **Responsive layout:** The interface shall adapt its layout across supported
  screen sizes using responsive utility classes. The hero profile image is
  intentionally hidden below the medium breakpoint.
- **Usability:** Search, post cards, navigation, and the back-to-top control
  shall be visually identifiable and usable with a modern browser.
- **Maintainability:** Post metadata shall remain in the dedicated
  `src/posts.js` file, with pages and reusable components in separate modules.
- **Performance:** The site shall be buildable as a static client-side bundle
  using Vite.
- **Accessibility baseline:** Meaningful images shall have alternative text and
  the back-to-top button shall have an accessible label.
- **Browser support:** The site targets current browsers that support the
  React/Vite output and modern CSS used by Tailwind.

### 6. Interface and route requirements

- `/` renders the home page.
- `/blog/:slug` renders the matching post title, or a not-found state if the
  slug does not exist.
- The logo and profile photo are loaded from `/Logo.png` and `/PHOTO.png`.
- Post image paths are supplied by each record in `src/posts.js`.

### 7. Data and system constraints

- Post records are held in a JavaScript array; they are not fetched from a
  server and changes are not persisted.
- Blog detail content is stored in local Markdown files; posts without content
  use a fallback message.
- Several informational and dropdown/footer links are presentation-only and
  do not yet lead to implemented pages.
- Some post-card image URLs refer to `/images/...`; the corresponding
  `public/images/` directory is absent from the current checkout.
- There is no authentication, database, API, form submission, or admin
  dashboard.

### 8. Acceptance criteria

1. `npm run dev` starts the site and `/` renders the home page.
2. Searching for a title or category narrows the visible cards; a
   non-matching query shows the no-results message.
3. The home page shows no more than five cards initially, and the load-more
   control adds up to three cards while results remain.
4. Opening a known `/blog/:slug` URL shows its title and available Markdown
   content (or the fallback message); an unknown slug shows the not-found state
   and home link.
5. The production bundle builds successfully with `npm run build`.

## Future work

- Add Markdown content for posts that do not yet have an article.
- Add the referenced post-card images to `public/images/`.
- Replace placeholder navigation links with real pages or destinations.
- If publishing workflows are required, introduce a backend/API, persistent
  storage, and a protected authoring interface.