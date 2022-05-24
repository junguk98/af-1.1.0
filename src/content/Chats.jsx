import { useEffect, useState } from 'react';
import storageListener from '../hooks/storageListener';

export default function Chats({ origBox, myBox, config }) {
  let chatIdx = 1;
  const filter = storageListener();
  const chat = origBox.getElementsByTagName('dl');
  const [clonedChat, setClonedChat] = useState([]);

  const getChatIdx = (idx) => {
    for (let i = chat.length - 1; i >= 0; i--) {
      if (chat[i].getElementsByTagName('dd')[0].id == idx) {
        return i;
      }
    }
  };

  const checkFilter = (chat) => {
    if (!chat) return false;
    let nickname = chat.querySelector('a').innerHTML;

    filter.nicks?.forEach((e) => {
      if (e.toString() === nickname) return true;
    });

    filter.blackNicks?.forEach((e) => {
      if (e.toString() === nickname) return false;
    });

    let image = chat.getElementsByTagName('img');
    if (!image) return false;

    if (!filter.toggle) return false;
    let flag = 0;
    [...image].forEach((elem) => {
      if (elem.alt === 'BJ' && filter.toggle[0]) {
        flag = 1;
      } else if (elem.alt === '매니저' && filter.toggle[1]) {
        flag = 1;
      } else if (elem.alt === '열혈팬' && filter.toggle[2]) {
        flag = 1;
      } else if (elem.alt === '구독자' && filter.toggle[3]) {
        flag = 1;
      } else if (elem.alt === '팬클럽' && filter.toggle[4]) {
        flag = 1;
      }
    });

    if (flag) return true;
    return false;
  };
  const myBoxCallback = () => {
    let i = 0;
    let first = getChatIdx(chatIdx);
    for (i = first; i < chat.length - 1; i++) {
      chatIdx++;
      let here = chat[i];
      if (checkFilter(here)) {
        // myBox.appendChild(here.cloneNode(true));
        // myBox.scrollTop = myBox.scrollHeight;
        if (clonedChat.includes(here)) return;
        newClones = [...clonedChat, here.cloneNode(true)];
      }
    }
  };
  const observer = new MutationObserver(myBoxCallback);
  observer.observe(origBox, config);
}
