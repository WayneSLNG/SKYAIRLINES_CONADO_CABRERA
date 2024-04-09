import React, { useEffect } from 'react';

const SuccessModal: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Hide modal after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`modal ${visible ? 'show' : ''}`} style={{ display: visible ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content" style={{ backgroundColor: '#fff' }}> {/* Add background color style */}
          <div className="modal-body text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00cc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p>Success!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
