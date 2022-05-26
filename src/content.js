import Browser from 'webextension-polyfill';
import './content.scss';

const config = { childList: true, subtree: true };
let chatIdx = 1;
let $chatBox, $origBox, $myBox, chat, toggle, nicks, blackNicks;

function setup() {
  $chatBox = document.querySelector('.chatbox');
  $origBox = document.querySelector('.chat_area');
  $myBox = $origBox.cloneNode();
  $myBox.classList.add('myBox');
  $origBox.classList.add('originbox');
  $chatBox.appendChild($myBox);
  chat = $origBox.getElementsByTagName('dl');

  const $area_header = document.querySelector('.area_header');
  const $target = document.querySelector('.myBox');
  const myHr = document.createElement('hr');
  myHr.classList.add('sethr');
  $myBox.appendChild(myHr);
  let resize = false;

  const $chatToggleButton = document.createElement('button');
  $chatToggleButton.innerHTML = '모아보기';
  $chatToggleButton.classList.add('chat-toggle-btn');
  $area_header.appendChild($chatToggleButton);

  $myBox.style.height = '200px';
  $origBox.style.top = '250px';
  myHr.style.top = '305px';
  $chatToggleButton.addEventListener('click', () => {
    if ($target.style.display === 'none') {
      $target.style.display = 'inline';
      $origBox.style.top = parseInt($myBox.style.height) + 50 + 'px';
    } else {
      $target.style.display = 'none';
      $origBox.style.top = 40 + 'px';
    }
  });
  myHr.addEventListener('mousedown', (e) => {
    $chatBox.classList.add('stop-drag');
    resize = true;
  });
  $chatBox.addEventListener('mouseup', (e) => {
    $chatBox.classList.remove('stop-drag');
    resize = false;
  });
  $chatBox.addEventListener('mousemove', (e) => {
    if (!resize) return;
    const mouseY = e.clientY - 50 - $chatBox.getBoundingClientRect().top;
    $myBox.style.height = mouseY + 'px';
    $origBox.style.top = mouseY + 50 + 'px';
    const relativeTop = $origBox.getBoundingClientRect().top - 10;
    myHr.style.top = relativeTop + 'px';
  });
}

function filterUpdate() {
  Browser.storage.local.get('toggle').then((res) => {
    if (res.toggle) {
      toggle = res.toggle;
    } else toggle = [false, false, false, false, false];
  });
  Browser.storage.local.get('nicks').then((res) => {
    if (res.nicks) {
      nicks = res.nicks;
    } else nicks = [];
  });
  Browser.storage.local.get('blackNicks').then((res) => {
    if (res.blackNicks) {
      blackNicks = res.blackNicks;
    } else blackNicks = [];
  });
}

function filter(chat) {
  if (!chat) return false;
  let flag = 0;
  let nickname = chat.querySelector('a').innerHTML.toString();
  console.log(nicks, blackNicks, nickname);
  nicks.forEach((e) => {
    if (e.toString() === nickname) {
      flag = 1;
      return;
    }
  });
  blackNicks.forEach((e) => {
    if (e.toString() === nickname) {
      flag = -1;
      return;
    }
  });
  if (flag === 1) return true;
  else if (flag === -1) return false;

  let image = chat.getElementsByTagName('img');
  if (!image) return false;
  [...image].forEach((elem) => {
    if (elem.alt === 'BJ' && toggle[0]) {
      flag = 1;
      return;
    } else if (elem.alt === '매니저' && toggle[1]) {
      flag = 1;
      return;
    } else if (elem.alt === '열혈팬' && toggle[2]) {
      flag = 1;
      return;
    } else if (elem.alt === '구독자' && toggle[3]) {
      flag = 1;
      return;
    } else if (elem.alt === '팬클럽' && toggle[4]) {
      flag = 1;
      return;
    }
  });

  if (flag) return true;
  return false;
}

function getChatidx(idx) {
  for (let i = chat.length - 1; i >= 0; i--) {
    if (chat[i].getElementsByTagName('dd')[0].id == idx) {
      return i;
    }
  }
}

function myBoxcallback() {
  let i = 0;
  let first = getChatidx(chatIdx);
  for (i = first; i < chat.length - 1; i++) {
    chatIdx++;
    let here = chat[i];
    if (filter(here)) {
      $myBox.appendChild(here.cloneNode(true));
      $myBox.scrollTop = $myBox.scrollHeight;
    }
  }
}

window.addEventListener('load', () => {
  filterUpdate();
  setup();
  const observer = new MutationObserver(myBoxcallback);
  observer.observe($origBox, config);
});

Browser.storage.onChanged.addListener(() => {
  filterUpdate();
});
