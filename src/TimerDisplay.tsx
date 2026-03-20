import './TimerDisplay.css'
import React from "react";

interface TimerDisplayProps {
  timeLeft: number;
  onCancel: () => void;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, onCancel }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <div className="timer">
            <p>Time left: {formatTime(timeLeft)}</p>
            <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
    );

};

export default TimerDisplay;