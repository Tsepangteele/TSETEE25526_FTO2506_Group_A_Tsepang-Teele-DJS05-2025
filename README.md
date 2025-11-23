🎧 Podcast App — DJS05: Show Detail Page with Routing & Navigation

This project is part of the CodeSpace Academy Full-Stack Web Development Bootcamp (FTO2506).
It extends a podcast browsing application by adding a dynamic Show Detail Page, complete with routing, data fetching, season navigation, and episode listings.

It demonstrates my ability to work with React, React Router, state management, API integration, and Vite as the build tool.

🌟 Features
🏠 Homepage

Displays a grid of podcast previews

Includes search, sort, and genre filter components

Clicking on any show navigates to that show’s detail page

Uses React Context to preserve search + filter state when returning from detail pages

📄 Show Detail Page (Main Requirement)

Each show has a unique URL using dynamic routing:

/#/show/:id


On this page, I display:

✔ Large podcast cover image

✔ Show title

✔ Description

✔ Genres (mapped via ID → title)

✔ Last updated date (formatted nicely)

✔ Total seasons and episodes

📁 Season Navigation

Clean UI that lists all seasons of the show

Seasons can be expanded to reveal episodes

Displays:

Episode number

Episode title

Episode image

Shortened description

🔄 State Preservation

When a user goes back from the Show Detail Page to the homepage:

Search term is preserved

Selected genre is preserved

Current pagination page is preserved

Sorting preference stays intact

This creates a smooth, intuitive user experience.
