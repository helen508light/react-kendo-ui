'use strict';

var React = require('react');

var RadioDemo = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Radio</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.RadioGroup name="radio_name" selectedValue="checkValue2" onChange={this.onRadioChange}>
                                <Puf.Radio value="checkValue1"> 라디오1</Puf.Radio>
                                <Puf.Radio value="checkValue2"> 라디오2</Puf.Radio>
                            </Puf.RadioGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.RadioGroup name="radio_name" selectedValue="value2" onChange={this.onChange}>\n'}
                                    {'  <Puf.Radio value="value1"> 라디오1</Puf.Radio>\n'}
                                    {'  <Puf.Radio value="value2"> 라디오2</Puf.Radio>\n'}
                                    {'</Puf.RadioGroup>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

                <div className="row">{/* start horizontal checkbox */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Radio (horizontal)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.RadioGroup name="radio_name1" selectedValue="checkValue5" onChange={this.onRadioChange} direction="h">
                                <Puf.Radio value="checkValue3"> 라디오3</Puf.Radio>
                                <Puf.Radio value="checkValue4"> 라디오4</Puf.Radio>
                                <Puf.Radio value="checkValue5"> 라디오5</Puf.Radio>
                                <Puf.Radio value="checkValue6"> <i className="fa fa-files-o"></i></Puf.Radio>
                            </Puf.RadioGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.RadioGroup name="radio_name" selectedValue="value1" onChange={this.onChange} direction="v">\n'}
                                    {'  <Puf.Radio value="value1"> 라디오1</Puf.Radio>\n'}
                                    {'  <Puf.Radio value="value2"> 라디오2</Puf.Radio>\n'}
                                    {'  <Puf.Radio value="value3"> 라디오3</Puf.Radio>\n'}
                                    {'  <Puf.Radio value="value4"> 라디오4</Puf.Radio>\n'}
                                    {'</Puf.RadioGroup>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end horizontal checkbox */}
                <div className="vspace-12" />
            </div>

        );
    }
});

module.exports = RadioDemo;