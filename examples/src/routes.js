'use strict';

import React from 'react';

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';

import App from './app';

import Home from './views/home';

// Kendo UI Components
import Grid from './views/grid';
import TreeView from './views/treeView';
import TabStrip from './views/tabStrip';
import DropDownList from './views/dropDownList';
import DatePicker from './views/datePicker';
import PanelBar from './views/panelBar';
import MultiSelect from './views/multiSelect';
import NumericTextBox from './views/numericTextBox';
import ProgressBar from './views/progressBar';
import Window from './views/window';
import AutoComplete from './views/autoComplete';
import Validation from './views/validation';
import Slider from './views/slider';
import Alert from './views/alert';
import Notification from './views/notification';

export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />

            {/* kendo ui components */}
            <Route path="grid" component={Grid} />
            <Route path="treeView" component={TreeView} />
            <Route path="tabStrip" component={TabStrip} />
            <Route path="dropDownList" component={DropDownList} />
            <Route path="datePicker" component={DatePicker} />
            <Route path="panelBar" component={PanelBar} />
            <Route path="multiSelect" component={MultiSelect} />
            <Route path="numericTextBox" component={NumericTextBox} />
            <Route path="progressBar" component={ProgressBar} />
            <Route path="window" component={Window} />
            <Route path="autoComplete" component={AutoComplete} />
            <Route path="validation" component={Validation} />
            <Route path="slider" component={Slider} />
            <Route path="notification" component={Notification} />
            <Route path="alert" component={Alert} />
        </Route>
    </Router>
)
