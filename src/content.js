import '../src/content.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Mycontent from './content/Mycontent';

const $chatBox = document.querySelector('.chatbox');
const $origBox = document.querySelector('.chat_area');
const $myBox = $origBox.cloneNode();

$myBox.classList.add('myBox');
$origBox.classList.add('originbox');

document.querySelector('.chatbox').appendChild($myBox);

const root = createRoot($myBox);

root.render(<Mycontent chatBox={$chatBox} origBox={$origBox} myBox={$myBox} />);
