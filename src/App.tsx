import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import ChangePawn from './components/ChangePawn';
import WinPopup from './components/WinPopup';
import { Board } from './modles/Board';
import { Cell } from './modles/Cell';
import { Colors } from './modles/Colors';
import { Player } from './modles/Player';

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentChangePawn, setCurrentChangePawn] = useState<Cell | null>(null);
  const [winColor, setWinColor] = useState<string | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart(){
    const newBoard = new Board();
    newBoard.initSells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
    setWinColor(null);
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  function ChangeFigure(type: string){
    if(currentChangePawn && currentPlayer)
      board.changePawn(type, currentPlayer.color, currentChangePawn);
    setCurrentChangePawn(null);
    swapPlayer();
  }

  function winPopup(color: string){
    setWinColor(color);
  }

  return (
    <div className='app'>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        setCurrentChangePawn={setCurrentChangePawn}
        restart={restart}
        winPopup={winPopup}
      />
      {!!currentChangePawn && <ChangePawn color={currentPlayer?.color} click={ChangeFigure} />}
      {!!winColor && <WinPopup color={winColor} restart={restart} />}
    </div>
  );
};

export default App;
