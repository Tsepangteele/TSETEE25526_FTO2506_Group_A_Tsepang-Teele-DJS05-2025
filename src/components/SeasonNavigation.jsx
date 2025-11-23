// src/components/SeasonNavigation.jsx

// I use useState to keep track of which season is currently selected.
import { useState } from "react";
import EpisodeCard from "./EpisodeCard.jsx";

/**
 * In this component I:
 * - Show tabs for each season
 * - Let the user switch between seasons
 * - Render episodes for the currently active season
 */
export default function SeasonNavigation({ seasons }) {
  // I default to the first season.
  const [activeIndex, setActiveIndex] = useState(0);

  // If there are no seasons, I handle that empty state cleanly.
  if (!seasons || seasons.length === 0) {
    return <p className="center">No seasons available for this show.</p>;
  }

  // I read the active season based on the selected index.
  const activeSeason = seasons[activeIndex];

  return (
    <section className="seasons">
      {/* Header showing a quick summary */}
      <header className="seasons__header">
        <h2>Seasons</h2>
        <p>
          {seasons.length} season{seasons.length > 1 ? "s" : ""} •{" "}
          {activeSeason.episodes.length} episode
          {activeSeason.episodes.length !== 1 ? "s" : ""}
        </p>
      </header>

      {/* Tabs for switching between seasons */}
      <div className="seasons__tabs">
        {seasons.map((season, index) => (
          <button
            key={season.number}
            className={
              index === activeIndex
                ? "season-tab season-tab--active"
                : "season-tab"
            }
            // When I click on a tab, I change which season is active.
            onClick={() => setActiveIndex(index)}
          >
            Season {season.number}
          </button>
        ))}
      </div>

      {/* Episodes for the current season */}
      <div className="episodes-list">
        {activeSeason.episodes.map((episode, index) => (
          <EpisodeCard
            key={episode.episode}
            episode={episode}
            index={index}
            seasonImage={activeSeason.image}
          />
        ))}
      </div>
    </section>
  );
}
