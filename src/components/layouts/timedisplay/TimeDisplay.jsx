import { useState, useEffect } from 'react';
import './timeDisplay.scss';


const TimeDisplay = () => {
    const [now, setNow] = useState(new Date());

     useEffect(() => {

        const interval = setInterval(() => {
        setNow(new Date());

    }, 1000);

    //cleaning
    return () => {
        clearInterval(interval); 
    }

  },[]);

  return (
    <>
        <time className='time'>
            {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
    </>
  )
}

export default TimeDisplay;