import React, { FC, useEffect, useState } from 'react'
import { Board } from '../modles/Board';
import { Cell } from '../modles/Cell';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
  const [selectedSell,setSelectedSell] = useState<Cell | null>(null);

  function clickCell(cell: Cell){
    if(selectedSell && selectedSell !== cell && selectedSell.figure?.canMove(cell)){
      selectedSell.moveFigure(cell);
      setSelectedSell(null);
    }else if(cell.figure){
      setSelectedSell(cell);
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
    </div>
  )
}

export default BoardComponent;