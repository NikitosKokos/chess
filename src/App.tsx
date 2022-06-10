import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import ChangePawn from './components/ChangePawn';
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

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart(){
    const newBoard = new Board();
    newBoard.initSells();
    newBoard.addFigures();
    setBoard(newBoard);
    
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

  return (
    <div className='app'>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        setCurrentChangePawn={setCurrentChangePawn}
      />
      {!!currentChangePawn && <ChangePawn color={currentPlayer?.color} click={ChangeFigure} />}
    </div>
  );
};

export default App;
