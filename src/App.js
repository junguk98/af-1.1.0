import React, { useRef, useState } from 'react';
import Toggle from './components/Toggle';
import Browser from 'webextension-polyfill';
import './App.scss';
import Nickname from './components/Nickname';

export default function App(props) {
  const [toggle, setToggle] = useState(props.toggle);
  const [nicks, setNicks] = useState(props.nicks);
  const [blackNicks, setBlackNicks] = useState(props.blackNicks);
  const nickInput = useRef();

  const addBtnClick = () => {
    if (nickInput.current.value === '' || nicks.includes(nickInput.current.value)) return;
    const newNicks = [...nicks, nickInput.current.value];
    Browser.storage.local.set({ nicks: newNicks });
    setNicks(newNicks);
    nickInput.current.value = '';
  };

  const blackBtnClick = () => {
    if (nickInput.current.value === '' || blackNicks.includes(nickInput.current.value)) return;
    const newNicks = [...blackNicks, nickInput.current.value];
    Browser.storage.local.set({ blackNicks: newNicks });
    setBlackNicks(newNicks);
    nickInput.current.value = '';
  };

  const toggleChange = (idx) => {
    let newToggle = [...toggle];
    newToggle[idx] = !newToggle[idx];
    Browser.storage.local.set({ toggle: newToggle });
    setToggle(newToggle);
  };

  const nickClick = (e) => {
    const newNicks = nicks.filter((item) => item !== e.target.innerHTML);
    Browser.storage.local.set({ nicks: newNicks });
    setNicks(newNicks);
  };

  const blackNickClick = (e) => {
    const newBlackNicks = blackNicks.filter((item) => item !== e.target.innerHTML);
    Browser.storage.local.set({ blackNicks: newBlackNicks });
    setBlackNicks(newBlackNicks);
  };

  return (
    <div className="wrapper">
      <header className="header">
        <span>아프리카tv 채팅 모아보기</span>
      </header>
      <div>
        <ul>
          <Toggle onChange={() => toggleChange(0)} label="BJ" value={toggle[0]} />
          <Toggle onChange={() => toggleChange(1)} label="매니저" value={toggle[1]} />
          <Toggle onChange={() => toggleChange(2)} label="열혈팬" value={toggle[2]} />
          <Toggle onChange={() => toggleChange(3)} label="구독자" value={toggle[3]} />
          <Toggle onChange={() => toggleChange(4)} label="팬" value={toggle[4]} />
        </ul>
        <div>삭제하려면 닉네임을 클릭하세요</div>
        <input ref={nickInput} id="nickname-input" type="text" placeholder="닉네임을 입력하세요" />
        <br />
        <button onClick={addBtnClick} id="add-btn">
          추가하기
        </button>
        <button onClick={blackBtnClick} id="del-btn">
          블랙리스트 추가하기
        </button>
        <div className="nickname-container">
          <div className="nicknames">
            <Nickname nick={nicks} onClick={nickClick}>
              <span>추가됨</span>
            </Nickname>
          </div>
          <div className="nicknames">
            <Nickname nick={blackNicks} onClick={blackNickClick}>
              <span>블랙리스트</span>
            </Nickname>
          </div>
        </div>
      </div>
    </div>
  );
}
