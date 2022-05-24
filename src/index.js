import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import '../public/manifest.json';
import '../public/logo.png';
import { getNicks, getBlackNicks, getToggle } from './hooks/getStorageData';

const container = document.getElementById('root');
const root = createRoot(container);

(async () => {
  try {
    const nicks = await getNicks();
    const blackNicks = await getBlackNicks();
    const toggle = await getToggle();
    root.render(<App nicks={nicks} blackNicks={blackNicks} toggle={toggle} />);
  } catch (e) {}
})();
