import '../styles/TimerButton.css';
import React from 'react';

interface TimerButtonProps {
  mode: string;
  icon: React.ReactNode
  onClick: (mode: string) => void;
  disabled: boolean;
}

const TimerButton: React.FC<TimerButtonProps> = ({ mode, icon, onClick, disabled }) => {
  return (
    <button className="card counter" onClick={() => onClick(mode)} disabled={disabled}>
        <span className="icon">
            {icon}
        </span>
        <span className="mode-name">
            {mode} Egg
        </span>
    </button>
);
}

export default TimerButton;