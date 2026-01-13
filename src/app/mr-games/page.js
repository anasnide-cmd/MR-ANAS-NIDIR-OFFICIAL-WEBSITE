'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'] });

export default function GamesHub() {
    const [activeGame, setActiveGame] = useState(null);

    const GAMES = [
        { id: 'tictactoe', name: 'NEON TACTICS', icon: '❌⭕', desc: 'Cyberpunk Tic-Tac-Toe' },
        { id: 'memory', name: 'MEMORY MATRIX', icon: '🧠', desc: 'Pattern Matching Engine', comingSoon: true },
        { id: 'snake', name: 'CYBER SNAKE', icon: '🐍', desc: 'Infinite Loop Protocol', comingSoon: true }
    ];

    return (
        <div className="games-layout">
            <header className="games-header glass">
                <div className="brand">
                    <span className="icon">👾</span>
                    <h1 className={orbitron.className}>MR ARCADE</h1>
                </div>
                <div className="status-bar">
                    <span className="credits">CREDITS: ∞</span>
                    <Link href="/" className="exit-btn">EXIT SYSTEM</Link>
                </div>
            </header>

            <main className="arcade-console">
                {!activeGame ? (
                    <div className="game-select-grid">
                        {GAMES.map(game => (
                            <div 
                                key={game.id} 
                                className={`game-card glass ${game.comingSoon ? 'locked' : ''}`}
                                onClick={() => !game.comingSoon && setActiveGame(game.id)}
                            >
                                <div className="game-icon">{game.icon}</div>
                                <div className="game-info">
                                    <h3>{game.name}</h3>
                                    <p>{game.desc}</p>
                                </div>
                                {game.comingSoon && <div className="lock-overlay"><span>LOCKED</span></div>}
                                {!game.comingSoon && <button className="play-btn">START_GAME.exe</button>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="active-game-container">
                        <button onClick={() => setActiveGame(null)} className="back-btn">⬅ BACK_TO_MENU</button>
                        {activeGame === 'tictactoe' && <TicTacToe />}
                    </div>
                )}
            </main>

            <style jsx global>{`
                body {
                    background-color: #050505;
                    background-image: 
                        linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    color: #fff;
                    min-height: 100vh;
                }
            `}</style>

            <style jsx>{`
                .games-layout {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    padding: 20px;
                }
                .games-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 40px;
                    margin-bottom: 40px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .brand { display: flex; align-items: center; gap: 15px; }
                .brand .icon { font-size: 2rem; animation: pulse 2s infinite; }
                h1 { margin: 0; background: linear-gradient(90deg, #00f0ff, #bc00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.8rem; letter-spacing: 2px; }
                
                .status-bar { display: flex; align-items: center; gap: 20px; font-family: monospace; }
                .credits { color: #00f0ff; text-shadow: 0 0 10px rgba(0, 240, 255, 0.5); }
                .exit-btn { color: #ff3232; text-decoration: none; border: 1px solid rgba(255, 50, 50, 0.3); padding: 5px 15px; border-radius: 5px; transition: all 0.3s; }
                .exit-btn:hover { background: rgba(255, 50, 50, 0.1); box-shadow: 0 0 15px rgba(255, 50, 50, 0.3); }

                .arcade-console {
                    flex: 1;
                    max-width: 1200px;
                    margin: 0 auto;
                    width: 100%;
                }

                .game-select-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                }

                .game-card {
                    position: relative;
                    padding: 30px;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    transition: all 0.3s;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 20px;
                }
                .game-card:hover:not(.locked) {
                    transform: translateY(-5px);
                    border-color: #00f0ff;
                    box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
                }
                .game-icon { font-size: 4rem; margin-bottom: 10px; }
                .game-info h3 { margin: 0 0 5px; font-family: var(--font-orbitron); color: #fff; }
                .game-info p { margin: 0; opacity: 0.6; font-size: 0.9rem; }
                
                .play-btn {
                    margin-top: 10px;
                    background: transparent;
                    color: #00f0ff;
                    border: 1px solid #00f0ff;
                    padding: 8px 20px;
                    font-family: monospace;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-transform: uppercase;
                }
                .game-card:hover .play-btn { background: #00f0ff; color: #000; box-shadow: 0 0 15px rgba(0, 240, 255, 0.5); }

                .locked { opacity: 0.5; cursor: not-allowed; filter: grayscale(1); }
                .lock-overlay {
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.7);
                    display: flex; align-items: center; justify-content: center;
                    font-weight: 800; letter-spacing: 2px; color: #ff3232;
                    border: 1px solid #ff3232;
                    border-radius: 20px;
                }

                .active-game-container {
                    animation: fadeUp 0.5s ease-out;
                }

                .back-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.5);
                    cursor: pointer;
                    font-family: monospace;
                    margin-bottom: 20px;
                    transition: color 0.2s;
                }
                .back-btn:hover { color: #fff; }

                .glass { background: rgba(20, 20, 20, 0.6); backdrop-filter: blur(20px); }

                @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const status = winner 
        ? `Winner: ${winner}` 
        : board.every(Boolean) 
            ? 'Draw' 
            : `Next Player: ${isXNext ? 'X' : 'O'}`;

    return (
        <div className="tictactoe-board glass">
            <h2 className="game-status">{status}</h2>
            <div className="grid">
                {board.map((cell, i) => (
                    <button 
                        key={i} 
                        className={`cell ${cell ? 'filled' : ''} ${cell === 'X' ? 'x-cell' : 'o-cell'}`} 
                        onClick={() => handleClick(i)}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button className="reset-btn" onClick={resetGame}>RESET SYSTEM</button>

            <style jsx>{`
                .tictactoe-board {
                    display: flex; flex-direction: column; align-items: center;
                    padding: 40px; border-radius: 20px; border: 1px solid rgba(0, 240, 255, 0.2);
                    max-width: 500px; margin: 0 auto;
                }
                .game-status {
                    font-family: var(--font-orbitron);
                    color: ${winner ? (winner === 'X' ? '#00f0ff' : '#bc00ff') : '#fff'};
                    text-shadow: 0 0 10px ${winner ? (winner === 'X' ? 'rgba(0, 240, 255, 0.5)' : 'rgba(188, 0, 255, 0.5)') : 'transparent'};
                    margin-bottom: 30px;
                    font-size: 2rem;
                    text-transform: uppercase;
                }
                .grid {
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
                    margin-bottom: 30px;
                }
                .cell {
                    width: 100px; height: 100px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    font-size: 3rem; font-weight: 800;
                    cursor: pointer;
                    color: #fff;
                    transition: all 0.2s;
                }
                .cell:hover:not(.filled) {
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
                }
                .x-cell { color: #00f0ff; text-shadow: 0 0 20px rgba(0, 240, 255, 0.6); }
                .o-cell { color: #bc00ff; text-shadow: 0 0 20px rgba(188, 0, 255, 0.6); }

                .reset-btn {
                    background: transparent; border: 1px solid rgba(255,255,255,0.3); color: #fff;
                    padding: 10px 30px; font-family: monospace; letter-spacing: 2px;
                    cursor: pointer; transition: all 0.3s;
                }
                .reset-btn:hover { background: #fff; color: #000; box-shadow: 0 0 20px rgba(255,255,255,0.4); }
                
                .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(10px); }
            `}</style>
        </div>
    );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
