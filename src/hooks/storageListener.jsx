import { useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';
import { getBlackNicks, getNicks, getToggle } from './getStorageData';

export default function storageListener() {
  const [filter, setFilter] = useState({});

  useEffect((e) => {
    const getFilter = async () => {
      const toggle = await getToggle();
      const nicks = await getNicks();
      const blackNicks = await getBlackNicks();
      return {
        toggle,
        nicks,
        blackNicks,
      };
    };

    const filterInit = async () => {
      setFilter(await getFilter());
    };

    filterInit();

    const filterUpdate = async () => {
      setFilter(await getFilter());
    };

    Browser.storage.onChanged.addListener(async () => {
      console.log('filter update');
      await filterUpdate();
      // window.location.reload();
    });
  }, []);

  return filter;
}
