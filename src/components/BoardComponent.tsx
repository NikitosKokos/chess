import React, { FC, useEffect, useState } from 'react'
import { Board } from '../modles/Board';
import { Cell } from '../modles/Cell';
import { Player } from '../modles/Player';
import CellComponent from './CellComponent';
import LostFigures from './LostFigures';
import Timer from './Timer';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setCurrentChangePawn: (type: Cell) => void;
  restart: () => void;
  winPopup: (color: string) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer, setCurrentChangePawn, restart, winPopup}) => {
  const [selectedSell,setSelectedSell] = useState<Cell | null>(null);

  function clickCell(cell: Cell){
    if(selectedSell && selectedSell !== cell && selectedSell.figure?.canMove(cell)){
      selectedSell.moveFigure(cell);
      setSelectedSell(null);
      if(!cell.board.isChangePawn){
        swapPlayer();
      }else{
        setCurrentChangePawn(cell);
      }
    }else if(selectedSell && selectedSell.x === cell.x && selectedSell.y === cell.y){
      setSelectedSell(null);
    }else if(cell.figure){
      if(cell.figure?.color === currentPlayer?.color){
        setSelectedSell(cell);
      }
    }
  }

  useEffect(() => {
    highLightCells();
  }, [selectedSell]);
  

  function highLightCells(){
    board.highLightCells(selectedSell);
    updateBoard();
  }

  function updateBoard(){
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className="wrapper">
      <div className="top">
        <div className="text">
          <h3 className="title">React Chess</h3>
          <h3 className="current">Текущий игрок: {currentPlayer?.color}</h3>          
        </div>
        <div className="figures">
          <LostFigures figures={board.lostBlackFigures} />
          <LostFigures figures={board.lostWhiteFigures} />          
        </div>
      </div>
      <div className='board'>
        {board.cells.map((row, i) => 
        <React.Fragment key={i}>
          {row.map(cell => 
            <CellComponent
              click={clickCell}
              cell={cell}
              selected={cell.x === selectedSell?.x && cell.y === selectedSell?.y}
              key={cell.id}
            />
          )}
        </React.Fragment>
        )}
        <Timer
           currentPlayer={currentPlayer}
           restart={restart}
           winPopup={winPopup}
          />
      </div>      
    </div>
  )
}

export default BoardComponent;