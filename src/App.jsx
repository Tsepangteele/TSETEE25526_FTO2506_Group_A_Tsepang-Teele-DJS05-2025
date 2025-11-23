// src/App.jsx

// I import React hooks so I can fetch data and manage loading/error state.
import { useEffect, useState } from "react";

// I import Routes and Route so I can define different pages.
import { Routes, Route } from "react-router-dom";

// Here I import my context provider which manages search, filters, and pagination.
import { PodcastProvider } from "./context/PodcastContext";

// I import my API helper that fetches the preview list of podcasts.
import { fetchPodcasts } from "./api/fetchPodcasts";

// I import the genres list so I can pass it down to other components.
import { genres } from "./data";

// I import all the UI components that make up my homepage.
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import SortSelect from "./components/SortSelect";
import GenreFilter from "./components/GenreFilter";
import PodcastGrid from "./components/PodcastGrid";
import Pagination from "./components/Pagination";

// I import my new ShowDetail component for the /show/:id route.
import ShowDetail from "./components/ShowDetail";

// I import the CSS module for overall layout styling.
import styles from "./App.module.css";

/**
 * In this root App component I:
 * - Fetch the preview list of podcasts once.
 * - Wrap everything in PodcastProvider so filters and pagination are shared.
 * - Set up routing for the homepage (/) and the show detail page (/show/:id).
 */
export default function App() {
  // I keep the raw preview podcasts from the API here.
  const [podcasts, setPodcasts] = useState([]);

  // I keep track of loading and error states for the initial fetch.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // When the app first loads, I fetch the list of preview podcasts.
  useEffect(() => {
    fetchPodcasts(setPodcasts, setError, setLoading);
  }, []);

  return (
    <>
      {/* I show my header on all pages. */}
      <Header />

      {/* I wrap my routed content in PodcastProvider so that
          search, sort, genre filter and pagination state are shared
          and preserved even when I navigate between pages. */}
      <PodcastProvider initialPodcasts={podcasts}>
        <main className={styles.main}>
          {/* Here I define the different pages in my app. */}
          <Routes>
            {/* This route is my homepage / listing page. */}
            <Route
              path="/"
              element={
                <>
                  <section className={styles.controls}>
                    {/* On the homepage I show my search bar, genre filter and sort select. */}
                    <SearchBar />
                    <GenreFilter genres={genres} />
                    <SortSelect />
                  </section>

                  {/* While I am still fetching podcasts, I show a loading spinner. */}
                  {loading && (
                    <div className={styles.messageContainer}>
                      <div className={styles.spinner}></div>
                      <p>Loading podcasts...</p>
                    </div>
                  )}

                  {/* If the fetch fails, I show a friendly error message. */}
                  {error && (
                    <div className={styles.message}>
                      <div className={styles.error}>
                        Error occurred while fetching podcasts: {error}
                      </div>
                    </div>
                  )}

                  {/* When loading is done and there is no error,
                      I show the grid of podcasts and the pagination. */}
                  {!loading && !error && (
                    <>
                      <PodcastGrid genres={genres} />
                      <Pagination />
                    </>
                  )}
                </>
              }
            />

            {/* This route is my dynamic show detail page.
                When I navigate to /show/123, ShowDetail will fetch show 123. */}
            <Route path="/show/:id" element={<ShowDetail />} />
          </Routes>
        </main>
      </PodcastProvider>
    </>
  );
}
