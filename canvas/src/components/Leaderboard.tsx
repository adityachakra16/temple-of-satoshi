import { useContext, useEffect, useState } from "react";
import { GameContext } from "../context/Game";
import { RollupInterface } from "../services/RollupInterface";

const mockLeaderboard = [
  { player: "Alice", scores: 100 },
  { player: "Bob", scores: 90 },
  { player: "Charlie", scores: 80 },
  { player: "David", scores: 70 },
  { player: "Eve", scores: 60 },
  { player: "Frank", scores: 50 },
  { player: "Grace", scores: 40 },
  { player: "Hank", scores: 30 },
  { player: "Ivy", scores: 20 },
  { player: "Jill", scores: 10 },
];

export function Leaderboard(props: any) {
  const gameContext = useContext(GameContext);
  const { fetchLeaderboard } = RollupInterface();
  const [topThree, setTopThree] = useState<
    {
      player: string;
      scores: number;
    }[]
  >([]);
  const [leaderboard, setLeaderboard] = useState<
    {
      player: string;
      scores: number;
    }[]
  >([]);

  const cutString = (str: string) => {
    if (str.length > 8) {
      return `${str.slice(0, 6)}...${str.slice(-6)}`;
    }
    return str;
  };

  useEffect(() => {
    void (async () => {
      const leaderboard = await fetchLeaderboard();
      if (!leaderboard) {
        console.error("Error fetching leaderboard");
        mockLeaderboard.sort((a, b) => b.scores - a.scores);
        setLeaderboard(mockLeaderboard);
        setTopThree(mockLeaderboard.slice(0, 3));
        return;
      }
      setTopThree(leaderboard.slice(0, 3));
      setLeaderboard(leaderboard);
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
                  <p>{cutString(entry.player)}</p>
                  <p>{entry.scores}</p>
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
              <p>{entry.player}</p>
              <p>{entry.scores}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
