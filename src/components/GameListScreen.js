

import React, { useState, useEffect } from 'react';

const GameListScreen = ({ onStartGame }) => {
  const [games, setGames] = useState([]);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const storedGames = JSON.parse(localStorage.getItem('games')) || [];
    setGames(storedGames);

    const storedWinners = JSON.parse(localStorage.getItem('winners')) || [];
    setWinners(storedWinners);
  }, []);

  return (
    <div>
      <h2>Game List Screen</h2>
      <button onClick={() => onStartGame(games)}>Start Game</button>
      
      <h3>Winner List</h3>
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>
            <p>User Name: {winner.userName}</p>
            <p>Game Name: {winner.gameName}</p>
            <p>Winner: {winner.winner}</p>
          </li>
        ))}
      </ul>
      
      <h3>All Games</h3>
      {games.map((game, index) => (
        <div key={index}>
          <p>Game Name: {game.gameName}</p>
          <p>User Name: {game.userName}</p>
          <p>Game Color: {game.boardColor}</p>
          <p>User Color: {game.userColor}</p>
          {game.winner && <p>Winner: {game.winner}</p>}
        </div>
      ))}
    </div>
  );
};

export default GameListScreen;
