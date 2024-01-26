import React, { useState } from 'react';

const GameCreationScreen = ({ onGameCreate }) => {
  const [userName, setuserName] = useState('');
  const [userColor, setuserColor] = useState('#000000'); // varsayılan renk
  const [gameName, setGameName] = useState('');
  const [boardColor, setboardColor] = useState('#000000'); // varsayılan renk

  const handleCreateGame = () => {
    // Kullanıcı adı, kullanıcı rengi, oyun adı ve oyun rengi boş olmamalı
    if (!userName || !userColor || !gameName || !boardColor) {
      alert("Please fill in all fields.");
      return;
    }

    // Daha önce kaydedilmiş oyunları al
    const games = JSON.parse(localStorage.getItem('games')) || [];

    // Yeni oyunu oluştur
    const newGame = {
      userName: userName,
      userColor: userColor,
      gameName: gameName,
      boardColor: boardColor
    };
    localStorage.setItem('boardColor', boardColor);
    localStorage.setItem('userColor',userColor);

    // Yeni oyunu diğer oyunlarla birlikte kaydet
    const updatedGames = [...games, newGame];
    localStorage.setItem('games', JSON.stringify(updatedGames));

    // Oyun oluşturulduğunda parent component'a bilgi iletilir.
    onGameCreate();
  };

  return (
    <div>
      <h2>Game Creation Screen</h2>
      <label>
        Gamer Name:
        <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} />
      </label>
      <br />
      <label>
        Gamer Color:
        <input type="color" value={userColor} onChange={(e) => setuserColor(e.target.value)} />
      </label>
      <br />
      <label>
        Game Name:
        <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} />
      </label>
      <br />
      <label>
        Game Color:
        <input type="color" value={boardColor} onChange={(e) => setboardColor(e.target.value)} />
      </label>
      <br />
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

export default GameCreationScreen;
