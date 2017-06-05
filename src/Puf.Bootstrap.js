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

// Bootstrap UI Components
import * as Bootstrap from './components/nkia/bootstrap';

//  Kendo UI Components
import * as Kendo from './components/kendo';

// Highcharts
import * as Highcharts from './charts/highcharts';

// Utils
import * as Utils from './utils';

// console.log('PRODUCTION', PRODUCTION);
// console.log('VERSION', VERSION);

var Puf = {
    // NKIA UI Components
    MainFrameSplitter:Nkia.MainFrameSplitter,
    HiddenContent: Nkia.HiddenContent,

    // Bootstrap UI Components
    // Elements
    Alert: Bootstrap.Alert,
    Button: Bootstrap.Button,
    ToggleButton: Bootstrap.ToggleButton,
    ButtonDropdown: Bootstrap.ButtonDropdown,
    Modal: Bootstrap.Modal,
    ModalHeader: Bootstrap.ModalHeader,
    ModalBody: Bootstrap.ModalBody,
    ModalFooter: Bootstrap.ModalFooter,
    Panel: Bootstrap.Panel,
    PanelHeader: Bootstrap.PanelHeader,
    PanelBody: Bootstrap.PanelBody,
    PanelFooter: Bootstrap.PanelFooter,

    // Form Elements
    Checkbox: Bootstrap.Checkbox,
    RadioGroup: Bootstrap.RadioGroup,
    Radio: Bootstrap.Radio,
    RadioDivider: Bootstrap.RadioDivider,
    Fieldset: Bootstrap.Fieldset,
    FineUploader: Bootstrap.FineUploader,

    // Kendo UI Components
    TabStrip: Kendo.TabStrip,
    Tabs: Kendo.Tabs,
    Tab: Kendo.Tab,
    TabContent: Kendo.TabContent,
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

    kendo: {
        TabStrip: Kendo.TabStrip,
        Tabs: Kendo.Tabs,
        Tab: Kendo.Tab,
        TabContent: Kendo.TabContent,
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
        Notification: Kendo.Notification
    },

    // Highcharts
    LineChart: Highcharts.LineChart,
    ScatterChart: Highcharts.ScatterChart,
    ColumnChart: Highcharts.ColumnChart,
    PieChart: Highcharts.PieChart,
    AreaChart: Highcharts.AreaChart,
    DefaultChartOption: Highcharts.DefaultChartOption,

    // Utils
    Util: Utils.Util,
    DateUtil: Utils.DateUtil,
    NumberUtil: Utils.NumberUtil,
    RegExp: Utils.RegExp,
    Resource: Utils.Resource
};

module.exports = Puf;
// export default Puf;
