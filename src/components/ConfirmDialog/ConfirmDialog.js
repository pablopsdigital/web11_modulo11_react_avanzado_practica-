import React from 'react';
import './ConfirmDialog.scss';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export default function ConfirmDialog({ title, onConfirm, onClose }) {
  return (
    <div id="confirm-dialog">
      <div className="content">
        <div className="header">
          <AiOutlineInfoCircle className="icon" />
          <h3>{title}</h3>
        </div>
        <div className="buttons">
          <button onClick={onConfirm}>Accept</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
