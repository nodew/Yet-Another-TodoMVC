import "reflect-metadata";
// tslint:disable-next-line: ordered-imports
import * as React from 'react';
import { render } from 'react-dom';
import { IAppViewModel } from '../../../../presentation/AppViewModel';
import { TYPES } from "../../../../types";
import App from '../../../react/components/App';
import { container } from "./inversify.config";

import "../../../../../todomvc.css";

const mountNode = document.querySelector('#app');
const appViewModel = container.get<IAppViewModel>(TYPES.AppViewModel);

render(<App viewModel={appViewModel} />, mountNode);
