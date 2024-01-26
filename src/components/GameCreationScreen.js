import React, { useState } from 'react';

const GameCreationScreen = ({ onGameCreate }) => {
  const [userName, setUserName] = useState('');
  const [userColor, setUserColor] = useState('#000000'); // varsayılan renk
  const [gameName, setGameName] = useState('');
  const [boardColor, setBoardColor] = useState('#000000'); // varsayılan renk

  const handleCreateGame = () => {
    // Kullanıcı adı, kullanıcı rengi, oyun adı ve oyun rengi boş olmamalı
    if (!userName || !userColor || !gameName || !boardColor) {
      alert("Please fill in all fields.");
      return;
    }

    // Daha önce kaydedilmiş oyunları al
    const games = JSON.parse(localStorage.getItem('games')) || [];

    // Aynı kullanıcı adına sahip bir oyun var mı kontrol et
    const existingUserGame = games.find(game => game.userName === userName);
    if (existingUserGame) {
      alert("A game with the same user name already exists. Please choose a different user name.");
      return;
    }

    // Yeni oyunu oluştur
    const newGame = {
      userName: userName,
      userColor: userColor,
      gameName: gameName,
      boardColor: boardColor
    };

    // Yeni oyunu diğer oyunlarla birlikte kaydet
    const updatedGames = [...games, newGame];
    localStorage.setItem('games', JSON.stringify(updatedGames));
    localStorage.setItem('boardColor', boardColor);
    localStorage.setItem('userColor', userColor);
    localStorage.setItem('userName', userName);
    localStorage.setItem('gameName', gameName);

    // Oyun oluşturulduğunda parent component'a bilgi iletilir.
    onGameCreate();
  };

  return (
    <div>
      <h2>Game Creation Screen</h2>
      <label>
       User Name:
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <br />
      <label>
        User Color:
        <input type="color" value={userColor} onChange={(e) => setUserColor(e.target.value)} />
      </label>
      <br />
      <label>
        Game Name:
        <input type="text" value={gameName} onChange={(e) => setGameName(e.target.value)} />
      </label>
      <br />
      <label>
        Game Color:
        <input type="color" value={boardColor} onChange={(e) => setBoardColor(e.target.value)} />
      </label>
      <br />
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
};

export default GameCreationScreen;
