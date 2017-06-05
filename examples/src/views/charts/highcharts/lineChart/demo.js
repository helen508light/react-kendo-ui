import React,{ Component } from 'react';
import update from 'react-addons-update';

var categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var options = {
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: ''
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    }
};

var items = [{
        name: 'Random data',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: Math.random()
                });
            }
            return data;
        }())
    }];

const API_HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Max-Age': 3600,
    'Access-Control-Allow-Headers': 'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization'
}

class LineChartDemo extends Component {
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
        /*
        fetch('http://localhost:8080/cygnus-plugins-wpm/rest/wpm/instance', {mode: 'no-cors', headers: API_HEADERS})
        .then((response) => {
            response.json()
        })
        .then((responseData) => {
            console.log(responseData);
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
        });
        */
    }

    render() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">LineChart</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.LineChart id="lineChart" options={options} series={items} categories={categories} onLoad={this.onLoad} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                                expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.LineChart options={options} series={items} categories={categories} onLoad={this.onLoad} />'}
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

export default LineChartDemo;