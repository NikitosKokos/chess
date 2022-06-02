import React, { FC } from 'react'
import { Cell } from '../modles/Cell';

interface CellProps{
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div 
      className={['cell', cell.color, selected ? 'selected': ''].join(' ')}
      onClick={() => click(cell)}
      style={{background: cell.avaliable && cell.figure ? '#3FC8CE' : ''}}
    >
      {cell.avaliable && !cell.figure && <div className='avaliable'/>}
      {cell.figure?.logo && <img src={cell.figure.logo}/>}
    </div>
  )
}

export default CellComponent;