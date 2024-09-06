import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/Game";
import { fetchLeaderboard } from "../services/RollupInterface";

const mockLeaderboard = [
  { name: "Alice", score: 100 },
  { name: "Bob", score: 90 },
  { name: "Charlie", score: 80 },
  { name: "David", score: 70 },
  { name: "Eve", score: 60 },
  { name: "Frank", score: 50 },
  { name: "Grace", score: 40 },
  { name: "Hank", score: 30 },
  { name: "Ivy", score: 20 },
  { name: "Jill", score: 10 },
];

export function Leaderboard(props: any) {
  const gameContext = useContext(GameContext);
  const [topThree, setTopThree] = useState<
    {
      name: string;
      score: number;
    }[]
  >([]);
  const [leaderboard, setLeaderboard] = useState<
    {
      name: string;
      score: number;
    }[]
  >([]);

  useEffect(() => {
    void (async () => {
      const leaderboard = await fetchLeaderboard();
      if (!leaderboard) {
        console.error("Error fetching leaderboard");
        mockLeaderboard.sort((a, b) => b.score - a.score);
        setLeaderboard(mockLeaderboard.slice(3));
        setTopThree(mockLeaderboard.slice(0, 3));
        return;
      }
      setTopThree(leaderboard.slice(0, 3));
      setLeaderboard(leaderboard.slice(3));
    })();
  }, []);

  return (
    <div className="screen">
      <div className="flex flex-col items-start justify-start">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h1 className="header">Leaderboard</h1>
          <button
            className="button button-transparent"
            onClick={() => {
              gameContext?.setGameState("completedLevel");
            }}
          >
            Go Back
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {topThree.map((entry, index) => (
            <div
              key={index}
              className="card"
              style={{
                width: "28%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>{entry.name}</p>
                  <p>{entry.score}</p>
                </div>
                <h1>#{index + 1}</h1>
              </div>
            </div>
          ))}
        </div>
        <div
          className="card"
          style={{
            height: "50vh",
            overflow: "auto",
            marginTop: "2rem",
          }}
        >
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <p>{entry.name}</p>
              <p>{entry.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
