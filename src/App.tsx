import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import Splash from './components/Splash';
import useLoadingStore from './stores/useLoadingStore';

const App: React.FC = () => {
  const { loading } = useLoadingStore();

  if (loading) return <Splash />; // Splash 화면 표시

  return <RouterProvider router={router} />;
};

export default App;
