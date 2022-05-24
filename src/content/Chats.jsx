import React from 'react';
import storageListener from '../hooks/storageListener';

export default function Chats() {
  const filter = storageListener();
  console.log(filter);

  return (
    <div className="cloned-chat-area">
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
      <div>아오 어려워</div>
    </div>
  );
}
