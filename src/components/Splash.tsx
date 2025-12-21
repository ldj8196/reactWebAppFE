import React, { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import useLoadingStore from '../stores/useLoadingStore';

const Splash: React.FC = () => {
  const { setLoading } = useLoadingStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress > 100 ? 100 : currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Progress가 100%가 된 후 0.5초 대기
        setTimeout(() => {
          setLoading(false); // 화면 전환
        }, 500);
      }
    }, 30); // 약 3초 동안 0→100

    return () => clearInterval(interval);
  }, [setLoading]);

  return <LoadingScreen message="Welcome!" progress={progress} />;
};

export default Splash;
