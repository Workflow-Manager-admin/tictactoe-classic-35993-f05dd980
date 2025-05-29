import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * This is the main container for the TicTacToe Classic game.
   * Features:
   * - Two player mode (X vs O, both on same device)
   * - Win/draw detection
   * - Restart button
   * - Thematic color and simple layout
   */
  // Game board is 3x3 array (flat, 9 elements)
  const EMPTY_BOARD = Array(9).fill(null);
  const [board, setBoard] = useState(EMPTY_BOARD);
  // 'X' always starts
  const [xIsNext, setXIsNext] = useState(true);
  // Result: null (ongoing), "Draw", "X", or "O"
  const winner = calculateWinner(board);
  const isBoardFull = board.every(square => square !== null);
  const gameResult =
    winner
      ? `${winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins! 🎉`}`
      : `Player ${xIsNext ? "X" : "O"}'s Turn`;

  const handleClick = idx => {
    if (board[idx] || winner) return; // ignore move if already filled or if game won
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
  };

  // Rendering helpers for board
  const renderSquare = idx => (
    <button
      className="ttt-square"
      key={idx}
      onClick={() => handleClick(idx)}
      style={{
        color: board[idx] === "X" ? "var(--accent)" : "var(--secondary)",
        transition: "color 0.15s"
      }}
      aria-label={`Cell ${idx + 1}, ${board[idx] ? board[idx] : "empty"}`}
      data-testid={`square-${idx}`}
      disabled={!!board[idx] || !!winner}
    >
      {board[idx]}
    </button>
  );

  // Styles (could use App.css, but provide component-specific styles inline)
  // Theme colors: primary(#fff), secondary(#222), accent(#0dc913)
  // But the template overrides body bg to dark blue; we will keep the board/card light for visibility.
  return (
    <div className="app">
      {/* Header as per template */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol" style={{ color: "#0dc913" }}>◼</span> ColorCraft
            </div>
            <span style={{ fontWeight: 500, color: "#0dc913" }}>TicTacToe Classic</span>
          </div>
        </div>
      </nav>
      <main>
        <div className="container">
          <div className="ttt-center-wrapper">
            <div className="ttt-board-card">
              <div className="ttt-title">Tic Tac Toe</div>
              <div className="ttt-grid" role="grid" aria-label="Tic Tac Toe Board">
                {[0, 1, 2].map(row => (
                  <div className="ttt-row" key={row}>
                    {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
                  </div>
                ))}
              </div>
              <div
                className="ttt-status"
                style={{
                  margin: "20px 0 8px 0",
                  fontSize: "1.1rem",
                  color: winner
                    ? winner === "Draw"
                      ? "#aaa"
                      : "#0dc913"
                    : "#222",
                  minHeight: "28px",
                  fontWeight: 500,
                  letterSpacing: ".04em"
                }}
                data-testid="status-message"
              >
                {gameResult}
              </div>
              <button
                className="btn btn-large"
                style={{
                  backgroundColor: "#0dc913",
                  color: "#fff",
                  letterSpacing: ".03em",
                  fontWeight: 500
                }}
                onClick={handleRestart}
                data-testid="restart-button"
              >
                Restart Game
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Inline styles for the game locally */}
      <style>{`
        .ttt-center-wrapper {
          min-height: 92vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ttt-board-card {
          background: #fff;
          border-radius: 14px;
          padding: 32px 26px 22px 26px;
          box-shadow: 0 8px 32px rgba(40,60,80,0.13);
          min-width: 340px;
          max-width: 362px;
          min-height: 430px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ttt-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #0dc913;
          margin-bottom: 16px;
          text-align: center;
        }
        .ttt-grid {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }
        .ttt-row {
          display: flex;
          flex-direction: row;
        }
        .ttt-square {
          width: 72px;
          height: 72px;
          background: #fff;
          border: 2.5px solid #222;
          font-size: 2.35rem;
          font-family: inherit;
          color: #222;
          font-weight: 700;
          outline: none;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          cursor: pointer;
          transition: background 0.13s, color 0.13s;
          border-radius: 7px;
          margin: 2.5px;
          box-sizing: border-box;
        }
        .ttt-square:disabled {
          cursor: default;
          background: #f8f8f8;
        }
        .ttt-status {
          margin-top: 16px;
        }
        @media screen and (max-width: 500px) {
          .ttt-board-card {
            padding: 16px 5px;
            min-width: unset;
            max-width: 96vw;
          }
          .ttt-square {
            width: 18vw;
            height: 18vw;
            font-size: 9vw;
          }
        }
      `}</style>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Returns "X" if X wins, "O" if O wins, "Draw" if no moves left, or null if ongoing.
 * @param {Array<string|null>} squares
 */
function calculateWinner(squares) {
  // All 8 win lines
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6] // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  // Draw: All filled, no winner
  if (squares.every(s => s)) return "Draw";
  return null;
}

export default TicTacToe;
