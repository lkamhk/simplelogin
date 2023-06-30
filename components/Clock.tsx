import React, { useEffect, useRef, useState } from 'react'


const Clock = () => {

  const timmer = useRef()
  const [Hour, setHour] = useState('');
  const [Seconds, setSeconds] = useState('');
  const [Minutes, setMinutes] = useState('');
  const [Year, setYear] = useState('');
  const [Month, setMonth] = useState('');
  const [Day, setDay] = useState('');
  const [Weekday, setWeekday] = useState('')
  const [time, setTime] = useState();



  function tick() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    setHour(hours)
    setMinutes(minutes)
    setSeconds(seconds)
      // setTime(`${hours}:${minutes}:${seconds}`)
  }

  useEffect(() => {
    console.log(time)
    const clearTimer = setInterval(tick, 1000)
    return   () => clearInterval(clearTimer)
  }, [time])


  return (
    <div className='flex orbitron font-extrabold text-4xl border border-zinc-400 p-5 rounded-[15px] shadow-lg '>
      {/* <div className='tracking-wide hyphens-none'>{time?time:null} </div> */}
      <div className='w-[60px] text-center'>{Hour}</div>
      <span className='inline-block mx-1'>:</span>
       <div className='w-[60px] text-center'>{Minutes}</div> 
       <span className='inline-block mx-1'>:</span> 
       <div className='w-[60px] text-center'> {Seconds} </div>
    </div>
  );
};

export default Clock;