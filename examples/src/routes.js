'use strict';

import React from 'react';

import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';

import App from './app';

import Home from './views/home';
import FontAwesome from './views/icons/fontAwesome';
import PsIconFont from './views/icons/psIconFont';

// Components
import * as Components from './views/components/nkia/bootstrap';

// Kendo UI Components
import Grid from './views/components/kendo/grid';
import TreeView from './views/components/kendo/treeView';
import TabStrip from './views/components/kendo/tabStrip';
import DropDownList from './views/components/kendo/dropDownList';
import DatePicker from './views/components/kendo/datePicker';
import PanelBar from './views/components/kendo/panelBar';
import MultiSelect from './views/components/kendo/multiSelect';
import NumericTextBox from './views/components/kendo/numericTextBox';
import ProgressBar from './views/components/kendo/progressBar';
import Window from './views/components/kendo/window';
import AutoComplete from './views/components/kendo/autoComplete';
import Validation from './views/components/kendo/validation';
import Slider from './views/components/kendo/slider';
import Alert from './views/components/kendo/alert';
import Notification from './views/components/kendo/notification';

// Highcharts
import LineChart from './views/charts/highcharts/lineChart';
import ScatterChart from './views/charts/highcharts/scatterChart';
import ColumnChart from './views/charts/highcharts/columnChart';
import PieChart from './views/charts/highcharts/pieChart';

//var About = require('./controllers/about');
//var Repos = require('./controllers/repos');
//
//module.exports = (
//    <Router history={hashHistory}>
//        <Route path="/" component={Home}/>
//        {/* add the routes here */}
//        <Route path="/repos" component={Repos}/>
//        <Route path="/about" component={About}/>
//    </Router>
//)

export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            {/* add the routes here */}
            <Route path="font-awesome" component={FontAwesome} />
            <Route path="ps-icon-font" component={PsIconFont} />
            {/* components */}
            <Route path="hiddenContent" component={Components.HiddenContent}>
                <Route path="anchor" component={Components.HiddenContent} />
            </Route>
            <Route path="button" component={Components.Button} />
            <Route path="toggleButton" component={Components.ToggleButton} />
            <Route path="checkbox" component={Components.Checkbox} />
            <Route path="radio" component={Components.Radio} />
            {/*<Route path="alert" component={Components.Alert} />*/}
            <Route path="modal" component={Components.Modal} />
            <Route path="panel" component={Components.Panel} />
            <Route path="fieldset" component={Components.Fieldset} />
            <Route path="fineUploder" component={Components.FineUploder} />
            <Route path="buttonDropdown" component={Components.ButtonDropdown} />

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
            
            {/* highcharts */}
            <Route path="lineChart" component={LineChart} />
            <Route path="scatterChart" component={ScatterChart} />
            <Route path="columnChart" component={ColumnChart} />
            <Route path="pieChart" component={PieChart} />
        </Route>
    </Router>
)
