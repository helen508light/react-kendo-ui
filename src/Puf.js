/**
 * React Puf Bundle
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 */
'use strict';

// Nkia UI Components
import * as Nkia from './components/nkia';

// Semantic UI Components
import * as Semantic from './components/nkia/semantic';

//  Kendo UI Components
import * as Kendo from './components/kendo';

// Utils
import * as Utils from './utils';

// console.log('PRODUCTION', PRODUCTION);
// console.log('VERSION', VERSION);

var Puf = {
    // NKIA UI Components
    MainFrameSplitter:Nkia.MainFrameSplitter,
    HiddenContent: Nkia.HiddenContent,

    // Semantic UI Components
    Button: Semantic.Button,

    // Kendo UI Components
    TabStrip: Kendo.TabStrip,
    Tabs: Kendo.Tabs,
    Tab: Kendo.Tab,
    TabContent: Kendo.TabContent,
    Alert: Kendo.Alert,
    AutoComplete: Kendo.AutoComplete,
    DatePicker: Kendo.DatePicker,
    DateRangePicker: Kendo.DateRangePicker,
    DropDownList: Kendo.DropDownList,
    Grid: Kendo.Grid,
    MultiSelect: Kendo.MultiSelect,
    NumericTextBox: Kendo.NumericTextBox,
    PanelBar: Kendo.PanelBar,
    PanelBarPane: Kendo.PanelBarPane,
    ProgressBar: Kendo.ProgressBar,
    TreeView: Kendo.TreeView,
    Window: Kendo.Window,
    Slider: Kendo.Slider,
    Notification: Kendo.Notification,

    // Utils
    Util: Utils.Util,
    DateUtil: Utils.DateUtil,
    NumberUtil: Utils.NumberUtil,
    RegExp: Utils.RegExp,
    Resource: Utils.Resource,
    KendoUtil: Utils.KendoUtil
};

module.exports = Puf;
