// src/components/PodcastCard.jsx

// I import the date formatter so I can show "Updated ___" in a nice format
import { formatDate } from "../utils/formatDate";

// I import my component-specific CSS module
import styles from "./PodcastCard.module.css";

// I import Link since the whole card must navigate to /show/:id
import { Link } from "react-router-dom";

/**
 * In this component, I am rendering a single podcast preview card.
 * I also make the entire card clickable so it navigates to /show/:id.
 */
export default function PodcastCard({ podcast, genres }) {
  // Here I map the genre IDs to actual genre titles so they can show as tags.
  const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((genre) => genre.id === id);
    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  // Instead of a <div>, I wrap everything inside <Link> so the whole card is clickable.
  return (
    <Link to={`/show/${podcast.id}`} className={styles.card}>
      <img src={podcast.image} alt={podcast.title} />

      <h3>{podcast.title}</h3>

      <p className={styles.seasons}>{podcast.seasons} seasons</p>

      <div className={styles.tags}>{genreSpans}</div>

      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </Link>
  );
}
