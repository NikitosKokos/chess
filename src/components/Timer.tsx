import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../modles/Colors';
import { Player } from '../modles/Player';

interface TimerProps{
  currentPlayer: Player | null;
  restart: () => void;
  winPopup: (color: string) => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart, winPopup}) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);
  

  function startTimer(){
    if(timer.current){
      clearInterval(timer.current);
    }
    
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function checkIsWin(time: number){
    if(time - 1 === 0){
      if(timer.current){
        clearInterval(timer.current);
      }
      setBlackTime(300);
      setWhiteTime(300);
      winPopup(currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
    }
  }

  function decrementBlackTimer(){
    setBlackTime(prev => {checkIsWin(prev); return prev - 1});
  }

  function decrementWhiteTimer(){
    setWhiteTime(prev => {checkIsWin(prev); return prev - 1});
  }

  const handleRestart = () => {
    setBlackTime(300);
    setWhiteTime(300);
    restart();
  }
  return (
    <div className='timer'>
      <div className='time'>{blackTime}</div>
      <div>
        <button className='restart' onClick={handleRestart}>Рестарт</button>
      </div>
      <div className='time'>{whiteTime}</div>
    </div>
  )
}

export default Timer;