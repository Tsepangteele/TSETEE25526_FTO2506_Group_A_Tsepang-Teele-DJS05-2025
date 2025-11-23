// src/components/EpisodeCard.jsx

/**
 * In this component I display one episode card.
 * I show the episode number, title, image and a shortened description.
 */
export default function EpisodeCard({ episode, index, seasonImage }) {
  // I shorten the description so it doesn't take up too much space.
  const shortDescription =
    episode.description && episode.description.length > 140
      ? episode.description.slice(0, 140) + "…"
      : episode.description || "No description available.";

  return (
    <article className="episode-card">
      {/* I reuse the season image for all episodes in that season. */}
      <img
        src={seasonImage}
        alt={episode.title}
        className="episode-card__image"
      />

      <div className="episode-card__content">
        {/* I show a simple #index-style number for the episode. */}
        <h3>
          #{index + 1} — {episode.title}
        </h3>

        <p className="episode-card__description">{shortDescription}</p>
      </div>
    </article>
  );
}
