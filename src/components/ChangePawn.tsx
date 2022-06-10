import React, { FC } from 'react';
import blackKnight from '../assets/black-knight.png';
import whiteKnight from '../assets/white-knight.png';
import blackBishop from '../assets/black-bishop.png';
import whiteBishop from '../assets/white-bishop.png';
import blackRook from '../assets/black-rook.png';
import whiteRook from '../assets/white-rook.png';
import blackQueen from '../assets/black-queen.png';
import whiteQueen from '../assets/white-queen.png';
import { Colors } from '../modles/Colors';

interface ChangePawnProps{
   color: string | undefined;
   click: (type: string) => void;
 }

const ChangePawn: FC<ChangePawnProps> = ({color, click}) => {
  return (
    <div className='popup'>
       <div className="popup__main">
         <div className="popup__item" onClick={() => click('knight')}>
            <img className='popup__img' src={color === Colors.BLACK ? blackKnight : whiteKnight}/>
         </div>
         <div className="popup__item" onClick={() => click('bishop')}>
            <img className='popup__img' src={color === Colors.BLACK ? blackBishop : whiteBishop}/>
         </div>
         <div className="popup__item" onClick={() => click('rook')}>
            <img className='popup__img' src={color === Colors.BLACK ? blackRook : whiteRook}/>
         </div>
         <div className="popup__item" onClick={() => click('queen')}>
            <img className='popup__img' src={color === Colors.BLACK ? blackQueen : whiteQueen}/>
         </div>
       </div>
    </div>
  )
}

export default ChangePawn;