'use strict';

var React = require('react');
var jsxToString = require('jsx-to-string'); 

var _date, _datetime, disabled = false, disabledTime = false, _startDate, _endDate, disabledRange;

var DatePickerDemo = React.createClass({
    // Date
    getDate: function() {
        alert('date: ' + this.refs['datepicker'].getValue());
    },
    setDate: function() {
        //this.setState({date: '2016-05-10'});
        this.refs['datepicker'].setValue('2016-05-10');
    },
    onChange: function(date) {
        _date = date;
    },
    onDisabled: function() {
        disabled = !disabled;
        var disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        $('#disabledText').text(disabledText);
        this.refs['datepicker'].setEnable(!disabled);
    },
    // Date Time
    getDateTime: function() {
        alert('date: ' + this.refs['datetimepicker'].getValue());
    },
    setDateTime: function() {
        //this.setState({date: '2016-05-10'});
        this.refs['datetimepicker'].setValue('2016-05-10 15:30');
    },
    onTimeChange: function(date) {
        _datetime = date;
    },
    onTimeDisabled: function() {
        //let disabled = !this.state.disabled,
        //    disabledText = (disabled == false) ? 'Disabled' : 'Enabled';
        //this.setState({date: _date, disabled: disabled, disabledText: disabledText});
        disabledTime = !disabledTime;
        var disabledText = (disabledTime == false) ? 'Disabled' : 'Enabled';
        $('#disabledTimeText').text(disabledText);
        this.refs['datetimepicker'].setEnable(!disabledTime);
    },
    // Date Range
    getDateRange: function() {
        alert('start date: ' + this.refs['daterangepicker'].getStartDate() + '\n' + 'end date: ' + this.refs['daterangepicker'].getEndDate());
    },
    setDateRange: function() {
        //this.setState({date: '2016-05-10'});
        this.refs['daterangepicker'].setStartDate('2016-05-10 15:30');
        this.refs['daterangepicker'].setEndDate('2016-06-10 18:30');
    },
    onRangeChange: function(startDate, endDate) {
        _startDate = startDate;
        _endDate = endDate;
        console.log('onRangeChange');
        console.log(startDate);
        console.log(endDate);
    },
    onRangeDisabled: function() {
        disabledRange = !disabledRange;
        var disabledText = (disabledRange == false) ? 'Disabled' : 'Enabled';
        $('#disabledRangeText').text(disabledText);
        this.refs['daterangepicker'].enable(!disabledRange);
    },
    getInitialState: function() {
        _date = '2016-06-06';
        _datetime = new Date();//'2016-06-06 14:47';
        _startDate = '2016-06-01';
        _endDate = '2016-06-15';
        return {date: _date, disabled: false, disabledText: 'Disabled', datetime: _datetime, startDate: _startDate, endDate: _endDate};
    },
    render: function() {
        const { date, datetime, disabled, startDate, endDate } = this.state;

        const dateCodeJsx = (<Puf.DatePicker ref="datepicker" name="date" value={date} onChange={this.onChange} disabled={disabled} />);

        const dateCodeStr = jsxToString(dateCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.DatePicker'
        });

        const dateTimeCodeJsx = (<Puf.DatePicker ref="datetimepicker" name="datetime" value={datetime} onChange={this.onTimeChange} timePicker={true} />);
        const dateTimeCodeStr = jsxToString(dateTimeCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.DatePicker'
        });

        const dateRangeCodeJsx = (<Puf.DateRangePicker 
                                        ref="daterangepicker" 
                                        startName="startDate" startDate={startDate}
                                        endName="endDate" endDate={endDate}
                                        onChange={this.onRangeChange} timePicker={true} />);
        const dateRangeCodeStr = jsxToString(dateRangeCodeJsx, {
            functionNameOnly: true,
            useFunctionCode: true,
            displayName: 'Puf.DatePicker'
        });

        return (
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기" expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {dateCodeStr}
                                </pre>
                            </Puf.HiddenContent>
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {dateTimeCodeStr}
                                </pre>
                            </Puf.HiddenContent>
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
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {dateRangeCodeStr}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end date range */}
                <div className="vspace-12" />

            </div>
        );
    }
});

module.exports = DatePickerDemo;