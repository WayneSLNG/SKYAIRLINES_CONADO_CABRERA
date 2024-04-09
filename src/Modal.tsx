import React, { useEffect, useState } from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [searchComplete, setSearchComplete] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && !searchComplete) {
            timer = setTimeout(() => {
                setSearchComplete(true);
            }, 2000);
        } else if (searchComplete) {
            timer = setTimeout(() => {
                onClose();
            }, 2000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isOpen, searchComplete, onClose]);

    return (
        <div>
            {isOpen && (
                <div className="modal border-light">
                    <div className="modal-content">
                        <div className="animation-container">
                            {searchComplete ? (
                                <>
                                    <div className="checkmark-container">
                                        <div className="checkmark">&#10003;</div>
                                    </div>
                                    <div className="text">Done</div>
                                </>
                            ) : (
                                <>
                                    <div className="magnifying-glass"></div>
                                    <div className="text">Searching Flights</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
