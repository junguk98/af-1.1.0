import Browser from 'webextension-polyfill';

const getNicks = async () => {
  const res = await Browser.storage.local.get('nicks');
  if (res.nicks) return res.nicks;
  else return [];
};

const getBlackNicks = async () => {
  const res = await Browser.storage.local.get('blackNicks');
  if (res.blackNicks) return res.blackNicks;
  else return [];
};

const getToggle = async () => {
  const res = await Browser.storage.local.get('toggle');
  if (res.toggle) return res.toggle;
  else return [false, false, false, false, false];
};

export { getNicks, getBlackNicks, getToggle };
