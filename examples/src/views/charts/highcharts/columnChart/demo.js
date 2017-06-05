import React,{ Component } from 'react';
import update from 'react-addons-update';

var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

var options = {
    xAxis: {
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    }
};

var items = [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

        }, {
            name: 'London',
            data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

        }, {
            name: 'Berlin',
            data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

        }];

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Max-Age': 3600,
    'Access-Control-Allow-Headers': 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'
}

class ColumnChartDemo extends Component {
    onSelect(e, selectedItem, selectedValue) {
        console.log('onSelect', selectedValue);
    }

    onChange(e, selectedItem, selectedValue) {
        console.log('onChange', selectedValue);
    }

    onLoadComplete(e, response) {
        console.log('onLoadComplete', e);
        console.log('onLoadComplete', response);
    }

    onLoad() {
        var series = this.series[0];
        (function appendData() {
            var x = (new Date()).getTime(), // current time
                y = Math.random();
            series.addPoint([x, y], true, true);

            window.basicChartTimeoutMap["lineChart"] = setTimeout(appendData, 1000);
        })();
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">ColumnChart</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.ColumnChart options={options} series={items} categories={categories} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.ColumnChart options={options} series={items} categories={categories} />'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />
            </div>
        )
    }
}

export default ColumnChartDemo;