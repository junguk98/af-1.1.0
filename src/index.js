import React from 'react';
import App from './App';
import Browser from 'webextension-polyfill';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const getNicks = async (data) => {
  const res = await Browser.storage.local.get(data);
  if (res.nicks) return res.nicks;
  else return [];
};

const getBlackNicks = async (data) => {
  const res = await Browser.storage.local.get(data);
  if (res.blackNicks) return res.blackNicks;
  else return [];
};

const getToggle = async (data) => {
  const res = await Browser.storage.local.get(data);
  if (res.toggle) return res.toggle;
  else return [false, false, false, false, false];
};

(async () => {
  try {
    const nicks = await getNicks('nicks');
    const blackNicks = await getBlackNicks('blackNicks');
    const toggle = await getToggle('toggle');
    root.render(<App nicks={nicks} blackNicks={blackNicks} toggle={toggle} />);
  } catch (e) {}
})();
