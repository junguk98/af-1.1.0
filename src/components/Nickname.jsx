import React from 'react';

export default function Nickname({ nick, children, onClick }) {
  return (
    <>
      {children}
      <div onClick={onClick}>
        {nick.map((e, id) => (
          <div key={id}>{e}</div>
        ))}
      </div>
    </>
  );
}
