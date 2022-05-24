import { useState } from 'react';
import Browser from 'webextension-polyfill';
import { getBlackNicks, getNicks, getToggle } from './getStorageData';

export default function storageListener() {
  const [filter, setFilter] = useState(async () => {
    return {
      toggle: await getToggle(),
      nicks: await getNicks(),
      blackNicks: await getBlackNicks(),
    };
  });

  const filterUpdate = async () => {
    setFilter({
      toggle: await getToggle(),
      nicks: await getNicks(),
      blackNicks: await getBlackNicks(),
    });
  };

  Browser.storage.onChanged.addListener(async () => {
    await filterUpdate();
  });

  return filter;
}
