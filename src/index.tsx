import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

import App from './views/react/App';
import AppViewModel from './presentation/AppViewModel';

const mountNode = document.querySelector('#app');

const appViewModel = new AppViewModel();

render(<App vm={appViewModel} />, mountNode);
