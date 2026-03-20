import { use, useEffect, useState } from 'react';
import './App.css';
import TimerButton from './TimerButton';
import TimerDisplay from './TimerDisplay';
import { Egg, Droplet} from 'lucide-react';
import {CSSTransition} from 'react-transition-group';

const MODE_NAMES = {
  0: 'Soft',
  1: 'Medium',
  2: 'Hard',
  3: 'Poached'
}

const MODE_TIMES = {
  0: 3 * 60,
  1: 5 * 60,
  2: 8 * 60,
  3: 4 * 60,
};

const MODE_ICONS = {
  0: <Egg />,
  1: <Egg />,
  2: <Egg />,
  3: <Droplet />,
}

function App() {
  const [mode, setMode] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  useEffect((() => {

  }), []);

  useEffect((() => {
    if( running && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    
  }), [running, timeLeft]);

  useEffect((() => {
    if (timeLeft === 0 && running) {
      setRunning(false);
      alert('Egg is ready!');
    }

  }), [timeLeft, running]);

  const startTimer = (mode: string) => {
    const modeKey = getModeKeyNum(mode);
    setMode(modeKey);
    setTimeLeft(MODE_TIMES[modeKey]);
    setRunning(true);
    setShowTimer(true);
  }

  const getModeKeyNum = (key: string) => {
    return Number(key) as keyof typeof MODE_NAMES;
  }

  const getModeName = (key: number) => {
    return MODE_NAMES[key as keyof typeof MODE_NAMES];
  }

  const getModeIcon = (key: number) => {
    return MODE_ICONS[key as keyof typeof MODE_ICONS];
  }

  const handleCancel = () => {
    setRunning(false);
    setTimeLeft(0);
    setMode(null);
    setTimeout(() => {
      setShowTimer(false);
    }, 400);
  }

  return (
    <main id="center">
      <h1>Egg Timer</h1>
      {!running && mode === null && (
        <div className="card-list">
          {Object.keys(MODE_NAMES).map((key) => (
            <TimerButton
              key={key}
              icon={getModeIcon(getModeKeyNum(key))}
              mode={getModeName(getModeKeyNum(key))}
              onClick={() => startTimer(key)}
              disabled={running}
            />
          ))}
        </div>
      )}
      

      <CSSTransition
        in={showTimer} 
        timeout={400} 
        classNames="timer-fade" 
        unmountOnExit
      >
        <div>
          {mode != null && (
            <>
              <h2>{getModeName(mode)} Egg</h2>
              <TimerDisplay timeLeft={timeLeft} onCancel={handleCancel} />
            </>
          )}
        </div>
      </CSSTransition>

    </main>
  );
}

export default App;