import { useEffect, useState } from "react";
import GameCard from "../game-card/GameCard";

export default function Catalog() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        fetch("http://localhost:3030/jsonstore/games", {
            signal: abortController.signal,
        })
            .then((response) => response.json())
            .then((result) => setGames(Object.values(result)))
            .catch((err) => {
                if (err.name === "AbortError") return;

                alert(err.message);
            });

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>
            <div className="catalog-container">
                {games.length === 0 && (
                    <h3 className="no-articles">No Added Games Yet</h3>
                )}

                {games.map((game) => (
                    <GameCard {...game} key={game._id} />
                ))}
            </div>
        </section>
    );
}
