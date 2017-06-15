import React, { Component, PropTypes } from 'react';
import jsxToString from 'jsx-to-string';
import * as K from '../../../src';

var _date = '2016-06-06', _datetime = new Date(), 
disabled = false, disabledTime = false, 
_startDate = '2016-06-01', _endDate = '2016-06-15', disabledRange;

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: _date, 
            disabled: false, 
            disabledText: 'Disabled', 
            datetime: _datetime, 
            startDate: _startDate, 
            endDate: _endDate
        };

        // 이벤트 바인드
        this.getDate = this.getDate.bind(this);
        this.setDate = this.setDate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDisabled = this.onDisabled.bind(this);
        this.getDateTime = this.getDateTime.bind(this);
        this.setDateTime = this.setDateTime.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onTimeDisabled = this.onTimeDisabled.bind(this);
        this.getDateRange = this.getDateRange.bind(this);
        this.setDateRange = this.setDateRange.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);
        this.onRangeDisabled = this.onRangeDisabled.bind(this);
    }

    componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        prettyPrint();
    }

    // Date
    getDate() {
        alert('date: ' + this.refs['datepicker'].getValue());
    }

    setDate() {
        //this.setState({date: '2016-05-10'});
        this.refs['datepicker'].setValue('2016-05-10');
    }

    onChange(date) {
        _date = date;
    }

    onDisabled() {
        disabled = !disabled;
        var disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        $('#disabledText').text(disabledText);
        this.refs['datepicker'].setEnable(!disabled);
    }

    // Date Time
    getDateTime() {
        alert('date: ' + this.refs['datetimepicker'].getValue());
    }

    setDateTime() {
        //this.setState({date: '2016-05-10'});
        this.refs['datetimepicker'].setValue('2016-05-10 15:30');
    }

    onTimeChange(date) {
        _datetime = date;
    }

    onTimeDisabled() {
        //let disabled = !this.state.disabled,
        //    disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        //this.setState({date: _date, disabled: disabled, disabledText: disabledText});
        disabledTime = !disabledTime;
        var disabledText = (disabledTime == false) ? 'Disabled' : 'Enabled';
        $('#disabledTimeText').text(disabledText);
        this.refs['datetimepicker'].setEnable(!disabledTime);
    }

    // Date Range
    getDateRange() {
        alert('start date: ' + this.refs['daterangepicker'].getStartDate() + '\n' + 'end date: ' + this.refs['daterangepicker'].getEndDate());
    }

    setDateRange() {
        //this.setState({date: '2016-05-10'});
        this.refs['daterangepicker'].setStartDate('2016-05-10 15:30');
        this.refs['daterangepicker'].setEndDate('2016-06-10 18:30');
    }

    onRangeChange(startDate, endDate) {
        _startDate = startDate;
        _endDate = endDate;
        console.log('onRangeChange');
        console.log(startDate);
        console.log(endDate);
    }

    onRangeDisabled() {
        disabledRange = !disabledRange;
        var disabledText = (disabledRange == false) ? 'Disabled' : 'Enabled';
        $('#disabledRangeText').text(disabledText);
        this.refs['daterangepicker'].enable(!disabledRange);
    }

    render() {
        const { date, datetime, disabled, startDate, endDate } = this.state;

        const dateCodeJsx = (<K.DatePicker ref="datepicker" name="date" value={date} onChange={this.onChange} disabled={disabled} />);

        const dateCodeStr = jsxToString(dateCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.DatePicker'
        });

        const dateTimeCodeJsx = (<K.DatePicker ref="datetimepicker" name="datetime" value={datetime} onChange={this.onTimeChange} timePicker={true} />);
        const dateTimeCodeStr = jsxToString(dateTimeCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.DatePicker'
        });

        const dateRangeCodeJsx = (<K.DateRangePicker 
                                        ref="daterangepicker" 
                                        startName="startDate" startDate={startDate}
                                        endName="endDate" endDate={endDate}
                                        onChange={this.onRangeChange} timePicker={true} />);
        const dateRangeCodeStr = jsxToString(dateRangeCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'K.DateRangePicker'
        });

        return (
            <div className="page-content">
                <div className="page-header">
                    <span className="title">DatePicker</span>
                </div>

                <div className="page-body">
                    <div className="row">
                        <div className="row">{/* start default */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">DatePicker</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    {dateCodeJsx}
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.getDate}>getDate</button>
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.setDate}>setDate</button>
                                </div>
                                <div className="col-md-1">
                                    <button id="disabledText" onClick={this.onDisabled}>Disabled</button>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {dateCodeStr}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end default */}
                        <div className="vspace-12" />

                        <div className="row">{/* start date time */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">DateTimePicker</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    {dateTimeCodeJsx}
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.getDateTime}>getDateTime</button>
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.setDateTime}>setDateTime</button>
                                </div>
                                <div className="col-md-1">
                                    <button id="disabledTimeText" onClick={this.onTimeDisabled}>Disabled</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {dateTimeCodeStr}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end date time */}
                        <div className="vspace-12" />

                        <div className="row">{/* start date range */}
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="title">DateRangePicker</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    {dateRangeCodeJsx}
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.getDateRange}>getDateRange</button>
                                </div>
                                <div className="col-md-1">
                                    <button onClick={this.setDateRange}>setDateRange</button>
                                </div>
                                <div className="col-md-1">
                                    <button id="disabledRangeText" onClick={this.onRangeDisabled}>Disabled</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <pre className="prettyprint linenums">
                                        {dateRangeCodeStr}
                                    </pre>
                                </div>
                            </div>
                        </div>{/* end date range */}
                        <div className="vspace-12" />

                    </div>

                </div>

                <div className="page-footer">

                </div>

            </div>
        );
    }
}

export default DatePicker;