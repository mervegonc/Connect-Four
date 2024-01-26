import React, { useState } from 'react';
import GameCreationScreen from './components/GameCreationScreen';
import GameListScreen from './components/GameListScreen';
import GameScreen from './components/GameScreen';

const App = () => {
  const [gameCreated, setGameCreated] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameCreate = () => {
    setGameCreated(true);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameCreated && <GameCreationScreen onGameCreate={handleGameCreate} />}
      {gameCreated ? (
        gameStarted ? (
          <>
            <GameScreen />
          </>
        ) : (
          <GameListScreen
            gameName={localStorage.getItem('gameName')}
            boardColor={localStorage.getItem('boardColor')}
            onStartGame={handleStartGame}
          />
        )
      ) : null}
    </div>
  );
};

export default App;
