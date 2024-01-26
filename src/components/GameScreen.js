
import React, { useState, useEffect } from "react";
import "../style.css";

export default function GameScreen() {
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

  useEffect(() => {
    const storedBoardColor = localStorage.getItem('boardColor');
    if (storedBoardColor) {
      setBoardColor(storedBoardColor);
    }
  }, []);

  const handleSquareClick = (rowIdx, colIdx) => {
    if (!isWinner) {
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
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        checkWinner(i, colIdx, currentPlayer, newBoard);
        break;
      }
    }
  };

  const renderBoard = () => {
    return (
      <div className="cf-Container" style={{ backgroundColor: "white" }}>
        {board.map((row, rowIdx) => {
          return row.map((_, colIdx) => {
            return (
              <div className="cf-item" style={{ backgroundColor: boardColor }} key={colIdx + "" + rowIdx} onClick={() => handleSquareClick(rowIdx, colIdx)}>
                {board[rowIdx][colIdx] === "X" ? (
                  <div className="cf-token-X"></div>
                ) : (
                  <>
                    {board[rowIdx][colIdx] === "O" ? (
                      <div className="cf-token-O"></div>
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
    );
  };

  return (
    <div className="main-Page-Container">
      <div className="current-player-container">
        <h1>Current Player is</h1>
        <div className={"cf-token-" + currentPlayer}></div>
      </div>
      {renderBoard()}
      {isWinner && (
        <div className="current-player-container">
          <h1>The Winner is</h1>
          <div className={"cf-token-" + (currentPlayer === "X" ? "O" : "X")}></div>
        </div>
      )}
    </div>
  );
}
