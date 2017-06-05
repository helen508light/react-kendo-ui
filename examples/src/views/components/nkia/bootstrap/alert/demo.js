'use strict';

import React, { Component, PropTypes } from 'react';

const propTypes = {
    
};

const defaultProps = {
    
};

/** Class representing a AlertDemo. */
class AlertDemo extends Component {
    constructor(props) {
        super(props);

        // Manually bind this method to the component instance...
        this.onOk = this.onOk.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onShowAlert = this.onShowAlert.bind(this);
        this.onShowAlert1 = this.onShowAlert1.bind(this);
        this.onShowConfirm = this.onShowConfirm.bind(this);
    }

    onOk() {
        console.log('onOk');
    }

    onConfirm() {
        console.log('onConfirm');
    }

    onCancel() {
        console.log('onCancel');
    }

    onShowAlert(event) {
        //console.log(event);
        //var alert1 = new Puf.Alert({title: 'aa'});
        //console.log(alert1);
        this.refs['alert'].show(function() {
            console.log('alert ok done!!!');
        });
        console.log('alert');
    }

    onShowAlert1(event) {
        this.refs['alert'].show(function() {
            console.log('alert1 ok done!!!');
        });
    }

    onShowConfirm(event) {
        this.refs['confirm'].show(function() {
            console.log('confirm ok done!!!');
        }, function() {
            console.log('confirm cancel done!!!');
        });
        console.log('confirm');
    }

    render() {
        return (
            <div className="row">
                <div className="row">{/* start default */}
                    <div className="row">
                        <div className="col-md-12">
                            <span className="title">Alert</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-5">
                                    <button className="btn btn-primary" onClick={this.onShowAlert}>
                                        Alert
                                    </button>
                                </div>
                                <div className="col-md-5">
                                    <button className="btn btn-primary" onClick={this.onShowAlert1}>
                                        Alert
                                    </button>
                                </div>
                            </div>
                            <Puf.Alert ref="alert" title="타이틀" message="메시지" onOk={this.onOk} />
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-primary" onClick={this.onShowConfirm}>
                                Confirm
                            </button>
                            <Puf.Alert ref="confirm" type="confirm" title="타이틀" message="메시지" onOk={this.onConfirm} onCancel={this.onCancel}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Puf.HiddenContent expandLabel="소스 보기" collapseLabel="소스 닫기"
                                            expandIcon="fa fa-caret-right" collapseIcon="fa fa-caret-down">
                                <pre className="prettyprint linenums">
                                    {'// js\n' +
                                    '안형로'}
                                </pre>
                            </Puf.HiddenContent>
                        </div>
                    </div>
                </div>{/* end default */}
                <div className="vspace-12" />
            </div>
        );
    }
}

AlertDemo.propTypes = propTypes;
AlertDemo.defaultProps = defaultProps;

export default AlertDemo;