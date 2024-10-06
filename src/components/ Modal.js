// src/components/Modal.js
import React from 'react';

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-md relative w-1/2">
                <button onClick={onClose} className="absolute top-2   right-4 text-gray-500">X</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
