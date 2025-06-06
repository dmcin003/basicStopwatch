import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import hourGlassLogo from './assets/hourglass-svgrepo-com.svg';
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState<any>([]);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (centiseconds:number) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const hours = Math.floor(time / 3600);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const cs = centiseconds % 100; // Remaining centiseconds
    
    if(hours){
      return `${hours.toString().padStart(2,"0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${cs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}:${cs.toString().padStart(2, "0")}`;
  };


  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, time]);

  const recordLaps = () => {
    //add lap.current to array
    //make copy of laps
    let copy = [...laps];
    copy.push(time);
    setLaps(copy);
  };

  return (
    <>
      <div>
        <a>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a>
          <img src={hourGlassLogo} className="logo hourglass" alt="hourglass logo" />
        </a>
      </div>
      <h1>
       {formatTime(time)}
      </h1>
      <div className="card">
        <button
          className="top-button"
          onClick={() => {
            setIsRunning(true);
          }}
        >
          Start
        </button>
        <button
          className="top-button"
          onClick={() => {
            setIsRunning(false);
          }}
        >
          Stop
        </button>
        <button
          className="top-button"
          onClick={() => {
            setIsRunning(false);
            setTime(0);
            setLaps([]);
          }}
        >
          Reset
        </button>
        
        <div className="laps-box">
          {laps.map((currentLap: number,i:number) => {
            return <span>{`Lap ${i+1}:   ${formatTime(currentLap)}`}</span>  
          })}
        </div>
        <div>
          <button className="bottom-button" onClick={recordLaps}>Lap</button>
        </div>
      </div>
    </>
  );
}

export default App;
