
import React, { useState, useEffect } from "react";
import "../style.css";

const GameScreen = () => {
  const [board, setBoard] = useState([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isWinner, setIsWinner] = useState(false);
  const [boardColor, setBoardColor] = useState("#000000"); // Default color
  const [userColor, setUserColor] = useState("#000000");
  const [userName, setUserName] = useState("");
  const [gameName, setGameName] = useState("");

  useEffect(() => {
    const storedBoardColor = localStorage.getItem('boardColor');
    const storedUserColor = localStorage.getItem('userColor');
    const storedUserName = localStorage.getItem("userName");
    const storedGameName = localStorage.getItem('gameName');

    if (storedBoardColor) {
      setBoardColor(storedBoardColor);
    }
    if (storedUserColor) {
      setUserColor(storedUserColor);
    }
    if (storedUserName) {
      setUserName(storedUserName);
    }
    if (storedGameName) {
      setGameName(storedGameName);
    }
  }, []);

  const handleSquareClick = (rowIdx, colIdx) => {
    if (!isWinner && currentPlayer === "X") {
      makeMove(rowIdx, colIdx);
    }
  };

  const checkWinner = (row, col, player, board) => {
    let directions = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
    ];

    for (let direction of directions) {
      let count = 1;
      let [deltaRow, deltaCol] = direction;

      count += checkDirection(row + deltaRow, col + deltaCol, player, deltaRow, deltaCol, board);
      count += checkDirection(row - deltaRow, col - deltaCol, player, -deltaRow, -deltaCol, board);

      if (count >= 4) {
        setIsWinner(true);
        break;
      }
    }
  };

  const checkDirection = (row, col, player, deltaRow, deltaCol, board) => {
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] !== player) {
      return 0;
    }
    return 1 + checkDirection(row + deltaRow, col + deltaCol, player, deltaRow, deltaCol, board);
  };

  const makeMove = (rowIdx, colIdx) => {
    const newBoard = [...board];
    for (let i = board.length - 1; i >= 0; i--) {
      if (newBoard[i][colIdx] === "") {
        newBoard[i][colIdx] = currentPlayer;
        setBoard(newBoard);
        const nextPlayer = currentPlayer === "X" ? "O" : "X";
        
        setCurrentPlayer(nextPlayer); // currentPlayer'ı güncelle
        checkWinner(i, colIdx, currentPlayer, newBoard);
        
        break;
      }
    }
  };
  

  useEffect(() => {
    if (currentPlayer === 'O' && !isWinner) {
      makeComputerMove();
    }
  }, [currentPlayer, isWinner]);

  const makeComputerMove = () => {
    // Burada bilgisayarın hamlesini yapacak algoritmayı yazabilirsiniz
    // Örnek bir algoritma: rastgele boş bir kareye hamle yapma
    const emptySquares = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === "") {
          emptySquares.push([rowIndex, colIndex]);
        }
      });
    });

    if (emptySquares.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      const [rowIdx, colIdx] = emptySquares[randomIndex];
      makeMove(rowIdx, colIdx);
    }
  };

  const renderBoard = () => {
    return (
      <div>
        <h1 style={{ color: "black" }}>{gameName}</h1>
        <div className="cf-Container" style={{ backgroundColor: "white" }}>
          {board.map((row, rowIdx) => {
            return row.map((_, colIdx) => {
              return (
                <div className="cf-item" style={{ backgroundColor: boardColor }} key={colIdx + "" + rowIdx} onClick={() => handleSquareClick(rowIdx, colIdx)}>
                  {board[rowIdx][colIdx] === "X" ? (
                    <div className="cf-token-X" style={{ backgroundColor: userColor }}></div>
                  ) : (
                    <>
                      {board[rowIdx][colIdx] === "O" ? (
                        <div className="cf-token-O" style={{ backgroundColor: "black" }}></div>
                      ) : (
                        <div></div>
                      )}
                    </>
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="main-Page-Container">
      <div className="current-player-container">
        {!isWinner && <h2>{currentPlayer === "X" ? userName : "Computer"}</h2>}
      </div>
      {renderBoard()}
      {isWinner && (
        <div className="current-player-container">
          <h3>The Winner is {isWinner === "O" ? "Computer" : userName}</h3>
        </div>
      )}
    </div>
  );
  
      }

export default GameScreen;
