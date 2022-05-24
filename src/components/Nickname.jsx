import React from 'react';

export default function Nickname({ nick, children }) {
  return (
    <>
      {children}
      {nick.map((e, id) => (
        <div key={id}>{e}</div>
      ))}
    </>
  );
}
