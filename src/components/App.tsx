import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useTimer } from './useTimer';
import '../styles/App.css';
import TimerButton from './TimerButton';
import TimerDisplay from './TimerDisplay';
import { Egg } from 'lucide-react';
import EggReadyModal from './EggReadyModal';

const MODE_NAMES: Record<number, string> = {
  0: 'Soft',
  1: 'Medium',
  2: 'Hard',
  3: 'Poached'
}

const MODE_TIMES: Record<number, number> = {
  0: 0.1 * 60,
  1: 5 * 60,
  2: 8 * 60,
  3: 4 * 60,
};

const MODE_ICONS: Record<number, React.ReactElement> = {
  0: <Egg />,
  1: <Egg />,
  2: <Egg />,
  3: <Egg />,
}


function App() {
  const [mode, setMode] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(0);
  const timerRef = useRef(null);
  const cardListRef = useRef(null);
  const { timeLeft, isRunning, start, stop, reset, setTimeLeft } = useTimer(initialTime);
  const [showEggReadyModal, setEggReadyModal] = useState(false);
  
  useEffect(() => {
    stop();
    setTimeLeft(0);
    setMode(null);
    // Optionally hide timer and modal as well
    setShowTimer(false);
    setEggReadyModal(false);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      stop();
      setTimeLeft(0);
      setMode(null);
      setShowTimer(false);
      setEggReadyModal(true);
    }
  }, [timeLeft, isRunning, stop]);

  const startTimer = (mode: string) => {
    setEggReadyModal(false); // Hide modal if showing
    stop();
    reset();
    setTimeLeft(0);
    setMode(null);
    const modeKey = getModeKeyNum(mode);
    setShowTimer(true);
    setMode(modeKey);
    
    setInitialTime(MODE_TIMES[modeKey]);
    setTimeout(() => {
      start();
    }, 0);
  };

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
    stop();
    setTimeLeft(0);
    setMode(null);
    setTimeout(() => {
      setShowTimer(false);
    }, 400);
  };

  // Handler to stop timer and close modal
  const handleEggReadyClose = () => {
    stop();
    setTimeLeft(0);
    setMode(null);
    setTimeout(() => {
      setShowTimer(false);
    }, 400);
    setEggReadyModal(false);
  };

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
                disabled={isRunning}
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
      <EggReadyModal show={showEggReadyModal} onClose={handleEggReadyClose} />
    </main> 
  );
}

export default App;