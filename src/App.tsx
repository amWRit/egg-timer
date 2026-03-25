import { useEffect, useState, useRef } from 'react';
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
  3: <Egg />,
}

function App() {
  const [mode, setMode] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const timerRef = useRef(null);
  const cardListRef = useRef(null);

  useEffect((() => {

  }), []);

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [running]);

  useEffect((() => {
    if (timeLeft === 0 && running) {
      setRunning(false);
      alert('Egg is ready!');
    }

  }), [timeLeft, running]);

  const startTimer = (mode: string) => {
    const modeKey = getModeKeyNum(mode);
    setShowTimer(true);
    setMode(modeKey);
    setTimeLeft(MODE_TIMES[modeKey]);
    
    setRunning(true);
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
      <h1 className="egg-timer-heading">Egg Timer</h1>
      <div className="main-container">
        {/* Card List always rendered */}
        <div
          ref={cardListRef}
          style={{
            width: '100%',
            opacity: !showTimer && mode === null ? 1 : 0,
            transition: 'opacity 0.4s',
            pointerEvents: !showTimer && mode === null ? 'auto' : 'none',
          }}
        >
          <div className="card-list" style={{ width: '100%' }}>
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
        </div>
        {/* Timer absolutely centered over card list */}
        <div
          ref={timerRef}
          className="timer-overlay"
          style={{
            opacity: showTimer && mode !== null ? 1 : 0,
            pointerEvents: showTimer && mode !== null ? 'auto' : 'none',
          }}
        >
          {mode !== null && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h2 className="egg-mode-heading">{getModeName(mode)} Egg</h2>
              <TimerDisplay timeLeft={timeLeft} onCancel={handleCancel} />
            </div>
          )}
        </div>
      </div>
    </main> 
  );
}

export default App;