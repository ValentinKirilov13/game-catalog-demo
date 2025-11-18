import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard";

export default function Home() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        fetch("http://localhost:3030/jsonstore/games", {
            signal: abortController.signal,
        })
            .then((response) => response.json())
            .then((result) => {
                const latestGames = Object.values(result)
                    .sort((a, b) => b._createdOn - a._createdOn)
                    .slice(0, 3);

                setGames(latestGames);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;

                alert(err.message);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in</h3>
                <img id="logo-left" src="./images/logo.png" alt="logo" />
            </div>

            <div id="home-page">
                <h1>Latest Games</h1>
                <div id="latest-wrap">
                    <div className="home-container">
                        {games.length === 0 && (
                            <p className="no-articles">No games yet</p>
                        )}

                        {games.map((game) => (
                            <GameCard {...game} key={game._id} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
