'use strict';

import React, { Component, PropTypes } from 'react';

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a CheckboxDemo. */
class CheckboxDemo extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.checkboxChange = this.checkboxChange.bind(this);
    }

    checkboxChange(e, checked, value) {
        console.log('event', e);
        console.log('checked', checked);
        console.log('value', value);
    }

    render() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Checkbox</span>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.Checkbox name="checkbox_name1" value="checkValue1" onChange={this.checkboxChange}> 체크박스1</Puf.Checkbox>
                            <Puf.Checkbox name="checkbox_name2" value="checkValue2" onChange={this.checkboxChange} checked={true}> 체크박스2</Puf.Checkbox>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.Checkbox name="name1" value="value1" onChange={this.onChange}> 체크박스1</Puf.Checkbox>\n'}
                                    {'<Puf.Checkbox name="name2" value="value2" onChange={this.onChange} checked={true}> 체크박스2</Puf.Checkbox>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />

                <div className="row">{/* start horizontal checkbox */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Checkbox (horizontal)</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.Checkbox name="checkbox_name3" value="checkValue3" onChange={this.checkboxChange} direction="h"> 체크박스3</Puf.Checkbox>
                            <Puf.Checkbox name="checkbox_name4" value="checkValue4" onChange={this.checkboxChange} direction="h" checked={true}> 체크박스4</Puf.Checkbox>
                            <Puf.Checkbox name="checkbox_name5" value="checkValue5" onChange={this.checkboxChange} direction="h"> 체크박스5</Puf.Checkbox>
                            <Puf.Checkbox name="checkbox_name6" value="checkValue6" onChange={this.checkboxChange} direction="h"> 체크박스6</Puf.Checkbox>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.Checkbox name="name1" value="value1" onChange={this.onChange} direction="h"> 체크박스1</Puf.Checkbox>\n'}
                                    {'<Puf.Checkbox name="name2" value="value2" onChange={this.onChange} direction="h"> 체크박스2</Puf.Checkbox>\n'}
                                    {'<Puf.Checkbox name="name1" value="value3" onChange={this.onChange} direction="h"> 체크박스3</Puf.Checkbox>\n'}
                                    {'<Puf.Checkbox name="name2" value="value4" onChange={this.onChange} direction="h"> 체크박스4</Puf.Checkbox>'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end horizontal checkbox */}
                <div className="vspace-12" />

                <div className="row">{/* start switch */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Checkbox</span>
                            <span className="component-class"> className="switch"</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.Checkbox className="switch" name="switch_name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {/*'// html\n'*/}
                                    {'<Puf.Checkbox className="switch" name="switch_name" onChange={this.checkboxChange} />'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end switch */}
                <div className="vspace-12" />

            </div>
        );
    }
}

CheckboxDemo.propTypes = propTypes;
CheckboxDemo.defaultProps = defaultProps;

export default CheckboxDemo;