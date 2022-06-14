import React, { FC } from 'react';

interface WinPopupProps{
   color: string;
   restart: () => void;
}

const WinPopup: FC<WinPopupProps> = ({color, restart}) => {
  return (
   <div className='popup'>
      <div className="popup__win">
         <h1 className="popup__title">Победил {color}!</h1>
         <button className='popup__btn restart' onClick={restart}>Рестарт</button>
      </div>
   </div>
   
  )
}

export default WinPopup;