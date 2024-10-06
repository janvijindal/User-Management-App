// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => (
    <div className="flex justify-center">
        <div className="loader"></div>
        <style jsx>{`
            .loader {
                border: 8px solid rgba(255, 255, 255, 0.1);
                border-left-color: #4f46e5;
                border-radius: 50%;
                width: 64px;
                height: 64px;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        `}</style>
    </div>
);

export default LoadingSpinner;
