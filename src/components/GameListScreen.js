import React, { useEffect, useState } from 'react';

const GameListScreen = ({ onStartGame }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(storedGames);
  }, []);

  return (
    <div>
      <h2>Game List Screen</h2>
      <button onClick={() => onStartGame(games)}>Start Game</button>
      {games.map((game, index) => (
        <div key={index}>
          <p>Game Name: {game.gameName}</p>
          <p>User Name: {game.userName}</p>
          <p>Game Color: {game.boardColor}</p>
          <p>User Color: {game.userColor}</p>
        </div>
      ))}
    </div>
  );
};

export default GameListScreen;
