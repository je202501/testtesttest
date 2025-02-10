import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import RefrigeratorList from './RefrigeratorList';
import ResidentList from './ResidentList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RefrigeratorList></RefrigeratorList>
      <ResidentList></ResidentList>
    </>
  );
}

export default App;
