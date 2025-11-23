// src/components/ShowDetail.jsx

// Here I import the hooks I need to fetch data and manage state.
import { useEffect, useState } from "react";

// I import Link and useParams so I can read the :id from the URL
// and let the user go back to the homepage.
import { Link, useParams } from "react-router-dom";

// I import my seasons component so I can show all seasons and episodes.
import SeasonNavigation from "./SeasonNavigation.jsx";

// I import my genres data so I can map IDs to names.
import { genres } from "../data";

/**
 * In this helper, I take an array of genre IDs
 * and return a string of human-readable genre titles.
 */
function getGenreTitles(ids = []) {
  const map = Object.fromEntries(genres.map((g) => [g.id, g.title]));

  return ids
    .map((id) => map[id])
    .filter(Boolean)
    .join(" • ");
}

/**
 * This is my Show Detail page component.
 * Here I:
 * - Read the show ID from the URL
 * - Fetch full show data (including seasons + episodes)
 * - Show loading / error / empty states
 * - Render the show header and the SeasonNavigation component
 */
export default function ShowDetail() {
  // I read the dynamic :id from the route.
  const { id } = useParams();

  // I store the fetched show data here.
  const [show, setShow] = useState(null);

  // I track loading and error states so the user gets feedback.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // In this effect, I fetch the show whenever the ID changes.
  useEffect(() => {
    async function fetchShow() {
      try {
        setLoading(true);
        setError("");

        // Here I call the API for a single show.
        const res = await fetch(`https://podcast-api.netlify.app/id/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch show details");
        }

        const data = await res.json();

        // I store the show in state once it is fetched.
        setShow(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchShow();
  }, [id]);

  // While I am still fetching, I show a simple loading message.
  if (loading) {
    return <p className="center">Loading show details…</p>;
  }

  // If something went wrong, I show a friendly error message.
  if (error) {
    return (
      <main className="show-detail">
        <p className="center error">Could not load show: {error}</p>
        <p className="center">
          <Link to="/">← Back to all shows</Link>
        </p>
      </main>
    );
  }

  // If there is no show for this ID, I handle the empty state gracefully.
  if (!show) {
    return (
      <main className="show-detail">
        <p className="center">Show not found.</p>
        <p className="center">
          <Link to="/">← Back to all shows</Link>
        </p>
      </main>
    );
  }

  // I format the last updated date in a readable format.
  const lastUpdated = show.updated
    ? new Date(show.updated).toLocaleDateString()
    : "Unknown";

  // Here I render the full detail page.
  return (
    <main className="show-detail">
      {/* Back link to the homepage. My context keeps filters + pagination. */}
      <Link to="/" className="back-link">
        ← Back to all shows
      </Link>

      {/* Header with image and main info */}
      <section className="show-detail__header">
        <img
          src={show.image}
          alt={show.title}
          className="show-detail__image"
        />

        <div className="show-detail__info">
          <h1>{show.title}</h1>

          <p className="show-detail__genres">
            {getGenreTitles(show.genres)}
          </p>

          <p className="show-detail__updated">
            Last updated: {lastUpdated}
          </p>

          <p className="show-detail__description">{show.description}</p>
        </div>
      </section>

      {/* Season navigation and episode list */}
      <SeasonNavigation seasons={show.seasons || []} />
    </main>
  );
}
