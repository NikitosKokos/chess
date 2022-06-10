import React, { FC, useEffect, useRef } from 'react';
import { Figure } from '../modles/figures/Figure';

interface LostFigureProps{
   figures: Figure[];
}

const LostFigures: FC<LostFigureProps> = ({figures}) => {
   const lostEl: any = useRef();

   useEffect(() => {
      if(!!lostEl){
         const elem = lostEl.current;
         elem.scrollTop = elem.scrollHeight - elem.clientHeight;
      }
   }, [figures.length])
   
   
  return (
    <div ref={lostEl} className='lost'>
      {figures.map(figure => 
         <div className='figure' key={figure.id}>
            {figure.logo && <img src={figure.logo} />} {figure.name}
         </div>
      )}
    </div>
  )
}

export default LostFigures