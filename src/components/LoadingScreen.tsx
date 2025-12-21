import React from 'react';
import '../assets/styles/components/loadingScreen.scss';
import logo from '../assets/images/logo.png';

interface LoadingScreenProps {
  message?: string;
  progress?: number; // 0~100
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...', progress }) => {
  return (
    <div className="loading-screen">
      <img src={logo} alt="Logo" className="loading-logo" />
      <div className="loading-bar-container">
        <div
          className="loading-bar"
          style={{ width: `${progress ?? 0}%` }}
        />
      </div>
      <div className="loading-text">{message}</div>
    </div>
  );
};

export default LoadingScreen;
