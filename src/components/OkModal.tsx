import React from 'react';
import '../styles/OkModal.css';

interface OkModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  okText?: string;
}

const OkModal: React.FC<OkModalProps> = ({ show, onClose, title, children, okText = 'OK' }) => {
  if (!show) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        {title && <h2>{title}</h2>}
        <div className="modal-content">{children}</div>
        <button className="modal-ok-btn" onClick={onClose}>{okText}</button>
      </div>
    </div>
  );
};

export default OkModal;
